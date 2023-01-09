import React, { useState } from 'react';

import { ReactComponent as ReactLogo } from '@/assets/react.svg';
import Button from '@/components/Button';

function App() {
  const [count, setCount] = useState(0);
  const [user] = useState<IUser | null>(null);

  return (
    <div className="App">
      <Button>Click Me</Button>
      <ReactLogo />
      {user
        ? JSON.stringify(user)
        : 'No user yet'}
      <div>
        <a href="https://vitejs.dev"
          rel="noreferrer"
          target="_blank">
          <img alt="Vite logo"
            className="logo"
            src="/vite.svg" />
        </a>
        <a href="https://reactjs.org"
          rel="noreferrer"
          target="_blank"></a>
      </div >
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div >
  );
}

export default App;
