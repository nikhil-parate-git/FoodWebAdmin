import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import enterOtp from '../../assets/auth/VerifyOtp.svg'
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify'

const OTP_LENGTH  = 4
const RESEND_SECS = 20

const EnterOTP = () => {
  const [otp, setOtp]             = useState(Array(OTP_LENGTH).fill(''))
  const [seconds, setSeconds]     = useState(RESEND_SECS)
  const [canResend, setCanResend] = useState(false)
  const inputRefs                 = useRef([])
  const navigate                  = useNavigate()
  const location                  = useLocation()
  const email                     = location.state?.email || 'emailaddress@gmail.com'

  useEffect(() => {
    if (seconds <= 0) { setCanResend(true); return }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return
    const next = [...otp]
    next[index] = value
    setOtp(next)
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = () => {
    if (!canResend) return
    setOtp(Array(OTP_LENGTH).fill(''))
    setSeconds(RESEND_SECS)
    setCanResend(false)
    inputRefs.current[0]?.focus()
    // TODO: resend OTP API call
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < OTP_LENGTH) return
    // TODO: verify OTP API call
    navigate('/reset-password', { state: { email, otp: code } })
    toast.success('OTP verified successfully!')
  }

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">

      {/* Body */}
      <div className="flex items-center justify-center gap-12 max-w-6xl w-full mx-auto">
        <div className="flex flex-col items-center gap-6 flex-shrink-0">

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Local Trade Street" className="w-80" />
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-orange-600/20 border border-orange-600/50 p-8 w-100 py-12">
            <h1 className="text-4xl font-bold text-[#E8431A] text-center mb-3">Enter OTP</h1>
            <p className="text-sm text-gray-500 text-center leading-relaxed">
              We've sent a verification code to
            </p>
            <p className="text-sm font-semibold text-gray-700 text-center mb-8">{email}</p>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">

              {/* OTP Boxes */}
              <div className="flex gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#E8431A] focus:ring-1 focus:ring-[#E8431A]/30 transition-colors text-gray-700"
                  />
                ))}
              </div>

              {/* Resend */}
              <p className="text-xs text-gray-500 text-center">
                Didn't receive any code?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`font-semibold transition-colors ${
                    canResend
                      ? 'text-[#E8431A] hover:underline cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Resend Code
                </button>
              </p>

              {/* Timer */}
              {!canResend && (
                <p className="text-xs text-gray-500 -mt-3">
                  00:{pad(seconds)} Sec
                </p>
              )}

              {/* Back to login */}
              <p className="text-xs text-gray-400">
                Go back to{' '}
                <Link to="/login" className="text-[#E8431A] font-medium hover:underline">
                  Login
                </Link>
              </p>

              <button
                type="submit"
                className="w-full bg-[#E8431A] hover:bg-[#d03b15] active:scale-[0.98] text-white font-semibold py-3 rounded-lg transition-all text-sm"
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>

        {/* Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <img
            src={enterOtp}
            alt="Enter OTP illustration"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default EnterOTP