"use client"

import { useState, useEffect } from "react"

export default function DebugPage() {
  const [scripts, setScripts] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Get all script tags on the page
      const scriptElements = document.querySelectorAll("script")
      const scriptSrcs = Array.from(scriptElements)
        .map((script) => script.src)
        .filter((src) => src) // Filter out inline scripts

      setScripts(scriptSrcs)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Debug Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Browser Information</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>
            <strong>User Agent:</strong> {typeof window !== "undefined" ? window.navigator.userAgent : "Not available"}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Script Tags</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : scripts.length > 0 ? (
          <ul className="bg-gray-100 p-4 rounded-lg space-y-2">
            {scripts.map((src, index) => (
              <li key={index} className="break-all">
                <a href={src} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {src}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No external scripts found.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Manual Tests</h2>
        <p className="mb-4">Click the buttons below to test basic JavaScript functionality:</p>

        <div className="space-y-4">
          <button
            onClick={() => alert("Basic JavaScript is working!")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test Alert
          </button>

          <button
            onClick={() => {
              try {
                const testObj = JSON.parse('{"test": "value"}')
                alert(`JSON Parse successful: ${testObj.test}`)
              } catch (err) {
                alert(`JSON Parse error: ${err instanceof Error ? err.message : String(err)}`)
              }
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
          >
            Test JSON Parse
          </button>
        </div>
      </div>
    </div>
  )
}

