import { useState, useEffect } from 'react'
import { Search, Bell, MapPin, Star, Clock, Users } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import blink from '../blink/client'

interface Class {
  id: string
  name: string
  instructor: string
  time: string
  duration: string
  difficulty: string
  spots: number
  rating: number
  image: string
  category: string
}

interface Facility {
  id: string
  name: string
  description: string
  availability: string
  image: string
  rating: number
  features: string[]
}

export function HomePage() {
  const [user, setUser] = useState(null)
  const [classes, setClasses] = useState<Class[]>([])
  const [facilities, setFacilities] = useState<Facility[]>([])

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
    loadMockData()
  }, [])

  const loadMockData = () => {
    // Mock classes data
    setClasses([
      {
        id: '1',
        name: 'HIIT Cardio Blast',
        instructor: 'Sarah Johnson',
        time: '6:00 PM',
        duration: '45 min',
        difficulty: 'Intermediate',
        spots: 8,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        category: 'Cardio'
      },
      {
        id: '2',
        name: 'Yoga Flow',
        instructor: 'Emma Chen',
        time: '7:30 AM',
        duration: '60 min',
        difficulty: 'Beginner',
        spots: 12,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
        category: 'Yoga'
      },
      {
        id: '3',
        name: 'Strength Training',
        instructor: 'Mike Rodriguez',
        time: '5:30 PM',
        duration: '50 min',
        difficulty: 'Advanced',
        spots: 6,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
        category: 'Strength'
      }
    ])

    // Mock facilities data
    setFacilities([
      {
        id: '1',
        name: 'Olympic Pool',
        description: '25m heated pool with lane swimming',
        availability: 'Available now',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop',
        rating: 4.8,
        features: ['Heated', 'Lane Swimming', 'Shallow End']
      },
      {
        id: '2',
        name: 'Free Weights Area',
        description: 'Complete range of dumbbells and barbells',
        availability: 'Moderate traffic',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
        rating: 4.6,
        features: ['Dumbbells', 'Barbells', 'Benches']
      },
      {
        id: '3',
        name: 'Cardio Zone',
        description: 'Treadmills, bikes, and ellipticals',
        availability: 'High traffic',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
        rating: 4.5,
        features: ['Treadmills', 'Bikes', 'Ellipticals']
      }
    ])
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes('Available')) return 'text-green-600'
    if (availability.includes('Moderate')) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-bg text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Good evening!</h1>
            <p className="text-white/80">Ready for your workout?</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-white/20 rounded-full">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="font-semibold">{user?.email?.[0]?.toUpperCase() || 'U'}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search classes, trainers, facilities..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-gray-600">Classes this month</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">8.5</div>
              <div className="text-sm text-gray-600">Hours trained</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">450</div>
              <div className="text-sm text-gray-600">Calories burned</div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Classes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recommended for You</h2>
            <button className="text-primary font-medium">See all</button>
          </div>
          
          <div className="space-y-4">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="bg-white shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <img 
                      src={classItem.image} 
                      alt={classItem.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{classItem.name}</h3>
                          <p className="text-sm text-gray-600">{classItem.instructor}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{classItem.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {classItem.time}
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {classItem.spots} spots
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getDifficultyColor(classItem.difficulty)}>
                          {classItem.difficulty}
                        </Badge>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Facilities</h2>
            <button className="text-primary font-medium">View all</button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {facilities.map((facility) => (
              <Card key={facility.id} className="bg-white shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <img 
                      src={facility.image} 
                      alt={facility.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{facility.name}</h3>
                          <p className="text-sm text-gray-600">{facility.description}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{facility.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <MapPin size={14} className="mr-1" />
                        <span className={`text-sm font-medium ${getAvailabilityColor(facility.availability)}`}>
                          {facility.availability}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {facility.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}