import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Calendar, MessageCircle, User } from 'lucide-react'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/bookings', icon: Calendar, label: 'Bookings' },
  { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
  { path: '/profile', icon: User, label: 'Profile' }
]

export function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}