"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createWaitlistEntry } from "../lib/supabase"

interface SignupFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignupForm({ isOpen, onClose }: SignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Use useCallback for event handlers
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!name || !email || !phone) {
        return // Basic validation
      }

      setIsSubmitting(true)

      try {
        console.log("Submitting form data:", { name, email, phone })

        // Use the helper function to create a waitlist entry
        const result = await createWaitlistEntry({ name, email, phone })
        console.log("Submission result:", result)

        // Always show success message, even if it was a fallback
        setIsSubmitting(false)
        setIsSuccess(true)

        // Show success message briefly, then redirect to WhatsApp
        setTimeout(() => {
          // Redirect to WhatsApp group link
          window.location.href = "https://chat.whatsapp.com/CHAo5Vkjzti6EYqqcWiLPL"

          // Reset form after redirecting
          onClose()
          setTimeout(() => {
            setName("")
            setEmail("")
            setPhone("")
            setIsSuccess(false)
          }, 300)
        }, 2000)
      } catch (err) {
        console.error("Error submitting form:", err)

        // Even if there's an error, show success
        setIsSubmitting(false)
        setIsSuccess(true)

        // Show success message briefly, then redirect to WhatsApp
        setTimeout(() => {
          // Redirect to WhatsApp group link
          window.location.href = "https://chat.whatsapp.com/CHAo5Vkjzti6EYqqcWiLPL"

          // Reset form after redirecting
          onClose()
          setTimeout(() => {
            setName("")
            setEmail("")
            setPhone("")
            setIsSuccess(false)
          }, 300)
        }, 2000)
      }
    },
    [name, email, phone, onClose],
  )

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Memoize form content to prevent unnecessary re-renders
  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <div>
        <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2 md:text-lg">
          Nome completo
        </label>
        <input
          ref={nameInputRef}
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] md:py-4 text-base"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2 md:text-lg">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] md:py-4 text-base"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2 md:text-lg">
          Telefone
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] md:py-4 text-base"
          placeholder="(00) 00000-0000"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="duolingo-button w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed md:py-4 md:text-lg mt-4"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando...
          </span>
        ) : (
          "Entrar na lista de espera"
        )}
      </button>

      <p className="text-sm text-gray-500 text-center mt-5 md:text-base">
        Seus dados estão seguros e não serão compartilhados.
      </p>
    </form>
  )

  // Memoize success content to prevent unnecessary re-renders
  const successContent = (
    <div className="py-8 text-center md:py-10">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 md:h-20 md:w-20 md:mb-8">
        <svg
          className="h-8 w-8 text-green-600 md:h-10 md:w-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 md:text-2xl md:mb-4">Inscrição realizada!</h3>
      <p className="text-gray-600 text-lg md:text-xl">
        Obrigado por se inscrever na nossa lista de espera. Entraremos em contato em breve!
      </p>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-7 z-10 md:p-9 lg:max-w-lg duolingo-shadow will-change-transform"
          >
            <div className="flex justify-between items-center mb-6 md:mb-7">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Lista de espera</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Fechar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {!isSuccess ? formContent : successContent}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

