export const customDeliveryContent = {
  title: "Custom Delivery",
  seoTitle: "Custom Delivery | ZYNE",
  description: "A ZYNE delivery page for custom scopes, staged implementation, and bespoke operational support that does not fit a fixed-price product.",
  canonicalPath: "/delivery/custom/",
  eyebrow: "Custom delivery",
  intro: "This page shows a read-only delivery invoice preview. Review the billed breakdown, confirm the total, and continue to Stan for payment.",
  checkoutUrl: "https://stan.store/ZYNE_store/p/custom-order--invoice-checkout",
  currency: {
    primarySymbol: "⃁",
    secondarySymbol: "$",
    code: "SAR",
    exchangeRate: 3.75
  },
  invoice: {
    service: "Delivery Fee",
    items: [
      {
        label: "Delivery Fee",
        start: "16:38",
        end: "18:21",
        durationMinutes: 103,
        ratePerHour: 50
      },
      {
        label: "Delivery Fee",
        start: "18:21",
        end: "19:20",
        durationMinutes: 59,
        ratePerHour: 200
      }
    ]
  },
  primaryCta: {
    label: "Pay Now",
    href: "https://stan.store/ZYNE_store/p/custom-order--invoice-checkout"
  },
  secondaryCta: {
    label: "Review Breakdown",
    href: "#invoice-breakdown"
  },
  cards: [
    {
      label: "Scope",
      title: "Read-only billing preview",
      body: "The amounts are shown for review only. The customer can see the billed breakdown, but they cannot edit the invoice from this page."
    },
    {
      label: "Total",
      title: "Calculated before checkout",
      body: "Each line item is calculated from its time block and hourly rate, then summarized into the total before handoff to Stan."
    },
    {
      label: "Checkout",
      title: "Stan handles payment",
      body: "The checkout button sends the customer directly to Stan, while the ZYNE page remains the source of the previewed billing details."
    }
  ],
  fitNotes: [
    "Best for requests that do not match an existing fixed-price ZYNE service.",
    "Useful when the work needs discovery before the scope, timeline, or deliverables can be confirmed.",
    "Not intended to replace existing product pages when a fixed-price offer already fits."
  ]
};
