import { Bell, ChevronDown } from 'lucide-react'

// ─── Navbar Config ─────────────────────────────────────────────────────────────
const NAVBAR_CONFIG = {
  welcomeText: 'Welcome',
  roleText: 'Admin',
  user: {
    name: 'Lucas',
    email: 'Lucas@gmail.com',
    avatarSrc: null, // replace with image URL if available
  },
}

// ─── Sub-components ────────────────────────────────────────────────────────────
const NotificationBell = () => (
  <div className="relative cursor-pointer">
    <Bell className="text-orange-200 w-8 h-8" strokeWidth={1.8} />
    <span className="absolute -top-[.01vh] right-1 w-2.5 h-2.5 bg-white rounded-full" />
  </div>
)

const UserAvatar = ({ name, avatarSrc }) => (
  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/40 bg-gray-300 flex-shrink-0">
    {avatarSrc ? (
      <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">
        {name?.charAt(0).toUpperCase()}
      </div>
    )}
  </div>
)

const UserInfo = ({ name, email }) => (
  <div className="flex items-center gap-1 cursor-pointer group">
    <div className="flex flex-col leading-tight">
      <span className="text-white text-sm font-semibold">{name}</span>
      <span className="text-white/80 text-xs">{email}</span>
    </div>
    <ChevronDown
      className="text-white w-4 h-4 group-hover:rotate-180 transition-transform duration-200"
      strokeWidth={2}
    />
  </div>
)

// ─── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { welcomeText, roleText, user } = NAVBAR_CONFIG

  return (
    <header className="w-full bg-[#E8431A] px-5 py-3 flex items-center justify-between shadow-md">
      {/* Left */}
      <div className="flex flex-col leading-tight">
        <span className="text-white text-xs font-normal opacity-90">{welcomeText}</span>
        <span className="text-white text-base font-bold tracking-wide">{roleText}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <NotificationBell />
        <UserAvatar name={user.name} avatarSrc={user.avatarSrc} />
        <UserInfo name={user.name} email={user.email} />
      </div>
    </header>
  )
}

export default Navbar