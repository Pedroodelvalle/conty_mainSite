import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Debug endpoint is working correctly",
    nextVersion: process.env.NEXT_RUNTIME || "unknown",
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || "unknown",
  })
}

