import { NextResponse } from "next/server"

// Store entries in memory (will reset on server restart)
const memoryStore: Array<{
  name: string
  email: string
  phone: string
  timestamp: string
}> = []

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { name, email, phone } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create an entry object
    const entry = {
      name,
      email,
      phone,
      timestamp: new Date().toISOString(),
    }

    // Log to console for server-side visibility
    console.log("📝 NEW SIGNUP:", JSON.stringify(entry, null, 2))

    // Store in memory
    memoryStore.push(entry)
    console.log(`📊 Total signups in memory: ${memoryStore.length}`)

    // Return success
    return NextResponse.json({
      success: true,
      entry,
    })
  } catch (error) {
    console.error("❌ API route exception:", error)

    // Return success anyway for user experience
    return NextResponse.json({
      success: true,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// GET endpoint to retrieve all entries (for admin purposes)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")
  const format = searchParams.get("format")

  // Very basic protection
  if (key !== "conty-admin-key") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Return as CSV if requested
  if (format === "csv") {
    const headers = ["name", "email", "phone", "timestamp"]
    const csvRows = [
      headers.join(","),
      ...memoryStore.map((entry) => headers.map((header) => `"${entry[header as keyof typeof entry]}"`).join(",")),
    ]
    const csv = csvRows.join("\n")

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=conty-signups.csv",
      },
    })
  }

  // Return as JSON by default
  return NextResponse.json({
    entries: memoryStore,
    count: memoryStore.length,
    message: "These entries are stored in memory and will be reset if the server restarts.",
    note: "Add ?format=csv to download as CSV file.",
  })
}

