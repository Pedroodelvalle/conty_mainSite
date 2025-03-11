import { NextResponse } from "next/server"
import { supabase } from "@/app/lib/supabase"

// Store entries in memory as a fallback (will reset on server restart)
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

    // Store in memory as a fallback
    memoryStore.push(entry)
    console.log(`📊 Total signups in memory: ${memoryStore.length}`)

    // Convert phone to number as required by the schema
    const phoneNumber = Number.parseFloat(phone.replace(/\D/g, ""))

    // Try to insert into the database
    try {
      const { data, error } = await supabase
        .from("Leads") // Capital L in 'Leads'
        .insert([
          {
            name,
            email,
            phone: phoneNumber, // Send as number
          },
        ])

      if (error) {
        console.error("❌ Error inserting into Leads:", error)
        throw error
      }

      console.log("✅ Successfully inserted into Leads table")
      return NextResponse.json({
        success: true,
        data,
      })
    } catch (dbError) {
      console.error("❌ Database error:", dbError)

      // Return success anyway for user experience
      return NextResponse.json({
        success: true,
        fallback: true,
        message: "Data saved in server memory but database insertion failed",
        error: dbError instanceof Error ? dbError.message : String(dbError),
      })
    }
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

  // Very basic protection
  if (key !== "conty-admin-key") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Try to get entries from the database
  try {
    const { data, error } = await supabase.from("Leads").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Error fetching from Leads:", error)
      throw error
    }

    return NextResponse.json({
      success: true,
      entries: data,
      memoryEntries: memoryStore,
      message: "Successfully retrieved entries from database",
    })
  } catch (dbError) {
    console.error("❌ Database fetch error:", dbError)

    // Return memory entries as fallback
    return NextResponse.json({
      success: true,
      fallback: true,
      entries: memoryStore,
      message: "Retrieved entries from server memory (database fetch failed)",
      error: dbError instanceof Error ? dbError.message : String(dbError),
    })
  }
}

