import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { fetchProducts } from '../api/productsApi.js';

export default function ProductList() {
  const { loading, error, data: products } = useFetch(fetchProducts, []);

  // the filter values live in the URL: /products?category=beauty&q=mascara
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? '';

  // change one query parameter without losing the others
  function updateParam(key, value) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true } // typing should not add a history entry per letter
    );
  }

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">Could not load products: {error.message}</p>;

  // derived during render: no state, no effect
  const categories = [...new Set(products.map((p) => p.category))].sort();
  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) &&
      (category === '' || p.category === category)
  );

  return (
    <section>
      <h1>Products</h1>

      <div className="filters">
        <input
          type="search"
          placeholder="Search by title"
          value={q}
          onChange={(e) => updateParam('q', e.target.value)}
        />
        <select value={category} onChange={(e) => updateParam('category', e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
