import type React from "react"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.css"
import "./desktop-sections.css" // Import desktop-specific styles
import PerformanceOptimizer from "./performance"

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand", // Add variable for better font performance
})

export const metadata: Metadata = {
  title: "Conty - O App de Criação de Conteúdo Gamificado",
  description: "Crie conteúdo incrível para redes sociais de forma fácil, divertida e gamificada",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`scroll-smooth ${quicksand.variable}`}>
      <body className="antialiased">
        <PerformanceOptimizer />
        {children}
      </body>
    </html>
  )
}



import './globals.css'