import Link from "next/link"

export default function MinimalJsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Minimal JavaScript Page</h1>
      <p className="mb-4">This page loads minimal JavaScript to help isolate issues.</p>

      <div className="flex space-x-4 mt-8">
        <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Home
        </Link>

        <Link href="/diagnostic" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Go to Diagnostic Page
        </Link>
      </div>
    </div>
  )
}

