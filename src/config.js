// Single source of truth for contact details, packages and the offer.
export const SITE = {
  name: "Website Portfolio",
  email: "salvinshavnitnarayan@gmail.com",
  phone: "+679 2921000",
  location: "Sigatoka, Fiji",
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
    role: "Sales and Marketing",
    /* Design moved to the other founder with the new titles, so it comes out of
       this focus line — leaving it here would contradict the role above it. */
    focus: "Marketing, new business and looking after clients. First call is with him.",
    photo: "/founders/SSN.jpg",
  },
  {
    name: "Upendra Gounder",
    initials: "URG",
    role: "Design and Development",
    focus: "Design, build, delivery and everything after launch.",
    photo: "/founders/Upendra Gounder side profile photo.png",
  },
];

/**
 * When the launch offer closes.
 *
 * A fixed point, not a rolling window — once it passes the card drops the
 * timer and reads "limited spots each month" instead. A countdown that quietly
 * resets itself is a dark pattern, and anyone who visits twice notices.
 *
 * NOTE(owner): this runs to the end of August 2026 (Fiji time). It will lapse
 * on its own — after that the Starter card still works, it just shows "Limited
 * spots each month" instead of a clock. Push the date out when you genuinely
 * extend the offer, but rolling it to the end of every month to keep the timer
 * alive is the dark pattern this comment exists to warn about.
 */
export const OFFER_ENDS = "2026-08-31T23:59:59+12:00";

export const PACKAGES = [
  {
    key: "starter",
    name: "Starter",
    price: "FJ$499",
    /* Kept as the record of the list price, but nothing renders it — the card
       shows the offer price on its own, at the owner's direction. Restoring a
       struck-through "was" means adding it back in Packages.jsx, not here. */
    was: "FJ$699",
    offer: true,
    badge: "Special offer",
    line: "One page, fully animated. Everything a small business needs to be found and trusted.",
    includes: [
      "One fully animated page",
      "Mobile-first, fast on 4G",
      "Professional brand presentation",
      "Call and Viber buttons wired up",
      "1 year domain and hosting included",
      "Google Business Profile set up",
      "Basic SEO — titles, meta, headings",
    ],
  },
  {
    key: "growth",
    name: "Growth",
    price: "FJ$999",
    line: "Two to three pages, when one scroll genuinely isn't enough.",
    /* Domain and hosting is repeated on every tier rather than left to be
       inferred from "Everything in Starter" — it is a headline inclusion, and a
       buyer comparing the three cards side by side should not have to work out
       that it carries upward. */
    includes: [
      "Everything in Starter",
      "1 year domain and hosting included",
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
      "1 year domain and hosting included",
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
