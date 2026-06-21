import { getProduct } from "./products.js";

export const productAnalyticsPayload = ({
  productId,
  destinationType = "internal_product_page",
  destinationUrl = null
}) => {
  const product = getProduct(productId);
  if (!product) return null;

  return {
    product_id: product.id,
    product_name: product.name,
    category: product.category,
    price: product.price,
    price_value: product.priceValue,
    currency: product.currency,
    destination_type: destinationType,
    destination_url: destinationUrl || product.internalUrl
  };
};

export const checkoutAnalyticsPayload = (productId) => {
  const product = getProduct(productId);
  if (!product) return null;

  return productAnalyticsPayload({
    productId,
    destinationType: "stan_checkout",
    destinationUrl: product.stanCheckoutUrl
  });
};
