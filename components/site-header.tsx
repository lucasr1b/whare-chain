"use client"

import Link from "next/link"
import { Home, ClipboardList, Users, Map, LogOut, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserSelector } from "@/components/user-selector"
import { useActiveAccount, useDisconnect, useActiveWallet } from "thirdweb/react"

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const account = useActiveAccount()
  const wallet = useActiveWallet()
  const { disconnect } = useDisconnect()

  const handleDisconnect = () => {
    if (wallet) {
      disconnect(wallet)
      router.push("/")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
          <img src="/logo.png" alt="WhareChain Logo" className="h-9 w-9" />
          <span>WhareChain</span>
        </Link>
        <nav className="flex items-center gap-4">
          <div className="hidden md:flex gap-3">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              asChild
              className={cn(pathname === "/" && "bg-primary text-primary-foreground hover:bg-primary/90")}
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Registry
              </Link>
            </Button>
            <Button
              variant={pathname === "/housing/map" ? "default" : "ghost"}
              asChild
              className={cn(pathname === "/housing/map" && "bg-primary text-primary-foreground hover:bg-primary/90")}
            >
              <Link href="/housing/map">
                <Map className="mr-2 h-4 w-4" />
                Housing Map
              </Link>
            </Button>
            <Button
              variant={pathname === "/waitlist" ? "default" : "ghost"}
              asChild
              className={cn(pathname === "/waitlist" && "bg-primary text-primary-foreground hover:bg-primary/90")}
            >
              <Link href="/waitlist">
                <Users className="mr-2 h-4 w-4" />
                Waitlist
              </Link>
            </Button>
            <Button
              variant={pathname === "/audit-logs" ? "default" : "ghost"}
              asChild
              className={cn(pathname === "/audit-logs" && "bg-primary text-primary-foreground hover:bg-primary/90")}
            >
              <Link href="/audit-logs">
                <ClipboardList className="mr-2 h-4 w-4" />
                Audit Logs
              </Link>
            </Button>
            {account && (
              <Button
                variant={pathname === "/my-status" ? "default" : "ghost"}
                asChild
                className={cn(pathname === "/my-status" && "bg-primary text-primary-foreground hover:bg-primary/90")}
              >
                <Link href="/my-status">
                  <Users className="mr-2 h-4 w-4" />
                  My Status
                </Link>
              </Button>
            )}
          </div>
          <div className="border-l pl-4 ml-2 flex items-center gap-4">
            {account ? (
              <>
                <UserSelector />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDisconnect}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/connect">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

