import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, User, MoreVertical } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { format, addDays, isSameDay } from 'date-fns'

interface Booking {
  id: string
  className: string
  instructor: string
  date: Date
  time: string
  duration: string
  location: string
  status: 'confirmed' | 'pending' | 'cancelled'
  image: string
}

export function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    loadMockBookings()
  }, [])

  const loadMockBookings = () => {
    const today = new Date()
    setBookings([
      {
        id: '1',
        className: 'HIIT Cardio Blast',
        instructor: 'Sarah Johnson',
        date: today,
        time: '6:00 PM',
        duration: '45 min',
        location: 'Studio A',
        status: 'confirmed',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      },
      {
        id: '2',
        className: 'Yoga Flow',
        instructor: 'Emma Chen',
        date: addDays(today, 1),
        time: '7:30 AM',
        duration: '60 min',
        location: 'Studio B',
        status: 'confirmed',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
      },
      {
        id: '3',
        className: 'Strength Training',
        instructor: 'Mike Rodriguez',
        date: addDays(today, 2),
        time: '5:30 PM',
        duration: '50 min',
        location: 'Gym Floor',
        status: 'pending',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop'
      },
      {
        id: '4',
        className: 'Pilates Core',
        instructor: 'Lisa Park',
        date: addDays(today, 3),
        time: '12:00 PM',
        duration: '45 min',
        location: 'Studio C',
        status: 'confirmed',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
      }
    ])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getNextWeekDates = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i))
    }
    return dates
  }

  const filteredBookings = bookings.filter(booking => 
    isSameDay(booking.date, selectedDate)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage your upcoming classes and sessions</p>
      </div>

      {/* Date Selector */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex space-x-2 overflow-x-auto">
          {getNextWeekDates().map((date, index) => {
            const isSelected = isSameDay(date, selectedDate)
            const isToday = isSameDay(date, new Date())
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl min-w-[60px] transition-colors ${
                  isSelected 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-xs font-medium mb-1">
                  {format(date, 'EEE')}
                </span>
                <span className="text-lg font-bold">
                  {format(date, 'd')}
                </span>
                {isToday && !isSelected && (
                  <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-6">
        {/* Selected Date Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h2>
          <p className="text-sm text-gray-600">
            {filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'}
          </p>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings today</h3>
            <p className="text-gray-600 mb-6">You don't have any classes scheduled for this day</p>
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium">
              Browse Classes
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="bg-white shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <img 
                      src={booking.image} 
                      alt={booking.className}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.className}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <User size={14} className="mr-1" />
                            {booking.instructor}
                          </div>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-2" />
                          {booking.time} • {booking.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={14} className="mr-2" />
                          {booking.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                        <div className="flex space-x-2">
                          <button className="text-gray-600 text-sm font-medium hover:text-gray-800">
                            Reschedule
                          </button>
                          <button className="text-red-600 text-sm font-medium hover:text-red-800">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="bg-white border border-gray-200 p-4 rounded-xl text-left hover:bg-gray-50 transition-colors">
            <Calendar className="w-6 h-6 text-primary mb-2" />
            <div className="font-medium text-gray-900">Book a Class</div>
            <div className="text-sm text-gray-600">Find and book new classes</div>
          </button>
          <button className="bg-white border border-gray-200 p-4 rounded-xl text-left hover:bg-gray-50 transition-colors">
            <Clock className="w-6 h-6 text-accent mb-2" />
            <div className="font-medium text-gray-900">Class History</div>
            <div className="text-sm text-gray-600">View past sessions</div>
          </button>
        </div>
      </div>
    </div>
  )
}