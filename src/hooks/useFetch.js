import { useEffect, useReducer } from 'react';

const initialState = { loading: true, error: null, data: null };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { loading: true, error: null, data: null };
    case 'FETCH_SUCCESS':
      return { loading: false, error: null, data: action.payload };
    case 'FETCH_ERROR':
      return { loading: false, error: action.error, data: null };
    default:
      return state;
  }
}

// fetchFn receives an AbortSignal and returns a Promise.
// deps: the inputs the request depends on (for example [id]).
export function useFetch(fetchFn, deps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'FETCH_START' });

    fetchFn(controller.signal)
      .then((data) => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch((error) => {
        if (error.name === 'AbortError') return; // request was cancelled, ignore
        dispatch({ type: 'FETCH_ERROR', error });
      });

    // cleanup: runs when deps change or the component unmounts
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state; // { loading, error, data }
}
