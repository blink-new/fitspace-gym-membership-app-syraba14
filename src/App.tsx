import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import blink from './blink/client'
import { BottomNavigation } from './components/layout/BottomNavigation'
import { HomePage } from './pages/HomePage'
import { BookingsPage } from './pages/BookingsPage'
import { ChatPage } from './pages/ChatPage'
import { ProfilePage } from './pages/ProfilePage'
import { LoadingScreen } from './components/ui/LoadingScreen'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return (
      <div className="mobile-container flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">F</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to FitSpace</h1>
          <p className="text-muted-foreground mb-6">Your personalized fitness journey starts here</p>
          <button 
            onClick={() => blink.auth.login()}
            className="w-full bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="mobile-container">
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <BottomNavigation />
      </div>
    </Router>
  )
}

export default App