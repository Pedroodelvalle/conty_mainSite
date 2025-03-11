// Backup submission method that uses the API route

export async function backupSubmitForm(data: { name: string; email: string; phone: string }) {
  try {
    // First, save to localStorage
    try {
      const existingData = JSON.parse(localStorage.getItem("waitlist_entries") || "[]")
      existingData.push({
        ...data,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem("waitlist_entries", JSON.stringify(existingData))
      console.log("✅ Saved to localStorage as backup")
    } catch (err) {
      console.error("❌ LocalStorage backup failed:", err)
    }

    // Then try the API route
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API response error: ${response.status}`)
    }

    const result = await response.json()
    console.log("API response:", result)

    return { success: true, data: result }
  } catch (error) {
    console.error("Backup submission failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

