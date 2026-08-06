// Single source of truth for contact details and links.
//
// TODO(owner): `email` is still the placeholder that shipped with the original
// build — replace it with the real inbox before launch. Leaving a social URL
// empty simply hides that link rather than rendering a dead "#".
export const SITE = {
  name: "The Creative Agency",
  email: "hello@creative.agency",
  phones: ["+679 2921000", "+679 8091770"],
  location: "Viti Levu, Fiji",
  socials: {
    Facebook: "https://www.facebook.com/profile.php?id=61565173942247",
    Instagram: "",
    LinkedIn: "",
  },
};

export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

// Enquiry links open the visitor's mail client with the subject pre-filled.
// Swap this for a real form endpoint (Formspree, Netlify Forms, etc.) when
// one is available — see the notes in the handover.
export const mailtoHref = (subject = "Website enquiry", body = "") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;
