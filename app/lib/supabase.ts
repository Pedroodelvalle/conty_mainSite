import { createClient } from "@supabase/supabase-js"

// Use the credentials you provided
const supabaseUrl = "https://brnwkkmdghyqezcwbyxz.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJybndra21kZ2h5cWV6Y3dieXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MzQ1ODksImV4cCI6MjA1NzIxMDU4OX0.IBIkhhUykh59Lm135oGwxHxFEjzbamyb8JortMeYUBM"

// Create a single Supabase client for the browser
export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to create a waitlist entry
export async function createWaitlistEntry(data: { name: string; email: string; phone: string }) {
  try {
    console.log("Attempting to save user data:", data)

    // Convert phone to number as required by the schema
    const phoneNumber = Number.parseFloat(data.phone.replace(/\D/g, ""))

    // Insert into the Leads table (note the capital L)
    const { data: insertedData, error } = await supabase
      .from("Leads") // Capital L in 'Leads'
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: phoneNumber, // Send as number
        },
      ])

    if (error) {
      console.error("Error inserting into Leads:", error)
      throw error
    }

    console.log("Successfully inserted into Leads table")
    return { success: true, data: insertedData }
  } catch (error) {
    console.error("Supabase operation failed:", error)

    // Save to localStorage as a fallback
    try {
      const existingData = JSON.parse(localStorage.getItem("waitlist_entries") || "[]")
      existingData.push({
        name: data.name,
        email: data.email,
        phone: data.phone,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem("waitlist_entries", JSON.stringify(existingData))
      console.log("Saved to localStorage as fallback")
    } catch (localStorageError) {
      console.error("LocalStorage fallback failed:", localStorageError)
    }

    // Return error for proper handling
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

