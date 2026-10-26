"use server";

import { siteConfig } from "@/lib/siteConfig";
import {
  isValidDateString,
  isValidEmail,
  isValidHttpUrl,
  isValidPhone,
  sanitize,
  sanitizeMultiline,
  validatePhotos,
  validateVideo,
} from "@/lib/validation";

export type FormStatus = "delivered" | "fallback" | "error";

export type FormActionResult = {
  status: FormStatus;
  message: string;
  mailtoHref?: string;
  summaryText?: string;
  fieldErrors?: Record<string, string>;
};

const QUOTE_THANK_YOU =
  "Thank you. Crestline has received your quotation request. Our team will review the information and contact you using your selected method.";

const ASSESSMENT_THANK_YOU =
  "Thank you. Crestline has received your site assessment request. Our team will review the information and contact you using your selected method.";

const ENQUIRY_THANK_YOU =
  "Thank you. Crestline has received your message. We will reply using the email address you provided.";

const FALLBACK_NOTE =
  "No email service is connected to the website yet, so your details have not been sent automatically. Open your email app below — the request is prepared and ready to send.";

/** Honeypot + minimum fill time. Never reveals which rule fired. */
function passesSpamGuards(formData: FormData): boolean {
  const honeypot = sanitize(formData.get("website"), 100);
  if (honeypot !== "") return false;
  const startedAt = Number.parseInt(String(formData.get("startedAt") ?? ""), 10);
  if (!Number.isFinite(startedAt)) return false;
  const elapsed = Date.now() - startedAt;
  return elapsed >= 2500 && elapsed <= 1000 * 60 * 60 * 48;
}

type DeliveryResult = "delivered" | "failed" | "unconfigured";

/**
 * POST the submission to the configured endpoint
 * (environment variable QUOTE_DELIVERY_ENDPOINT). Files are never persisted
 * or exposed publicly — only their names, types and sizes are forwarded.
 */
async function deliver(
  kind: string,
  payload: Record<string, unknown>
): Promise<DeliveryResult> {
  const endpoint = process.env.QUOTE_DELIVERY_ENDPOINT?.trim();
  if (!endpoint) return "unconfigured";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), ...payload }),
      cache: "no-store",
    });
    return res.ok ? "delivered" : "failed";
  } catch {
    return "failed";
  }
}

