export const customDeliveryContent = {
  title: "Custom Delivery",
  seoTitle: "Custom Delivery | ZYNE",
  description: "Review your custom delivery bill, confirm the total, and continue to Stan for checkout.",
  shareDescription: "Read-only invoice preview for custom delivery. Confirm the SAR 282.50 total, then continue to Stan for checkout.",
  shareImage: "/assets/catalog/properties/7101-wendemere-st/gallery/front-yard-mailbox-carport.png",
  canonicalPath: "/delivery/custom/",
  eyebrow: "View bill",
  intro: "This is a read-only bill preview. It shows the breakdown, the total, and the checkout path to Stan.",
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
    label: "Pay now",
    href: "https://stan.store/ZYNE_store/p/custom-order--invoice-checkout"
  },
  secondaryCta: {
    label: "View breakdown",
    href: "#invoice-breakdown"
  },
  cards: [
    {
      label: "Breakdown",
      title: "What you are billed for",
      body: "The invoice shows each time block, the rate, and the calculated cost."
    },
    {
      label: "Total",
      title: "Your total before checkout",
      body: "The total and approximate USD value are shown before you continue to payment."
    },
    {
      label: "Checkout",
      title: "Pay on Stan",
      body: "Use the button to finish payment on Stan. The bill on this page stays read-only."
    }
  ],
  fitNotes: [
    "Review the bill before checkout.",
    "If anything looks off, confirm the invoice details before paying on Stan."
  ]
};
