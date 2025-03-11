"use client"

import { useEffect } from "react"

export default function DesktopScrollHandler() {
  useEffect(() => {
    // Only run on desktop
    if (typeof window === "undefined" || window.innerWidth < 1024) {
      return
    }

    const sections = document.querySelectorAll("section")

    // Add classes to sections for better styling
    sections.forEach((section) => {
      section.classList.add("section-transition")
    })

    // Smooth scroll handling
    let isScrolling = false
    let currentSectionIndex = 0

    const handleScroll = () => {
      if (isScrolling) return

      isScrolling = true

      // Determine which section is most visible
      const viewportHeight = window.innerHeight
      const scrollTop = window.scrollY

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

      // Adjust for header height in calculations
      const headerHeight = 120 // Match the header height we set

      currentSectionIndex = maxVisibleSection

      // Reset scrolling flag after a delay
      setTimeout(() => {
        isScrolling = false
      }, 100)
    }

    // Add scroll event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}

