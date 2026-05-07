import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import resetSuccess from '../../assets/auth/passwordresetsuccess.svg'
import logo from '../../assets/logo.png'

const PasswordResetSuccess = () => {
  const navigate = useNavigate()

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
          <div className="bg-white rounded-2xl shadow-lg shadow-orange-600/20 border border-orange-600/50 p-8 w-100 py-14 flex flex-col items-center gap-6">

            {/* Check Badge */}
            <div className="w-20 h-20 rounded-full bg-[#E8431A] flex items-center justify-center shadow-lg shadow-[#E8431A]/30">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>

            {/* Text */}
            <p className="text-2xl font-bold text-gray-800 text-center leading-snug">
              Password Reset<br />Successful!
            </p>

            {/* Button */}
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#E8431A] hover:bg-[#d03b15] active:scale-[0.98] text-white font-semibold py-3 rounded-lg transition-all text-sm"
            >
              Login Now
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <img
            src={resetSuccess}
            alt="Password reset success illustration"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default PasswordResetSuccess