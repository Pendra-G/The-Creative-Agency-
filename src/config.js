// Single source of truth for contact details, packages and the offer.
export const SITE = {
  name: "Website Portfolio",
  email: "salvinshavnitnarayan@gmail.com",
  phone: "+679 2921000",
  location: "Viti Levu, Fiji",
};

export const PRIMARY_PHONE = SITE.phone;

/**
 * Founders carry no per-person contact details on purpose — the site routes
 * every enquiry through the one number and address in SITE above, so there is
 * a single place to answer and nothing to keep in sync in two spots.
 */
export const FOUNDERS = [
  {
    name: "Salvin Shavnit Narayan",
    initials: "SSN",
    role: "Creative & Marketing Director",
    focus: "Design direction, marketing and new business. First call is with him.",
    // Served from public/ rather than imported, so a missing file degrades to
    // the initials plate instead of breaking the build.
    photo: "/founders/SSN.jpg",
  },
  {
    name: "Upendra Gounder",
    initials: "URG",
    role: "Operations Director",
    focus: "Build, delivery and everything after launch.",
    photo: "/founders/Upendra%20Gounder%20side%20profile%20photo.png",
  },
];

/**
 * When the launch offer closes.
 *
 * A fixed point, not a rolling window — once it passes the card drops the
 * timer and reads "limited spots each month" instead. A countdown that quietly
 * resets itself is a dark pattern, and anyone who visits twice notices.
 *
 * NOTE(owner): this is a two-day window closing end of 13 Aug 2026. It will
 * lapse on its own — after that the Starter card still works, it just shows
 * "Limited spots each month" instead of a clock. Push the date out when you
 * genuinely extend the offer, but resetting it every two days to keep the
 * timer alive is the dark pattern this comment exists to warn about.
 */
export const OFFER_ENDS = "2026-08-13T23:59:59+12:00";

export const PACKAGES = [
  {
    key: "starter",
    name: "Starter",
    price: "FJ$499",
    was: "FJ$799",
    offer: true,
    badge: "Launch offer",
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
    line: "Two to three pages, when one scroll genuinely isn't enough.",
    includes: [
      "Everything in Starter",
      "Two to three pages",
      "Services, gallery or testimonials",
      "Facebook and Instagram linked up",
      "One month of small edits",
    ],
  },
  {
    key: "premium",
    name: "Premium",
    price: "FJ$1999",
    line: "Bookings, a shop, or a build with no template behind it.",
    includes: [
      "Everything in Growth",
      "Pages built to your scope",
      "Booking links or simple e-commerce",
      "Custom features and integrations",
      "Three months of small edits",
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
