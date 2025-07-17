import { useState, useEffect, useRef } from 'react'
import { Send, Mic, Image, Dumbbell, Heart, Apple, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import blink from '../blink/client'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  mediaType?: 'text' | 'image' | 'video'
  mediaUrl?: string
}

const quickActions = [
  {
    id: 'training-plan',
    title: 'Create Training Plan',
    description: 'Get a personalized workout routine',
    icon: Dumbbell,
    color: 'bg-primary'
  },
  {
    id: 'nutrition',
    title: 'Nutrition Advice',
    description: 'Speak to our AI nutritionist',
    icon: Apple,
    color: 'bg-green-500'
  },
  {
    id: 'support',
    title: 'Customer Support',
    description: 'Get help with your membership',
    icon: Heart,
    color: 'bg-blue-500'
  }
]

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
    loadWelcomeMessage()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: "Hi there! I'm your FitSpace AI assistant. I can help you create personalized training plans, provide nutrition advice, and answer any questions about your fitness journey. How can I help you today?",
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }

  const handleQuickAction = async (actionId: string) => {
    let prompt = ''
    switch (actionId) {
      case 'training-plan':
        prompt = 'I want to create a personalized training plan. Can you help me design a workout routine based on my fitness goals?'
        break
      case 'nutrition':
        prompt = 'I need nutrition advice. Can you help me with meal planning and dietary recommendations?'
        break
      case 'support':
        prompt = 'I need help with my gym membership and have some questions about the facilities.'
        break
    }
    
    if (prompt) {
      await sendMessage(prompt)
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      // Use Blink AI to generate response
      const response = await blink.ai.generateText({
        prompt: `You are a helpful fitness AI assistant for FitSpace gym. The user said: "${content}". 
        
        Provide helpful, encouraging, and specific fitness advice. If they're asking about:
        - Training plans: Create specific workout routines with exercises, sets, reps
        - Nutrition: Give practical meal suggestions and dietary advice
        - Support: Help with gym-related questions
        
        Keep responses conversational and motivating. User's name: ${user?.email || 'there'}`,
        maxTokens: 300
      })

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.text,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputText)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FitSpace AI</h1>
            <p className="text-sm text-gray-600">Your personal fitness assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 1 && (
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="bg-white border border-gray-200 p-4 rounded-xl text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center mr-3`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{action.title}</div>
                      <div className="text-sm text-gray-600">{action.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {message.type === 'ai' && (
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                    <MessageCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs text-gray-500">FitSpace AI</span>
                </div>
              )}
              
              <Card className={`${
                message.type === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-white border border-gray-200'
              }`}>
                <CardContent className="p-3">
                  <p className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-900'}`}>
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                  <MessageCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-gray-500">FitSpace AI is typing...</span>
              </div>
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Image size={20} />
          </button>
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Mic size={20} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything about fitness..."
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}