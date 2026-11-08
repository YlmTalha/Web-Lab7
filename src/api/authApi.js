// TODO: put your student email here (assignment says: student email + demo123456)
const DEMO = { username: 'YOUR_STUDENT_EMAIL', password: 'demo123456' };

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
