import { useRef, useState } from "react";
import { Button, Check } from "./ui.jsx";
import { SITE, PACKAGES } from "../config.js";

/**
 * Enquiry form. Every submission reaches SITE.email (Salvin).
 *
 * This site is a static build with no server of its own, so there are two ways
 * a form can actually deliver:
 *
 *   1. FORM_ENDPOINT set  — the fields are POSTed as JSON in the background and
 *      the visitor never leaves the page. Works with Web3Forms, Formspree,
 *      Basin and anything else that accepts a JSON body. This is the good path.
 *
 *   2. FORM_ENDPOINT empty (current) — the form composes a prefilled email to
 *      SITE.email and hands it to the visitor's mail client. No signup, works
 *      immediately, but it depends on them having mail set up and pressing send.
 *
 * To switch to path 1: create a free Web3Forms access key at web3forms.com,
 * point it at SITE.email, then set FORM_ENDPOINT and FORM_ACCESS_KEY below.
 * Nothing else needs to change.
 */
const FORM_ENDPOINT = "";
const FORM_ACCESS_KEY = "";

const FIELDS = {
  name: { label: "Your name", required: true, autoComplete: "name" },
  business: { label: "Business name", required: false, autoComplete: "organization" },
  email: { label: "Email", required: false, type: "email", autoComplete: "email" },
  phone: { label: "Phone", required: false, type: "tel", autoComplete: "tel" },
};

const EMPTY = { name: "", business: "", email: "", phone: "", package: "", message: "" };

/** Deliberately permissive — it catches typos, not unusual-but-valid addresses. */
const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please add your name so we know who we are replying to.";
  if (!values.message.trim()) errors.message = "Tell us briefly what the site needs to do.";

  // One way to reach them back is the actual requirement — either channel works.
  const hasEmail = values.email.trim().length > 0;
  const hasPhone = values.phone.trim().length > 0;
  if (!hasEmail && !hasPhone) {
    errors.email = "Add an email or a phone number so we can get back to you.";
  } else if (hasEmail && !looksLikeEmail(values.email)) {
    errors.email = "That email address looks incomplete — check for a typo.";
  }

  return errors;
}

const INPUT =
  "h-12 w-full rounded-md border bg-canvas px-4 text-body-md text-white placeholder:text-muted-soft " +
  "transition-colors duration-200 focus:outline-none focus:ring-0";

const inputBorder = (hasError) =>
  hasError
    ? "border-semantic-down focus:border-semantic-down"
    : "border-hairline focus:border-2 focus:border-accent-text";

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const formRef = useRef(null);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    // Clear a field's error as soon as the visitor starts fixing it, rather
        // than making them submit again to find out.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const mailtoFallback = () => {
    const lines = [
      `Name: ${values.name}`,
      values.business && `Business: ${values.business}`,
      values.email && `Email: ${values.email}`,
      values.phone && `Phone: ${values.phone}`,
      values.package && `Package: ${values.package}`,
      "",
      values.message,
    ].filter(Boolean);

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Website enquiry — ${values.name}`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length) {
      // Send focus to the first thing that needs attention.
      const firstBad = Object.keys(found)[0];
      formRef.current?.querySelector(`[name="${firstBad}"]`)?.focus();
      setStatus("idle");
      return;
    }

    if (!FORM_ENDPOINT) {
      mailtoFallback();
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...values,
          ...(FORM_ACCESS_KEY ? { access_key: FORM_ACCESS_KEY } : {}),
          subject: `Website enquiry — ${values.name}`,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-hairline bg-canvas p-8" role="status" aria-live="polite">
        <p className="flex items-start gap-3 text-body-lg text-white">
          <Check className="mt-[0.35em] shrink-0 text-semantic-up" />
          <span>
            {FORM_ENDPOINT
              ? "Thanks — that reached us. We usually reply within a day."
              : "Your email client should be open with the message ready. Press send and it comes straight to us."}
          </span>
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setStatus("idle");
          }}
          className="mt-6 min-h-[44px] text-button text-accent-text transition-colors duration-200 hover:text-white"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {Object.entries(FIELDS).map(([key, f]) => {
          const err = errors[key];
          return (
            <div key={key} className={key === "name" ? "sm:col-span-2" : undefined}>
              <label htmlFor={`f-${key}`} className="block text-caption text-muted">
                {f.label}
                {f.required && <span className="text-semantic-down"> *</span>}
              </label>
              <input
                id={`f-${key}`}
                name={key}
                type={f.type || "text"}
                autoComplete={f.autoComplete}
                value={values[key]}
                onChange={set(key)}
                aria-invalid={err ? "true" : undefined}
                aria-describedby={err ? `e-${key}` : undefined}
                className={`mt-2 ${INPUT} ${inputBorder(!!err)}`}
              />
              {err && (
                <p id={`e-${key}`} className="mt-2 text-caption text-semantic-down">
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <label htmlFor="f-package" className="block text-caption text-muted">
          Package you have in mind
        </label>
        <select
          id="f-package"
          name="package"
          value={values.package}
          onChange={set("package")}
          className={`mt-2 ${INPUT} ${inputBorder(false)}`}
        >
          <option value="">Not sure yet</option>
          {PACKAGES.map((p) => (
            <option key={p.key} value={`${p.name} (${p.price})`}>
              {p.name} — {p.price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-message" className="block text-caption text-muted">
          What does the site need to do?
          <span className="text-semantic-down"> *</span>
        </label>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          placeholder="A sentence or two is plenty."
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "e-message" : undefined}
          className={`mt-2 w-full resize-y rounded-md border bg-canvas px-4 py-3 text-body-md text-white placeholder:text-muted-soft transition-colors duration-200 focus:outline-none ${inputBorder(
            !!errors.message
          )}`}
        />
        {errors.message && (
          <p id="e-message" className="mt-2 text-caption text-semantic-down">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-caption text-semantic-down">
          That did not go through. Please try again, or call us on {SITE.phone} instead.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button as="button" type="submit" variant="primary" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-caption text-muted">Or call — it is usually faster.</p>
      </div>
    </form>
  );
}
