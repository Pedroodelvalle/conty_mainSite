"use client"

import { useState, useEffect } from "react"

export default function SectionIndicators() {
  const [activeSection, setActiveSection] = useState(0)
  const [totalSections, setTotalSections] = useState(0)

  useEffect(() => {
    // Only run on desktop
    if (typeof window === "undefined" || window.innerWidth < 1024) {
      return
    }

    const sections = document.querySelectorAll("section")
    setTotalSections(sections.length)

    const handleScroll = () => {
      // Determine which section is most visible
      const viewportHeight = window.innerHeight
      let maxVisibleSection = 0
      let maxVisibleAmount = 0

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        const visibleAmount = visibleHeight / rect.height

        if (visibleAmount > maxVisibleAmount) {
          maxVisibleAmount = visibleAmount
          maxVisibleSection = index
        }
      })

      // Account for header height in calculations
      const headerHeight = 120 // Match the header height we set

      setActiveSection(maxVisibleSection)
    }

    // Initial check
    handleScroll()

    // Add scroll event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null
  }

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === activeSection ? "bg-[#3B82F6] w-4 h-4" : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => {
            const sections = document.querySelectorAll("section")
            sections[index].scrollIntoView({ behavior: "smooth" })
          }}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  )
}

