export default function TestPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Test Page Works!</h1>
        <p className="text-gray-700 mb-4">If you can see this, the routing is working.</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
