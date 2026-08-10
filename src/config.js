// Single source of truth for contact details, packages and the offer.
export const SITE = {
  name: "Website Portfolio",
  email: "salvinshavnitnarayan@gmail.com",
  phone: "+679 2921000",
  location: "Viti Levu, Fiji",
};

export const PRIMARY_PHONE = SITE.phone;

export const FOUNDERS = [
  {
    name: "Salvin Shavnit Narayan",
    initials: "SSN",
    role: "Creative & Marketing Director",
    focus: "Design direction, marketing and new business.",
  },
  {
    name: "Upendra Gounder",
    initials: "URG",
    role: "Operations Director",
    focus: "Build, delivery and everything after launch.",
  },
];

/**
 * When the launch offer closes.
 *
 * TODO(owner): set a real date. A countdown that quietly resets itself is a
 * dark pattern, so this is a fixed point — once it passes the card drops the
 * timer and simply reads "limited spots" rather than faking urgency.
 */
export const OFFER_ENDS = "2026-09-30T23:59:59+12:00";

export const PACKAGES = [
  {
    key: "starter",
    name: "Starter",
    price: "FJ$499",
    was: "FJ$799",
    offer: true,
    line: "One page, fully animated. The whole business on a single scroll.",
    includes: [
      "One animated page",
      "Mobile-first, fast on 4G",
      "Call and Viber buttons wired up",
      "Basic SEO — titles, meta, headings",
      "Google Business Profile set up",
    ],
  },
  {
    key: "growth",
    name: "Growth",
    price: "FJ$999",
    line: "Two to three pages when one scroll genuinely isn't enough.",
    includes: [
      "Everything in Starter",
      "Two to three pages",
      "Services, gallery or testimonials",
      "Facebook and Instagram linked up",
      "One month of small edits",
    ],
  },
  {
    key: "custom",
    name: "Custom",
    price: "Quoted",
    line: "Bookings, a shop, or something none of the above covers.",
    includes: [
      "Everything in Growth",
      "More pages, built to your scope",
      "Booking links or simple e-commerce",
      "Custom features and integrations",
      "Quoted individually, free",
    ],
  },
];

export const telHref = (phone = PRIMARY_PHONE) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/**
 * Viber deep link. Opens the chat on a device with Viber installed; on a
 * desktop without it the OS does nothing, which is why calling is always
 * offered alongside rather than instead.
 */
export const viberHref = (phone = PRIMARY_PHONE) =>
  `viber://chat?number=${encodeURIComponent(phone.replace(/[^\d+]/g, ""))}`;

export const mailtoHref = (subject = "Website enquiry", body = "") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;
