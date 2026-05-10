// src/pages/auth/ForgotPassword.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import forgotPasswordImg from '../../assets/auth/forgetpassword.svg'
import logo from '../../assets/logo.png'
import { forgotPassword, setEmail } from '../../redux/slices/auth/passwordSlice'

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState('')
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const { loading } = useSelector((state) => state.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(forgotPassword(emailInput))
    if (forgotPassword.fulfilled.match(result)) {
      dispatch(setEmail(emailInput))          // save email in store for next screens
      navigate('/otp', { state: { email: emailInput } })
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="flex items-center justify-center gap-12 max-w-6xl w-full mx-auto">
        <div className="flex flex-col items-center gap-6 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Local Trade Street" className="w-80" />
          </div>
          <div className="bg-white rounded-2xl shadow-lg shadow-orange-600/20 border border-orange-600/50 p-8 w-100 py-20">
            <h1 className="text-5xl font-bold text-[#E8431A] text-center mb-2 leading-tight">
              Forgot<br />Password?
            </h1>
            <p className="text-2xl text-gray-700 text-center mb-6 mt-2">
              Enter your registered email address
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600 font-medium">Enter Email Address</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-[#E8431A] focus:ring-1 focus:ring-[#E8431A]/30 transition-colors"
                />
              </div>

              <p className="text-xs text-center text-gray-400">
                Go back to{' '}
                <Link to="/login" className="text-[#E8431A] font-medium hover:underline">Login</Link>
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E8431A] hover:bg-[#d03b15] active:scale-[0.98] text-white font-semibold py-3 rounded-lg transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Get OTP'}
              </button>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center">
          <img src={forgotPasswordImg} alt="Forgot password illustration" className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword