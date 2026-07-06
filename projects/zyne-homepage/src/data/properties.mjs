const wendemereMedia = Object.freeze({
  gallery: "/assets/catalog/properties/7101-wendemere-st/gallery",
  thumbnails: "/assets/catalog/properties/7101-wendemere-st/thumbnails",
  mobileThumbnails: "/assets/catalog/properties/7101-wendemere-st/thumbnails-mobile"
});

export const properties = [
  {
    id: "7101-wendemere-st-houston-tx-77088",
    template: "rental", // The routing key
    canonical: "https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/",
    media: wendemereMedia,
    details: {
      address: "7101 Wendemere St",
      city: "Houston",
      state: "TX",
      zip: "77088",
      price: "$1,495/month",
      beds: "3",
      baths: "1 full",
      interior: "1,064 sqft",
      lot: "7,250 sqft",
      status: "For Rent · Active",
      description: "This well-maintained three-bedroom bungalow offers comfort, space, and convenience. Enjoy a covered front porch, a large lot, and an open layout that connects the kitchen and dining area seamlessly. With no HOA and easy access to major roads, schools, and shopping, this home is ready for you."
    },
    agent: {
      name: "Carissa Weber",
      badge: "PLATINUM",
      brokerage: "Better Homes and Gardens Real Estate",
      market: "Gary Greene - Sugar Land",
      profileUrl: "https://www.har.com/carissa-weber/agent_WEBERC",
      photo: "/assets/catalog/agents/carissa-weber.webp"
    }
  },
  {
    id: "7101-wendemere",
    template: "investment",
    media: wendemereMedia,
    status: "For Sale",
    address: "7101 Wendemere St",
    city: "Houston",
    state: "TX",
    zip: "77088",
    price: "$150,000",
    description: "Seller-financed Acres Homes investment opportunity with a 6.51% negotiated note, 20% down payment, oversized 7,250 sqft lot, zero HOA, and a value-add path toward $1,700/month target rent.",
    agentName: "Carissa Weber",
    brokerage: "Better Homes and Gardens Real Estate<br>Gary Greene - Sugar Land",
    agentImage: "/assets/catalog/agents/carissa-weber.webp"
  }
];

export const navItems = [
  ["Services", "/services/"],
  ["Visibility", "/grow-my-visibility/"],
  ["Brand", "/build-my-brand/"],
  ["Business", "/improve-my-business/"],
  ["AI", "/use-ai/"],
  ["Conversion", "/convert-more-clients/"],
  ["Intelligence", "/intelligence/"],
  ["Delivery", "/delivery/"]
];
