import { create } from 'zustand';

const STORAGE_KEY = 'cart-items';

// read saved items safely: missing or corrupted data gives an empty cart
function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: loadItems(), // [{ id, title, price, quantity }]

  addItem: (product) =>
    set((state) => {
      const exists = state.items.some((i) => i.id === product.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      const { id, title, price } = product;
      return { items: [...state.items, { id, title, price, quantity: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  // a quantity below 1 removes the item
  setQuantity: (id, quantity) =>
    set((state) =>
      quantity < 1
        ? { items: state.items.filter((i) => i.id !== id) }
        : { items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)) }
    ),

  clear: () => set({ items: [] }),
}));

// Persistence from outside React: save whenever items change.
useCartStore.subscribe((state, prevState) => {
  if (state.items === prevState.items) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch {
    // storage full or blocked: the cart still works for this visit
  }
});

// Derived values are computed from items, never stored.
// They return primitives (numbers), so components re-render only when the number changes.
export const selectItemCount = (state) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectTotalPrice = (state) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
