import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/contexts/user-context"
import { ThirdwebProvider } from "thirdweb/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WhareChain",
  description: "Transparent social housing management system for New Zealand",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThirdwebProvider>
          <ThemeProvider defaultTheme="dark" disableTransitionOnChange>
            <UserProvider>{children}</UserProvider>
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  )
}



import './globals.css'