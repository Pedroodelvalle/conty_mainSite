"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Entry {
  name: string
  email: string
  phone: string
  timestamp: string
}

export default function AdminPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [key, setKey] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const fetchEntries = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/signup?key=${key}`)

      if (!response.ok) {
        throw new Error("Failed to fetch entries")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setEntries(data.entries || [])
      setIsAuthenticated(true)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchEntries()
  }

  const downloadCsv = () => {
    window.location.href = `/api/signup?key=${key}&format=csv`
  }

  // Also check localStorage for entries
  useEffect(() => {
    try {
      const localEntries = JSON.parse(localStorage.getItem("waitlist_entries") || "[]")
      if (localEntries.length > 0) {
        console.log("Found local entries:", localEntries)
      }
    } catch (err) {
      console.error("Error reading local entries:", err)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Conty Admin</h1>

      {!isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Key
              </label>
              <input
                id="key"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter admin key"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Access Admin"}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Waitlist Entries ({entries.length})</h2>
            <button onClick={downloadCsv} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Download CSV
            </button>
          </div>

          {entries.length === 0 ? (
            <p className="text-gray-500">No entries found. Check server logs for more information.</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {entries.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
            <h3 className="font-medium text-yellow-800 mb-2">Important Note</h3>
            <p className="text-yellow-700 text-sm">
              Entries are stored in server memory and will be reset if the server restarts. Download the CSV regularly
              to keep a backup of your data.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

