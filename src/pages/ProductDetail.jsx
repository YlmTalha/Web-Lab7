import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { fetchProduct } from '../api/productsApi.js';
import { useCartStore } from '../store/cartStore.js';

export default function ProductDetail() {
  const { id } = useParams(); // always a string, e.g. "5"
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem); // select only the action

  // [id] as dependency: going from /products/1 to /products/2 loads the new product
  const { loading, error, data: product } = useFetch(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const backButton = (
    <button onClick={() => navigate('/products')}>&larr; Back to products</button>
  );

  if (loading) return <p>Loading product...</p>;

  if (error) {
    const notFound = error.message === 'HTTP 404' || error.message === 'HTTP 400';
    return (
      <section>
        <h1>{notFound ? 'Product not found' : 'Something went wrong'}</h1>
        <p className="error">
          {notFound ? `There is no product with id "${id}".` : error.message}
        </p>
        {backButton}
      </section>
    );
  }

  return (
    <section className="detail">
      {backButton}
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} width="250" />
      <p className="muted">{product.category}</p>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <button onClick={() => addItem(product)}>Add to cart</button>
      <p>
        {/* Number(id): the URL parameter is a string */}
        <Link to={`/products/${Number(id) + 1}`}>Next product &rarr;</Link>
      </p>
    </section>
  );
}
