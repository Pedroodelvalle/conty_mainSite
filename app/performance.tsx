"use client"

import { useEffect } from "react"

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical images
    const preloadImages = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20PEQUENA%20%282%29.jpg-smCRBjqyfvFsL1e8HeKtWhLrHgHIVx.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2017.jpg-X4hrzE7hkZf1ebiHgzODDAZmDGGJNH.jpeg",
    ]

    preloadImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    // Optimize animations
    if (typeof window !== "undefined") {
      // Check if the browser supports the requestIdleCallback API
      if ("requestIdleCallback" in window) {
        // @ts-ignore - TypeScript doesn't recognize requestIdleCallback
        window.requestIdleCallback(() => {
          document.body.classList.add("animations-ready")
        })
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
          document.body.classList.add("animations-ready")
        }, 200)
      }
    }
  }, [])

  return null
}

