import ProductCard from '../components/ProductCard.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { fetchProducts } from '../api/productsApi.js';

export default function ProductList() {
  // load once; useFetch handles loading / error / data and cancels on unmount
  const { loading, error, data: products } = useFetch(fetchProducts, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">Could not load products: {error.message}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <section>
      <h1>Products</h1>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
