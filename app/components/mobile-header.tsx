"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface MobileHeaderProps {
  onOpenSignupForm: () => void
}

export default function MobileHeader({ onOpenSignupForm }: MobileHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Throttle scroll event for better performance
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const viewportHeight = window.innerHeight
          const scrollThreshold = viewportHeight * 0.8

          if (window.scrollY > scrollThreshold) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md md:hidden will-change-transform"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Image
                src="/conty-logo.svg"
                alt="Conty Logo"
                width={120}
                height={60}
                className="h-[50px] w-auto object-contain"
                priority
              />
            </div>
            <button
              onClick={onOpenSignupForm}
              className="duolingo-button bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-2 px-4 text-sm uppercase tracking-wide"
            >
              ENTRAR NA LISTA
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

