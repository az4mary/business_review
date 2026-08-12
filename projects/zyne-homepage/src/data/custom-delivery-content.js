export const customDeliveryContent = {
  title: "Custom Delivery",
  seoTitle: "Custom Delivery | ZYNE",
  description: "Review your custom delivery bill, confirm the total, and continue to Stan for checkout.",
  shareDescription: "Read-only invoice preview for custom delivery. Confirm the SAR 282.50 total, then continue to Stan for checkout.",
  shareImage: "/assets/catalog/products/share-preview-thumbnail.png",
  canonicalPath: "/delivery/custom/",
  eyebrow: "View bill",
  intro: "This is a read-only bill preview. It shows the breakdown, the total, and the checkout path to Stan.",
  deliveryDate: "August 4, 2026",
  translations: {
    ar: {
      htmlLang: "ar",
      eyebrow: "عرض الفاتورة",
      title: "التوصيل المخصص",
      description: "راجع فاتورة التوصيل المخصص، وتأكد من الإجمالي، ثم تابع إلى Stan لإتمام الدفع.",
      intro: "هذه معاينة فاتورة للقراءة فقط. تعرض التفاصيل، والإجمالي، وطريق إتمام الدفع عبر Stan.",
      deliveryDateLabel: "تاريخ التوصيل",
      checkoutLabel: "إتمام الدفع",
      checkoutTitle: "الدفع عبر Stan",
      checkoutBody: "راجع الفاتورة هنا، ثم أكمل الدفع في Stan.",
      payNow: "ادفع الآن",
      invoiceTitle: "معاينة الفاتورة",
      invoiceService: "Delivery Fee",
      invoiceItemLabel: "Delivery Fee",
      invoiceService: "Delivery Fee",
      rateLinePrefix: "$1",
      rateLineEquals: "=",
      totalLabel: "الإجمالي",
      approxUsdLabel: "تقريبًا بالدولار",
      continueToStan: "تابع إلى Stan",
      task: "المهمة",
      start: "البداية",
      end: "النهاية",
      duration: "المدة",
      rate: "السعر",
      cost: "التكلفة",
      beforePay: "قبل الدفع",
      quickChecks: "مراجعات سريعة",
      quickCheck1: "راجع الفاتورة قبل إتمام الدفع.",
      quickCheck2: "إذا كان هناك شيء غير صحيح، أكد تفاصيل الفاتورة قبل الدفع عبر Stan."
    },
    es: {
      htmlLang: "es",
      eyebrow: "Ver factura",
      title: "Entrega personalizada",
      description: "Revisa la factura de tu entrega personalizada, confirma el total y continúa a Stan para pagar.",
      intro: "Esta es una vista previa de solo lectura. Muestra el desglose, el total y el enlace de pago en Stan.",
      deliveryDateLabel: "Fecha de entrega",
      checkoutLabel: "Pagar",
      checkoutTitle: "Pago en Stan",
      checkoutBody: "Revisa la factura aquí y completa el pago en Stan.",
      payNow: "Pagar ahora",
      invoiceTitle: "Vista previa de la factura",
      invoiceService: "Delivery Fee",
      invoiceItemLabel: "Delivery Fee",
      invoiceService: "Delivery Fee",
      rateLinePrefix: "$1",
      rateLineEquals: "=",
      totalLabel: "Total",
      approxUsdLabel: "Aprox. USD",
      continueToStan: "Continuar a Stan",
      task: "Tarea",
      start: "Inicio",
      end: "Fin",
      duration: "Duración",
      rate: "Tarifa",
      cost: "Costo",
      beforePay: "Antes de pagar",
      quickChecks: "Verificaciones rápidas",
      quickCheck1: "Revisa la factura antes de pagar.",
      quickCheck2: "Si algo no cuadra, confirma los detalles antes de pagar en Stan."
    },
    fr: {
      htmlLang: "fr",
      eyebrow: "Voir la facture",
      title: "Livraison personnalisée",
      description: "Consultez votre facture de livraison personnalisée, confirmez le total, puis poursuivez vers Stan pour payer.",
      intro: "Il s'agit d'un aperçu en lecture seule. Il affiche le détail, le total et le chemin de paiement vers Stan.",
      deliveryDateLabel: "Date de livraison",
      checkoutLabel: "Paiement",
      checkoutTitle: "Paiement sur Stan",
      checkoutBody: "Vérifiez la facture ici, puis terminez le paiement sur Stan.",
      payNow: "Payer maintenant",
      invoiceTitle: "Aperçu de facture",
      invoiceService: "Delivery Fee",
      invoiceItemLabel: "Delivery Fee",
      invoiceService: "Delivery Fee",
      rateLinePrefix: "$1",
      rateLineEquals: "=",
      totalLabel: "Total",
      approxUsdLabel: "Env. USD",
      continueToStan: "Continuer vers Stan",
      task: "Tâche",
      start: "Début",
      end: "Fin",
      duration: "Durée",
      rate: "Tarif",
      cost: "Coût",
      beforePay: "Avant paiement",
      quickChecks: "Vérifications rapides",
      quickCheck1: "Vérifiez la facture avant de payer.",
      quickCheck2: "Si quelque chose semble incorrect, confirmez les détails avant de payer sur Stan."
    }
  },
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
  invoiceItemLabel: "Delivery Fee",
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
