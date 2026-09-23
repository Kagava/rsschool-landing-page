export async function getProducts() {
  const response = await fetch("./scripts/product.json");
  const data = response.json();
  return data;
}
