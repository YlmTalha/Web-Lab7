const DEMO = { username: '230408032@st.biruni.edu.tr', password: 'demo123456' };

// Simulated server call: resolves after ~500 ms.
export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === DEMO.username && password === DEMO.password) {
        resolve({ username });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}
