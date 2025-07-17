export function LoadingScreen() {
  return (
    <div className="mobile-container flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-2xl font-bold text-white">F</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded-full w-32 mx-auto animate-pulse"></div>
          <div className="h-2 bg-gray-200 rounded-full w-24 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}