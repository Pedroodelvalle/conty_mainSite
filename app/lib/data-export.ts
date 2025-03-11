// Simple utility to export data from localStorage

export function exportLocalEntries() {
  try {
    const entries = JSON.parse(localStorage.getItem("waitlist_entries") || "[]")

    if (entries.length === 0) {
      console.log("No entries found in localStorage")
      return null
    }

    // Create CSV content
    const headers = ["name", "email", "phone", "timestamp"]
    const csvRows = [
      headers.join(","),
      ...entries.map((entry: any) => headers.map((header) => `"${entry[header] || ""}"`).join(",")),
    ]
    const csv = csvRows.join("\n")

    // Create download link
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", "conty-signups.csv")
    a.click()

    return entries.length
  } catch (err) {
    console.error("Error exporting entries:", err)
    return null
  }
}

