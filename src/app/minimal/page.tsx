export default function MinimalHomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Minimal Test Page</h1>
        <p className="text-gray-600 mb-4">This page has no providers or complex components.</p>
        <button
          onClick={() => window.location.href = '/test'}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Test Page
        </button>
      </div>
    </div>
  )
}
