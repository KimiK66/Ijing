'use client'

export function TestButton() {
  const handleClick = () => {
    console.log('Test button clicked')
    window.location.href = '/test'
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      Test Button
    </button>
  )
}
