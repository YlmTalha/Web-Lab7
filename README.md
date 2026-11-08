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
_TODO_

### 2. Context versus store
_TODO_

### 3. Custom hooks
_TODO_

### 4. Route parameters
_TODO_

### 5. Protected routes
_TODO_

### 6. Deep links
_TODO_

## Self-study notes

### Updating one query-string parameter without losing the others
_TODO_

### Initialising store state from localStorage safely
_TODO_

### Light / dark theme
_TODO_

## Challenges
_TODO_
