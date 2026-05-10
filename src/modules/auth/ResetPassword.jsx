// src/pages/auth/ResetPassword.jsx
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import resetPasswordImg from '../../assets/auth/Resetpassword.svg'
import logo from '../../assets/logo.png'
import { resetPassword } from '../../redux/slices/auth/passwordSlice'

const ResetPassword = () => {
  const [newPass, setNewPass]         = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [showNew, setShowNew]         = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError]             = useState('')
  const navigate  = useNavigate()
  const dispatch  = useDispatch()
  const { loading } = useSelector((state) => state.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (newPass !== confirmPass) { setError('Passwords do not match.'); return }
    if (newPass.length < 8)     { setError('Minimum 8 characters required.'); return }

    const result = await dispatch(resetPassword({
      newPassword:     newPass,
      confirmPassword: confirmPass,
    }))

    if (resetPassword.fulfilled.match(result)) {
      navigate('/password-reset-success')
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="flex items-center justify-center gap-12 max-w-6xl w-full mx-auto">
        <div className="flex flex-col items-center gap-6 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Local Trade Street" className="w-80" />
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-orange-600/20 border border-orange-600/50 p-8 w-100 py-12">
            <h1 className="text-4xl font-bold text-[#E8431A] text-center mb-2">Reset Password</h1>
            <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
              Set a new password to access your account
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600 font-medium">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    placeholder="New Password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:border-[#E8431A] focus:ring-1 focus:ring-[#E8431A]/30 transition-colors"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600 font-medium">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:border-[#E8431A] focus:ring-1 focus:ring-[#E8431A]/30 transition-colors"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-red-500 text-center -mt-1">{error}</p>}

              <p className="text-xs text-center text-gray-400">
                Go back to{' '}
                <Link to="/login" className="text-[#E8431A] font-medium hover:underline">Login</Link>
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E8431A] hover:bg-[#d03b15] active:scale-[0.98] text-white font-semibold py-3 rounded-lg transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center">
          <img src={resetPasswordImg} alt="Reset password illustration" className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword