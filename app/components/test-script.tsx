"use client"

import { useState } from "react"

export default function TestScript() {
  const [clicked, setClicked] = useState(false)

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-8">
      <h3 className="font-semibold mb-2">Client-Side JavaScript Test</h3>
      <button onClick={() => setClicked(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {clicked ? "JavaScript Works! ✅" : "Click to Test JavaScript"}
      </button>
    </div>
  )
}

