import { useState } from 'react'

export default function Login({ setAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function submitUser(event) {
    event.preventDefault()
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "300px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", padding: "30px" }} >
        <h1>Editor</h1>
        <br />

        <form onSubmit={submitUser}>
          <input
            value={username}
            type="text"
            placeholder="Korisničko ime"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />

          <input
            value={password}
            type="password"
            placeholder="Šifra"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <button type="submit" className='button'>Uloguj se</button>
        </form>
      </div>
    </div>
  )
}