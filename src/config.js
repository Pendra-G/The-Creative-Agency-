// Single source of truth for contact details and links.
//
// TODO(owner): `email` is still the placeholder that shipped with the original
// build — replace it with the real inbox before launch. Leaving a social URL
// empty simply hides that link rather than rendering a dead "#".
export const SITE = {
  name: "Website Portfolio",
  // TODO(owner): add your name so the "who's behind it" section can sign off.
  // Left blank it simply hides the signature rather than inventing one.
  owner: "",
  email: "hello@creative.agency",
  phones: ["+679 2921000", "+679 8091770"],
  location: "Viti Levu, Fiji",
  price: "FJ$499",
  socials: {
    Facebook: "https://www.facebook.com/profile.php?id=61565173942247",
    Instagram: "",
    LinkedIn: "",
  },
};

// The number every call-to-action points at.
export const PRIMARY_PHONE = SITE.phones[0];

export const telHref = (phone = PRIMARY_PHONE) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/**
 * Viber deep link. Opens the chat directly on a device with Viber installed;
 * on desktop without it the OS simply does nothing, which is why calling is
 * always offered alongside rather than instead.
 */
export const viberHref = (phone = PRIMARY_PHONE) =>
  `viber://chat?number=${encodeURIComponent(phone.replace(/[^\d+]/g, ""))}`;

// Enquiry links open the visitor's mail client with the subject pre-filled.
// Swap this for a real form endpoint (Formspree, Netlify Forms, etc.) when
// one is available — see the notes in the handover.
export const mailtoHref = (subject = "One-page website enquiry", body = "") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;
