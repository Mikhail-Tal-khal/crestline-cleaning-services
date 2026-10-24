"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { AlertIcon } from "@/components/icons";

/**
 * Shared, accessibly-wired form fields with iOS-style inset wells and
 * floating labels (text/textarea). Selects and date pickers use a clean
 * static label — the native controls can't float reliably.
 */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="field-error">
      <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function RequiredMark() {
  return (
    <span className="text-royal dark:text-bright" aria-hidden="true">
      {" "}
     *
    </span>
  );
}

function FloatingLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "pointer-events-none absolute left-4 top-[1.05rem] text-[15px] text-slate-500 transition-all duration-150 dark:text-silver/80",
        "peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-royal dark:peer-focus:text-bright",
        "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold dark:peer-[:not(:placeholder-shown)]:text-silver"
      )}
    >
      {children}
      {required ? <RequiredMark /> : null}
    </label>
  );
}

export function TextField({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  error,
  hint,
  placeholder,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "url";
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required={required}
          placeholder=" "
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hintId, errorId) || undefined}
          className="field-input peer"
        />
        <FloatingLabel htmlFor={id} required={required}>
          {label}
        </FloatingLabel>
      </div>
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      <FieldError id={errorId ?? ""} message={error} />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  onBlur,
  required,
  error,
  hint,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
  rows?: number;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          required={required}
          placeholder=" "
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(hintId, errorId) || undefined}
          className="field-input peer resize-y"
        />
        <FloatingLabel htmlFor={id} required={required}>
          {label}
        </FloatingLabel>
      </div>
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      <FieldError id={errorId ?? ""} message={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  required,
  error,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
  hint?: string;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      <select
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hintId, errorId) || undefined}
        className="field-static mt-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={errorId ?? ""} message={error} />
    </div>
  );
}

export function DateField({
  label,
  name,
  value,
  onChange,
  error,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      <input
        id={id}
        name={name}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hintId, errorId) || undefined}
        className="field-static mt-2"
      />
      <FieldError id={errorId ?? ""} message={error} />
    </div>
  );
}
