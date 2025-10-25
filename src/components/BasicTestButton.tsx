'use client'

export function BasicTestButton() {
  const handleClick = () => {
    console.log('Basic test button clicked')
    window.location.href = '/test'
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Basic Test
    </button>
  )
}
