import { useState, useEffect } from 'react'
import { 
  User, 
  CreditCard, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Edit,
  Crown,
  Calendar,
  Trophy,
  Target
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Switch } from '../components/ui/switch'
import blink from '../blink/client'

export function ProfilePage() {
  const [user, setUser] = useState(null)
  const [membershipData, setMembershipData] = useState({
    plan: 'Premium',
    status: 'Active',
    nextBilling: '2024-02-15',
    memberSince: '2023-06-01'
  })

  const [stats, setStats] = useState({
    totalWorkouts: 127,
    currentStreak: 12,
    favoriteClass: 'HIIT Cardio',
    hoursThisMonth: 18.5
  })

  const [notifications, setNotifications] = useState({
    classReminders: true,
    promotions: false,
    socialUpdates: true,
    weeklyReports: true
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await blink.auth.me()
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    blink.auth.logout()
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const menuItems = [
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Manage cards and billing',
      action: () => console.log('Payment methods')
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Customize your alerts',
      action: () => console.log('Notifications')
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Account security settings',
      action: () => console.log('Privacy')
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact us',
      action: () => console.log('Help')
    },
    {
      icon: Settings,
      title: 'App Settings',
      description: 'Preferences and more',
      action: () => console.log('Settings')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-bg text-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button className="p-2 bg-white/20 rounded-full">
            <Edit size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.email?.split('@')[0] || 'User'}</h2>
            <p className="text-white/80">{user?.email || 'user@example.com'}</p>
            <div className="flex items-center mt-2">
              <Crown className="w-4 h-4 mr-1" />
              <span className="text-sm">{membershipData.plan} Member</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-6">
        {/* Membership Card */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Membership</span>
              <Badge className="bg-green-100 text-green-800">
                {membershipData.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Plan</p>
                <p className="font-semibold">{membershipData.plan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Billing</p>
                <p className="font-semibold">{membershipData.nextBilling}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-semibold">{membershipData.memberSince}</p>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-xl font-medium">
              Manage Membership
            </button>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.totalWorkouts}</div>
                <div className="text-sm text-gray-600">Total Workouts</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Target className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.currentStreak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{stats.hoursThisMonth}h</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <User className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-sm font-bold text-gray-900">{stats.favoriteClass}</div>
                <div className="text-sm text-gray-600">Favorite Class</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Class Reminders</p>
                <p className="text-sm text-gray-600">Get notified before your classes</p>
              </div>
              <Switch
                checked={notifications.classReminders}
                onCheckedChange={(checked) => handleNotificationChange('classReminders', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Promotions</p>
                <p className="text-sm text-gray-600">Special offers and deals</p>
              </div>
              <Switch
                checked={notifications.promotions}
                onCheckedChange={(checked) => handleNotificationChange('promotions', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Social Updates</p>
                <p className="text-sm text-gray-600">Friend activities and challenges</p>
              </div>
              <Switch
                checked={notifications.socialUpdates}
                onCheckedChange={(checked) => handleNotificationChange('socialUpdates', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-gray-600">Your fitness progress summary</p>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full bg-white border border-gray-200 p-4 rounded-xl text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-white border border-red-200 p-4 rounded-xl text-left hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-red-600">Sign Out</div>
              <div className="text-sm text-red-500">Sign out of your account</div>
            </div>
          </div>
        </button>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">FitSpace v1.0.0</p>
        </div>
      </div>
    </div>
  )
}