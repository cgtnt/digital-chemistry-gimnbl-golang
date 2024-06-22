
import { useState } from 'react'

export default function Login({setAuth}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function submitUser(event) {
    event.preventDefault()
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt-token', data.token)
          setUsername('')
          setPassword('')
          setAuth(true)
        } else {
          alert("Failed to log in")
        }
      })
  }
  return (
    <>
      <main style={{ padding: '50px' }}>
        <h1>Login </h1>
        <br />

        <form onSubmit={submitUser}>
          <input
            value={username}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />

          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <button type="submit">Login</button>
        </form>
      </main>
    </>
  )
}