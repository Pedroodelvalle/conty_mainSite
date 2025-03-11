import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Try to import the package to verify it's installed correctly
    const speedInsights = await import("@vercel/speed-insights/next")

    return NextResponse.json({
      success: true,
      message: "Speed Insights package is installed correctly",
      packageInfo: {
        name: "@vercel/speed-insights",
        imported: !!speedInsights,
        hasSpeedInsights: !!speedInsights.SpeedInsights,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error importing Speed Insights package",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