function buildMailto(subject: string, body: string): string {
  // Keep mailto links comfortably within mail-client limits.
  const trimmed = body.length > 1800 ? `${body.slice(0, 1797)}…` : body;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(trimmed)}`;
}

function str(formData: FormData, key: string, max = 2000): string {
  return sanitize(formData.get(key), max);
}

function multiline(formData: FormData, key: string, max = 4000): string {
  return sanitizeMultiline(formData.get(key), max);
}

/* ---------------------------------------------------------------------------
 * Quotation request (multi-step form)
 * ------------------------------------------------------------------------- */

export async function submitQuoteRequest(formData: FormData): Promise<FormActionResult> {
  if (!passesSpamGuards(formData)) {
    return { status: "error", message: "The request could not be submitted. Please try again." };
  }

  const fieldErrors: Record<string, string> = {};

  const name = str(formData, "name", 80);
  const email = str(formData, "email", 254);
  const phone = str(formData, "phone", 20);
  const contactMethod = str(formData, "contactMethod", 20) || "email";
  const area = str(formData, "area", 120);
  const locationPin = str(formData, "locationPin", 500);
  const services = str(formData, "services", 400)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const propertyType = str(formData, "propertyType", 40);
  const frequency = str(formData, "frequency", 20);
  const water = str(formData, "waterAvailability", 20);
  const electricity = str(formData, "electricityAvailability", 20);
  const preferredDate = str(formData, "preferredDate", 20);
  const conditionNotes = multiline(formData, "conditionNotes");
  const accessConsiderations = multiline(formData, "accessConsiderations");
  const fabricDetails = multiline(formData, "fabricDetails");

  if (name.length < 2) fieldErrors.name = "Please enter your full name.";
  if (!isValidEmail(email)) fieldErrors.email = "Please enter a valid email address.";
  if (contactMethod !== "email" && !phone) {
    fieldErrors.phone = "Please enter a phone number, or choose email as your contact method.";
  } else if (phone && !isValidPhone(phone)) {
    fieldErrors.phone = "Please enter a valid phone number.";
  }
  if (locationPin && !isValidHttpUrl(locationPin)) {
    fieldErrors.locationPin = "Please paste a valid link (starting with http:// or https://).";
  }
  if (services.length === 0) {
    fieldErrors.services = "Please select at least one service.";
  }
  if (preferredDate && !isValidDateString(preferredDate)) {
    fieldErrors.preferredDate = "Please enter a valid date.";
  }

  let mattresses: Record<string, number> = {};
  try {
    const parsed = JSON.parse(str(formData, "mattresses", 200));
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      mattresses = parsed as Record<string, number>;
    }
  } catch {
    mattresses = {};
  }

  const sofaSeats = Number.parseInt(String(formData.get("sofaSeats") ?? "0"), 10) || 0;
  const leatherSeats =
    Number.parseInt(String(formData.get("leatherSeats") ?? "0"), 10) || 0;
  const chairCount = Number.parseInt(String(formData.get("chairCount") ?? "0"), 10) || 0;
  const carpetMedium =
    Number.parseInt(String(formData.get("carpetMedium") ?? "0"), 10) || 0;
  const carpetLarge =
    Number.parseInt(String(formData.get("carpetLarge") ?? "0"), 10) || 0;
  const bedrooms = Number.parseInt(String(formData.get("bedrooms") ?? "0"), 10) || 0;
  const commercialArea =
    Number.parseFloat(String(formData.get("commercialArea") ?? "0")) || 0;

  const photos = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);
  const videoEntry = formData.get("video");
  const video = videoEntry instanceof File && videoEntry.size > 0 ? videoEntry : null;

  const fileErrors = [...validatePhotos(photos), ...validateVideo(video)];
  if (fileErrors.length > 0) {
    fieldErrors.files = fileErrors.join(" ");
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Some details need attention before the request can be sent.",
      fieldErrors,
    };
  }

  const summaryLines = [
    "CRESTLINE CLEANING SERVICES — QUOTATION REQUEST",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    `Preferred contact: ${contactMethod}`,
    area ? `Neighbourhood or area: ${area}` : "",
    locationPin ? `Location pin: ${locationPin}` : "",
    "",
    "Services requested:",
    ...services.map((service) => `- ${service}`),
    "",
    "Scope:",
    sofaSeats > 0 ? `Sofa seats (standard fabric): ${sofaSeats}` : "",
    leatherSeats > 0 ? `Leather seats: ${leatherSeats}` : "",
    chairCount > 0 ? `Dining or office chairs: ${chairCount}` : "",
    Object.keys(mattresses).length > 0
      ? `Mattresses: ${Object.entries(mattresses)
          .filter(([, count]) => count > 0)
          .map(([size, count]) => `${count} x ${size}`)
          .join(", ")}`
      : "",
    carpetMedium > 0 || carpetLarge > 0
      ? `Rugs: ${carpetMedium} medium, ${carpetLarge} large`
      : "",
    bedrooms > 0 ? `Bedrooms: ${bedrooms}` : "",
    propertyType ? `Property type: ${propertyType}` : "",
    commercialArea > 0 ? `Approximate commercial floor area: ${commercialArea} m²` : "",
    frequency ? `Service frequency: ${frequency}` : "",
    `Water available: ${water}`,
    `Electricity available: ${electricity}`,
    preferredDate ? `Preferred service date: ${preferredDate}` : "",
    "",
    conditionNotes ? `Condition notes: ${conditionNotes}` : "",
    accessConsiderations ? `Access considerations: ${accessConsiderations}` : "",
    fabricDetails ? `Special fabric or surface details: ${fabricDetails}` : "",
    "",
    photos.length > 0 ? `Photos selected: ${photos.map((p) => p.name).join(", ")}` : "",
    video ? `Video selected: ${video.name}` : "",
  ].filter((line) => line !== "");

  const summaryText = summaryLines.join("\n");
  const subject = `Quotation request — ${name}`;

  const payload = {
    name,
    email,
    phone,
    contactMethod,
    area,
    locationPin,
    services,
    scope: {
      sofaSeats,
      leatherSeats,
      chairCount,
      mattresses,
      carpetMedium,
      carpetLarge,
      bedrooms,
      propertyType,
      commercialArea,
      frequency,
      waterAvailability: water,
      electricityAvailability: electricity,
      preferredDate,
    },
    conditionNotes,
    accessConsiderations,
    fabricDetails,
    photos: photos.map((p) => ({ name: p.name, type: p.type, size: p.size })),
    video: video ? { name: video.name, type: video.type, size: video.size } : null,
  };

  const delivery = await deliver("quote-request", payload);

  if (delivery === "delivered") {
    return { status: "delivered", message: QUOTE_THANK_YOU };
  }
  if (delivery === "unconfigured") {
    return {
      status: "fallback",
      message: FALLBACK_NOTE,
      mailtoHref: buildMailto(subject, summaryText),
      summaryText,
    };
  }
  return {
    status: "error",
    message:
      "Your request could not be delivered just now. Please try again in a moment, or send it directly by email.",
    mailtoHref: buildMailto(subject, summaryText),
    summaryText,
  };
}

/* ---------------------------------------------------------------------------
 * Commercial site assessment
 * ------------------------------------------------------------------------- */

export async function submitSiteAssessment(formData: FormData): Promise<FormActionResult> {
  if (!passesSpamGuards(formData)) {
    return { status: "error", message: "The request could not be submitted. Please try again." };
  }

  const fieldErrors: Record<string, string> = {};

  const contactName = str(formData, "contactName", 80);
  const companyName = str(formData, "companyName", 120);
  const email = str(formData, "email", 254);
  const phone = str(formData, "phone", 20);
  const propertyType = str(formData, "propertyType", 60);
  const location = str(formData, "location", 120);
  const squareMetres = str(formData, "squareMetres", 20);
  const services = str(formData, "services", 400)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const frequency = str(formData, "frequency", 20);
  const preferredDate = str(formData, "preferredDate", 20);
  const notes = multiline(formData, "notes");

  if (contactName.length < 2) fieldErrors.contactName = "Please enter your name.";
  if (companyName.length < 2) fieldErrors.companyName = "Please enter the company or organisation name.";
  if (!isValidEmail(email)) fieldErrors.email = "Please enter a valid email address.";
  if (phone && !isValidPhone(phone)) fieldErrors.phone = "Please enter a valid phone number.";
  if (!propertyType) fieldErrors.propertyType = "Please choose a property type.";
  if (location.length < 2) fieldErrors.location = "Please enter the property location.";
  if (preferredDate && !isValidDateString(preferredDate)) {
    fieldErrors.preferredDate = "Please enter a valid date.";
  }
  if (services.length === 0) {
    fieldErrors.services = "Please select at least one required service.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Some details need attention before the request can be sent.",
      fieldErrors,
    };
  }

  const summaryText = [
    "CRESTLINE CLEANING SERVICES — SITE ASSESSMENT REQUEST",
    "",
    `Contact name: ${contactName}`,
    `Company: ${companyName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    `Property type: ${propertyType}`,
    `Location: ${location}`,
    squareMetres ? `Approximate size: ${squareMetres} m²` : "",
    "",
    "Required services:",
    ...services.map((service) => `- ${service}`),
    "",
    `Service frequency: ${frequency}`,
    preferredDate ? `Preferred date: ${preferredDate}` : "",
    notes ? `Notes: ${notes}` : "",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const subject = `Site assessment request — ${companyName}`;

  const delivery = await deliver("site-assessment", {
    contactName,
    companyName,
    email,
    phone,
    propertyType,
    location,
    squareMetres,
    services,
    frequency,
    preferredDate,
    notes,
  });

  if (delivery === "delivered") {
    return { status: "delivered", message: ASSESSMENT_THANK_YOU };
  }
  if (delivery === "unconfigured") {
    return {
      status: "fallback",
      message: FALLBACK_NOTE,
      mailtoHref: buildMailto(subject, summaryText),
      summaryText,
    };
  }
  return {
    status: "error",
    message:
      "Your request could not be delivered just now. Please try again in a moment, or send it directly by email.",
    mailtoHref: buildMailto(subject, summaryText),
    summaryText,
  };
}

