import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);

const initialState = { user: null }; // user: { username } or null

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return { user: action.user };
    case 'LOGGED_OUT':
      return { user: null };
    default:
      throw new Error(`Unknown auth action: ${action.type}`);
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = {
    user: state.user,
    logIn: (user) => dispatch({ type: 'LOGGED_IN', user }),
    logOut: () => dispatch({ type: 'LOGGED_OUT' }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return ctx;
}
