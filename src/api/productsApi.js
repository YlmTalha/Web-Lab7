const BASE = 'https://dummyjson.com';

// fetch does not reject on 404/500, so we check res.ok ourselves.
async function getJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchProducts(signal) {
  const data = await getJson(`${BASE}/products?limit=100`, signal);
  return data.products;
}

export function fetchProduct(id, signal) {
  return getJson(`${BASE}/products/${id}`, signal);
}
