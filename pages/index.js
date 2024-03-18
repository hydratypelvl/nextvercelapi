import { useState } from "react";
const API_URL = "https://node-server-flax.vercel.app/api"

export default function Home() {
  const [data, setData] = useState(null);
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    const response = await fetch(`https://node-server-flax.vercel.app/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({username: 'user1', password: 'password1'})
    });
    const { token } = await response.json();
    setToken(token);
  };

  const fetchData = async () => {
    const response = await fetch(`https://node-server-flax.vercel.app/api/data`, {
      headers: {
        'Authorization': token
      }
    });
    const result = await response.json();
    setData(result);
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={fetchData}>Fetch Data</button>
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
