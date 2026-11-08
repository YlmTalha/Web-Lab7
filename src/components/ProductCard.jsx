import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <article className="card">
      <Link to={`/products/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} width="150" height="150" />
        <h3>{product.title}</h3>
      </Link>
      <p className="muted">{product.category}</p>
      <p className="price">${product.price}</p>
    </article>
  );
}
