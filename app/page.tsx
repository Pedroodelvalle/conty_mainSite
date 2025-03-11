"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useCallback } from "react"
import SignupForm from "./components/signup-form"
import MobileHeader from "./components/mobile-header"
import DesktopScrollHandler from "./components/desktop-scroll-handler"
import SectionIndicators from "./components/section-indicators"

export default function LandingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Use useCallback for event handlers
  const openForm = useCallback(() => setIsFormOpen(true), [])
  const closeForm = useCallback(() => setIsFormOpen(false), [])

  // Enhanced animation variants for smoother transitions
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.15,
      },
    },
  }

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        scale: { duration: 0.8, ease: [0.16, 1.11, 0.3, 1.11] },
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen bg-white mx-auto overflow-hidden max-w-md md:max-w-4xl lg:max-w-6xl">
      <MobileHeader onOpenSignupForm={openForm} />
      <SectionIndicators />
      <header className="py-6 px-4 flex justify-center md:py-8 md:px-6 lg:px-8 lg:h-[120px] lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="will-change-transform"
        >
          <Image
            src="/conty-logo.svg"
            alt="Conty Logo"
            width={180}
            height={90}
            className="h-[90px] w-auto object-contain md:h-[100px] lg:h-[110px]"
            priority
          />
        </motion.div>
      </header>

      <main className="flex-1 px-5 md:px-8 lg:px-12">
        {/* Hero Section - First section, image on right */}
        <motion.section
          className="text-center mb-20 md:mb-28 lg:mb-0 md:flex md:items-center md:text-left md:gap-10 lg:gap-20 lg:min-h-[calc(100vh-120px)] lg:py-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="relative mb-10 mx-auto w-[220px] md:w-[280px] lg:w-[350px] md:mb-0 md:flex-shrink-0 md:order-2 will-change-transform"
            variants={imageAnimation}
          >
            <Image
              src="/conty-app-mockup.svg"
              alt="Conty App Mockup"
              width={400}
              height={400}
              className="w-full h-auto"
              priority
            />
          </motion.div>

          <div className="md:flex-1 md:order-1">
            <motion.h1
              className="text-2xl font-bold mb-8 leading-relaxed tracking-tight md:text-3xl lg:text-4xl md:mb-10 lg:mb-12"
              variants={fadeIn}
            >
              O jeito <span className="text-[#00E884] font-extrabold">fácil</span>,{" "}
              <span className="text-[#00E884] font-extrabold">divertido</span> e
              <span className="text-[#00E884] font-extrabold">&nbsp;gameficado</span> para criar conteúdo nas redes
              sociais!
            </motion.h1>

            <motion.div variants={fadeIn} className="md:max-w-sm">
              <button
                className="duolingo-button bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 px-8 w-full max-w-xs mx-auto uppercase tracking-wide md:mx-0 lg:text-lg"
                onClick={openForm}
              >
                ENTRAR NA LISTA DE ESPERA
              </button>

              <p className="text-xs text-gray-600 mt-3 md:text-sm">*Lançamento oficial no final de Abril</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section - Second section, image on left for desktop */}
        <motion.section
          className="text-center mb-28 md:mb-36 lg:mb-0 md:flex md:items-center md:text-left md:gap-10 lg:gap-20 lg:min-h-screen lg:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="md:flex-1 md:order-1 lg:order-2">
            <motion.h2 className="text-2xl font-bold mb-6 inline-block md:text-3xl lg:text-4xl" variants={fadeIn}>
              <span className="text-[#3B82F6] font-extrabold">fácil. divertido. acessível.</span>
            </motion.h2>

            <motion.p
              className="text-gray-700 text-lg leading-relaxed mb-10 md:text-xl lg:text-2xl md:mb-0"
              variants={fadeIn}
            >
              Criar com a Conty é para qualquer pessoa que
              <span className="font-semibold"> tem uma mensagem para o mundo.</span>
              <br className="hidden md:block" />
              <br className="hidden md:block" />
              Com <span className="font-semibold">missões diárias</span>, crie ótimos conteúdos seguindo estratégias
              <span className="font-semibold"> geradas para redes</span> onde
              <span className="font-semibold"> consistência</span> é o diferencial!
            </motion.p>
          </div>

          <motion.div
            className="flex items-center justify-center mb-8 md:mb-0 md:w-[320px] lg:w-[420px] md:flex-shrink-0 md:order-2 lg:order-1 will-change-transform"
            variants={imageAnimation}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/second-image.jpg-U8sVDxAYOwoUOuA1P078pQbT8pbCb6.jpeg"
              alt="Conty Features"
              width={420}
              height={280}
              className="w-[260px] h-auto md:w-full"
              loading="lazy"
            />
          </motion.div>
        </motion.section>

        {/* Game Section - Third section, image on right for desktop */}
        <motion.section
          className="text-center mb-28 md:mb-36 lg:mb-0 md:flex md:flex-row md:items-center md:text-left md:gap-10 lg:gap-20 lg:min-h-screen lg:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <div className="flex flex-col md:order-2 lg:order-1 md:flex-1">
            <motion.h2 className="text-2xl font-bold mb-6 inline-block md:text-3xl lg:text-4xl" variants={fadeIn}>
              <span className="text-[#3B82F6] font-extrabold">mais que um app...</span>
              <br />
              <span className="text-[#3B82F6] font-extrabold">um jogo!</span>
            </motion.h2>

            <motion.p
              className="text-gray-700 mb-10 text-lg leading-relaxed md:text-xl lg:text-2xl md:mb-0"
              variants={fadeIn}
            >
              Crie conteúdos de qualidade <span className="font-semibold">como se estivesse jogando!</span>
              Diferente dos criadores complexos acessíveis apenas para designers e profissionais.
            </motion.p>
          </div>

          <motion.div
            className="flex items-center justify-center mb-8 md:mb-0 md:w-[320px] lg:w-[420px] md:flex-shrink-0 md:order-1 lg:order-2"
            variants={imageAnimation}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/third-image.jpg-M6AGka2oEUYNbdZDpcaOCtHqJwDjCu.jpeg"
              alt="Conty Gamification"
              width={420}
              height={280}
              className="w-[260px] h-auto md:w-full"
              loading="lazy"
            />
          </motion.div>
        </motion.section>

        {/* For Content Creators Section - Fourth section, image on left for desktop */}
        <motion.section
          className="text-center mb-28 md:mb-36 lg:mb-0 md:flex md:items-center md:text-left md:gap-10 lg:gap-20 lg:min-h-screen lg:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <div className="md:flex-1 md:order-1 lg:order-2">
            <motion.h2 className="text-2xl font-bold mb-6 inline-block md:text-3xl lg:text-4xl" variants={fadeIn}>
              <span className="text-[#3B82F6] font-extrabold">Para qualquer produtor</span>
              <br />
              <span className="text-[#3B82F6] font-extrabold">de conteúdo.</span>
            </motion.h2>

            <motion.p
              className="text-gray-700 mb-10 text-lg leading-relaxed md:text-xl lg:text-2xl md:mb-0"
              variants={fadeIn}
            >
              Crie conteúdos autênticos alinhados à sua mensagem. Diferente do que é replicado pelas agências, com a
              Conty sua voz é única no mundo.
            </motion.p>
          </div>

          <motion.div
            className="flex items-center justify-center md:w-[320px] lg:w-[420px] md:flex-shrink-0 md:order-2 lg:order-1"
            variants={imageAnimation}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/forth-image.jpg-obrnFzyys73RJ6rIHuE5pt4SrUV7Dx.jpeg"
              alt="Conty Green Mascot"
              width={420}
              height={280}
              className="w-[260px] h-auto md:w-full"
              loading="lazy"
            />
          </motion.div>
        </motion.section>

        {/* CTA Section - Improved with app store mockups */}
        <motion.section
          className="bg-[#00E884] py-16 px-6 text-center text-white -mx-5 rounded-t-3xl shadow-inner md:py-24 md:px-10 md:-mx-8 lg:py-16 lg:px-14 lg:-mx-12 lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-3xl">
            <h2 className="text-2xl font-bold mb-8 md:text-3xl lg:text-4xl md:mb-10">crie quando e onde quiser</h2>

            {/* App Store Mockups - New Design */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12 md:mb-16">
              {/* Phone Mockup - New Design */}
              <motion.div
                className="relative w-[220px] md:w-[260px] lg:w-[300px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {/* Phone frame */}
                <div className="relative mx-auto">
                  {/* Phone outer frame */}
                  <div className="relative bg-gray-800 rounded-[40px] p-4 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                    {/* Phone screen */}
                    <div className="relative bg-white rounded-[32px] overflow-hidden aspect-[9/19] flex flex-col">
                      {/* App header */}
                      <div className="bg-[#3B82F6] p-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#00E884] flex-shrink-0"></div>
                        <div className="ml-3 h-4 bg-white/80 rounded-full w-24"></div>
                      </div>

                      {/* App content */}
                      <div className="flex-1 p-4 flex flex-col gap-3">
                        {/* Conty mascot in center */}
                        <div className="flex-1 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-[#3B82F6] flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-[#00E884] flex items-center justify-center text-white font-bold text-xl">
                              C
                            </div>
                          </div>
                        </div>

                        {/* Bottom UI elements */}
                        <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
                        <div className="h-10 bg-[#3B82F6] rounded-xl w-full mt-2"></div>
                      </div>

                      {/* App navigation */}
                      <div className="bg-gray-100 p-3 flex justify-around">
                        <div className="w-8 h-8 rounded-full bg-[#3B82F6]"></div>
                        <div className="w-8 h-8 rounded-full bg-[#3B82F6]"></div>
                        <div className="w-8 h-8 rounded-full bg-[#3B82F6]"></div>
                      </div>
                    </div>

                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl"></div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#3B82F6] rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#3B82F6] rounded-full opacity-20 blur-xl"></div>
                </div>
              </motion.div>

              {/* App Store Badges */}
              <div className="flex flex-col gap-6">
                <motion.div
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="bg-black text-white rounded-xl py-3 px-6 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.0415 12.5C17.0415 9.83 14.8415 7.7 12.0415 7.7C9.24152 7.7 7.04152 9.83 7.04152 12.5C7.04152 15.17 9.24152 17.3 12.0415 17.3C14.8415 17.3 17.0415 15.17 17.0415 12.5Z"
                        fill="white"
                      />
                      <path
                        d="M12.0415 3C7.04152 3 3.04152 7 3.04152 12C3.04152 17 7.04152 21 12.0415 21C17.0415 21 21.0415 17 21.0415 12C21.0415 7 17.0415 3 12.0415 3ZM12.0415 19C8.14152 19 5.04152 15.9 5.04152 12C5.04152 8.1 8.14152 5 12.0415 5C15.9415 5 19.0415 8.1 19.0415 12C19.0415 15.9 15.9415 19 12.0415 19Z"
                        fill="white"
                      />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Em breve na</div>
                      <div className="text-lg font-semibold">Apple Store</div>
                    </div>
                  </div>

                  <div className="bg-black text-white rounded-xl py-3 px-6 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.60156 3.60156L12.0016 12.0016L3.60156 20.4016V3.60156Z" fill="white" />
                      <path d="M12.0016 12.0016L20.4016 3.60156H12.0016V12.0016Z" fill="white" />
                      <path d="M12.0016 12.0016V20.4016H20.4016L12.0016 12.0016Z" fill="white" />
                      <path d="M12.0016 12.0016L20.4016 20.4016V12.0016H12.0016Z" fill="white" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Em breve no</div>
                      <div className="text-lg font-semibold">Google Play</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <button
              className="duolingo-button bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 px-8 w-full max-w-xs mx-auto uppercase tracking-wide md:max-w-sm lg:py-5 lg:text-lg"
              onClick={openForm}
            >
              ENTRAR NA LISTA DE ESPERA
            </button>
          </div>
        </motion.section>
      </main>

      <footer className="py-8 px-4 text-center text-sm text-gray-500 md:py-10 md:text-base">
        <p>© 2025 Conty. All rights reserved.</p>
      </footer>

      {/* Signup Form Modal */}
      <SignupForm isOpen={isFormOpen} onClose={closeForm} />
      <DesktopScrollHandler />
    </div>
  )
}