/* ---------------------------------------------------------------------------
 * General enquiry (Contact page)
 * ------------------------------------------------------------------------- */

export async function submitEnquiry(formData: FormData): Promise<FormActionResult> {
  if (!passesSpamGuards(formData)) {
    return { status: "error", message: "The message could not be submitted. Please try again." };
  }

  const fieldErrors: Record<string, string> = {};

  const name = str(formData, "name", 80);
  const email = str(formData, "email", 254);
  const message = multiline(formData, "message", 4000);

  if (name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!isValidEmail(email)) fieldErrors.email = "Please enter a valid email address.";
  if (message.length < 10) fieldErrors.message = "Please write a short message (at least 10 characters).";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Some details need attention before the message can be sent.",
      fieldErrors,
    };
  }

  const summaryText = [
    "CRESTLINE CLEANING SERVICES — WEBSITE ENQUIRY",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  const subject = `Website enquiry — ${name}`;

  const delivery = await deliver("enquiry", { name, email, message });

  if (delivery === "delivered") {
    return { status: "delivered", message: ENQUIRY_THANK_YOU };
  }
  if (delivery === "unconfigured") {
    return {
      status: "fallback",
      message: FALLBACK_NOTE,
      mailtoHref: buildMailto(subject, summaryText),
      summaryText,
    };
  }
  return {
    status: "error",
    message:
      "Your message could not be delivered just now. Please try again in a moment, or send it directly by email.",
    mailtoHref: buildMailto(subject, summaryText),
    summaryText,
  };
}
