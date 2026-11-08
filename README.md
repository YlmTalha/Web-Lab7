# Assignment 7 - Online Shop (React Router, Context, Zustand)

A small multi-page online shop built with React and Vite. Products come from the public
[DummyJSON](https://dummyjson.com) API.

## How to run

```bash
npm install
npm run dev
```

Demo account: `230408032@st.biruni.edu.tr` / `demo123456`

## File organization

```
src/
├─ api/
│  ├─ productsApi.js     fetchProducts / fetchProduct (fetch + AbortSignal, HTTP errors)
│  └─ authApi.js         simulated login (resolves after ~500 ms)
├─ hooks/
│  ├─ useFetch.js        loading / error / data with useReducer, aborts on change or unmount
│  └─ useLocalStorage.js useState-like hook that reads and writes localStorage
├─ context/
│  └─ AuthContext.jsx    signed-in user with Context + useReducer (LOGGED_IN / LOGGED_OUT)
├─ store/
│  └─ cartStore.js       Zustand cart store, persisted with store.subscribe
├─ components/
│  ├─ Layout.jsx         NavBar + <Outlet /> + footer, applies the theme class
│  ├─ NavBar.jsx         NavLinks, cart count, theme toggle, login / logout
│  ├─ ProductCard.jsx    one product in the list
│  └─ ProtectedRoute.jsx redirects to /login when nobody is signed in
├─ pages/
│  ├─ Home.jsx
│  ├─ ProductList.jsx    search + category filter stored in the URL query string
│  ├─ ProductDetail.jsx  reads :id from the URL, handles "product not found"
│  ├─ Cart.jsx           quantity controls, total, clear cart, empty message
│  ├─ Login.jsx          controlled form, redirects back to the requested page
│  └─ NotFound.jsx       404 page inside the layout
├─ App.jsx               route configuration (nested routes under /products)
├─ main.jsx              BrowserRouter + AuthProvider
└─ index.css             layout and light / dark theme variables
```

## Reasoning questions

### 1. State choices
- **Signed-in user:** in `AuthContext` (Context + useReducer). It changes rarely but many components need it (NavBar, Login, ProtectedRoute).
- **Cart:** in a Zustand store, because it changes often and many components read it.
- **Filter values:** in the URL query string, so the filtered view can be shared as a link and stays the same after a refresh.
- **Product list:** inside `useFetch` in `ProductList`. Only that page needs it, so it is local state.
- **Theme:** in `useLocalStorage` inside `Layout`, so the choice survives a reload.

### 2. Context versus store
The cart changes often. When a Context value changes, every component that uses that Context re-renders. If the cart were in Context, adding one item would re-render all consumers. With Zustand, each component selects only the part it needs (for example the NavBar selects only the item count), so it re-renders only when that value changes. The signed-in user changes rarely, so Context is simple and enough. Putting the user in a store would work but add little; putting the cart in Context would cause many unnecessary re-renders.

### 3. Custom hooks
`useFetch` shares the logic: the loading / error / data states, the reducer and the request cancelling with AbortController. It does not share the state. Each component that calls `useFetch` gets its own separate state, so `ProductList` and `ProductDetail` do not see each other's data.

### 4. Route parameters
The `id` from `useParams` is always a string. This mattered for the "Next product" link in `ProductDetail`: I used `Number(id) + 1`, because `"3" + 1` would give `"31"` instead of `4`.

### 5. Protected routes
`ProtectedRoute` runs in the browser, so a user can change or skip the JavaScript and still see the page. It only improves the user experience. Real security needs the server to check every request, for example with a token, and to refuse data to users who are not signed in.

### 6. Deep links
On a plain static file server, reloading `/products/3` gives a 404 error, because there is no file at that path on the server. It works on the Vite development server because Vite returns `index.html` for unknown paths, and React Router then reads the URL and shows the right page.

## Self-study notes

### Updating one query-string parameter without losing the others
`setSearchParams` accepts a function. I copy the previous params with `new URLSearchParams(prev)`, change only one key (or delete it when it is empty) and return the copy, so the other parameter stays. I also pass `{ replace: true }` so typing does not add a history entry for every letter.

### Initialising store state from localStorage safely
The stored value can be missing or corrupted. I read it inside `try/catch`, parse it with `JSON.parse`, and check `Array.isArray`. If anything fails, the cart starts empty. Saving is done with `useCartStore.subscribe`, outside React.

### Light / dark theme
The theme is a class (`light` or `dark`) on the wrapper element in `Layout`. CSS custom properties (`--bg`, `--text`, `--border`) change with the class, so all elements update together.

## Challenges
Understanding the cleanup in `useFetch` took time: why the request must be cancelled with AbortController when the id changes or the page closes, and why an `AbortError` should be ignored. Deciding which state belongs in Context and which in Zustand was also difficult, until I understood the difference in re-rendering.
