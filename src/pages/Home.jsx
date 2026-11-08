import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section>
      <h1>Welcome to the Online Shop</h1>
      <p>Browse the catalogue, filter products and add them to your cart.</p>
      <Link to="/products">See all products</Link>
    </section>
  );
}
