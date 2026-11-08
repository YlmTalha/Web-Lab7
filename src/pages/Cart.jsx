import { Link } from 'react-router-dom';
import { useCartStore, selectTotalPrice } from '../store/cartStore.js';

export default function Cart() {
  // selectors return existing references or primitives
  const items = useCartStore((s) => s.items);
  const total = useCartStore(selectTotalPrice);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  if (items.length === 0) {
    return (
      <section>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Go to products</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your cart</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <span className="cart-title">{item.title}</span>
            <span>${item.price}</span>
            <button onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="price">Total: ${total.toFixed(2)}</p>
      <button onClick={clear}>Clear cart</button>
    </section>
  );
}
