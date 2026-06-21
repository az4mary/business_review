import { getProduct } from "./products.js";

export const productServiceSchema = (productId) => {
  const product = getProduct(productId);
  if (!product) return null;

  return {
    "@type": product.schemaType || "Service",
    name: product.name,
    description: product.description,
    url: product.internalUrl,
    image: product.image ? `/assets/${product.image}` : undefined,
    offers: {
      "@type": "Offer",
      price: product.priceValue,
      priceCurrency: product.currency,
      availability: product.checkoutStatus === "live" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      url: product.checkoutStatus === "live" ? product.stanCheckoutUrl : product.internalUrl
    }
  };
};

export const productItemListSchema = (productIds) => ({
  "@type": "ItemList",
  itemListElement: productIds
    .map((id, index) => {
      const item = productServiceSchema(id);
      return item ? { "@type": "ListItem", position: index + 1, item } : null;
    })
    .filter(Boolean)
});
