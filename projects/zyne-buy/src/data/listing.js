const mediaRoot = "/assets/properties/7101-wendemere-st-houston-tx-77088";
const photo = (id, file, label, alt) => ({
  id,
  label,
  alt,
  src: `${mediaRoot}/display/${file.toLowerCase().replace(/\.(?:jpe?g|png)$/i, ".webp")}`,
  fullSrc: `${mediaRoot}/original/${file}`,
  thumbnailSrc: `${mediaRoot}/thumbnail/${file.toLowerCase().replace(/\.(?:jpe?g|png)$/i, ".webp")}`
});

const photos = [
  photo("exterior", "FRONT.jpg", "Front exterior", "Front exterior of 7101 Wendemere St"),
  photo("living-room", "LIVING-ROOM.jpg", "Living room", "Staged living room"),
  photo("kitchen", "KITCHEN.jpg", "Kitchen", "Kitchen interior"),
  photo("bedroom-red", "BEDROOM-2.jpg", "Red bedroom", "Bedroom with red accent walls"),
  photo("bedroom-blue", "BEDROOM-1.jpg", "Blue bedroom", "Bedroom with blue accent walls"),
  photo("bedroom-office", "BEDROOM-3.jpg", "Bedroom and office", "Bedroom staged as a home office"),
  photo("bathroom", "BATHROOM.jpeg", "Bathroom", "Bathroom interior"),
  photo("front-yard", "FRONT-YARD.jpg", "Front yard", "Wide front-yard view of the property"),
  photo("back-yard", "BACK-YARD.jpg", "Back yard", "Back-yard view of the property")
];

export const listing = {
  id: "7101-wendemere-st-houston-tx-77088-buy",
  route: "/homedetail/7101-wendemere-st-houston-tx-77088/buy/",
  status: "FOR SALE · SELLER FINANCING",
  addressLine1: "7101",
  addressLine2: "Wendemere St",
  location: "Houston, TX 77088",
  price: "$150,000",
  description: "Seller-financed Acres Homes investment opportunity with a 6.51% negotiated note, 20% down payment, oversized 7,250 sqft lot, zero HOA, and a value-add path toward $1,700/month target rent.",
  metrics: [
    { icon: "tag", label: "PURCHASE PRICE", value: "$150,000" },
    { icon: "piggy", label: "DOWN PAYMENT", value: "$30,000" },
    { icon: "percent", label: "NOTE RATE", value: "6.51%" },
    { icon: "coins", label: "TARGET CASH FLOW", value: "~$400/mo" }
  ],
  tags: ["Seller Financing", "20% Down", "6.51% Note", "Zero HOA", "Target DSCR 1.30"],
  highlights: [
    { icon: "document", lines: ["Seller-Financed Note", "Financing"] },
    { icon: "dollar", lines: ["20% Down", "$30,000"] },
    { icon: "chart", lines: ["Target Rent", "$1,700/mo"] },
    { icon: "shield", lines: ["Target DSCR", "1.30"] }
  ],
  agent: {
    name: "Carissa Weber",
    badge: "PLATINUM",
    brokerage: "Better Homes and Gardens Real Estate",
    office: "Gary Greene – Sugar Land",
    photo: { id: "agent", alt: "Carissa Weber", src: "/assets/agents/carissa-weber.webp" }
  },
  photos,
  galleryOrder: ["exterior", "living-room", "kitchen", "bedroom-red", "bedroom-blue", "bedroom-office", "bathroom", "front-yard", "back-yard"],
  previewSlots: {
    hero: { photoId: "exterior", position: "50% 50%" },
    upperRight: { photoId: "living-room", position: "50% 53%" },
    middleRight: { photoId: "kitchen", position: "50% 54%" },
    lowerRight: { photoId: "bedroom-red", position: "54% 54%" },
    bottomLeft: { photoId: "bedroom-blue", position: "50% 58%" },
    bottomCenter: { photoId: "living-room", position: "50% 56%" }
  }
};
