import React, { useState } from 'react'
import './RegisterPage.css'
import api from '../../api'
import Error from '../ui/Error'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const newUser = {
      username,
      email,
      password,
      first_name,
      last_name,
      phone,
      city,
      state,
    }

    api.post("register/", newUser)
      .then(res => {
        console.log(res.data)
        // Clear form
        setUsername("")
        setEmail("")
        setPassword("")
        setFirstName("")
        setLastName("")
        setPhone("")
        setCity("")
        setState("")
        setError("")
        setLoading(false)
        navigate("/login")
      })
      .catch(err => {
        console.log(err)
        setError(err.response?.data?.message || "Registration failed")
        setLoading(false)
      })
  }

  return (
    <div className='login-container my-5'>
      <div className='login-card shadow'>
        {error && <Error error={error} />}
        <h2 className='login-title'>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>First Name</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className='form-control'
              placeholder='Enter your first name'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Last Name</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className='form-control'
              placeholder='Enter your last name'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='form-control'
              placeholder='Enter your username'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='form-control'
              placeholder='Enter your password'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='form-control'
              placeholder='Enter your phone number'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='form-control'
              placeholder='Enter your city'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className='form-control'
              placeholder='Enter your state'
              required
            />
          </div>

          <button type='submit' className='btn btn-primary w-100' disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className='login-footer'>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
