import { ReactNode, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, FileText, Settings, DollarSign, Users, 
  Zap, GitBranch, TrendingUp, Menu, X, Moon, Sun, 
  ChevronRight, Bell, Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Set light mode by default
    document.documentElement.classList.remove('dark')
    
    // Check screen size
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // Auto-close sidebar on mobile, auto-open on desktop
      if (!mobile) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { path: '/sales', label: 'Sales', icon: DollarSign, badge: 'New' },
    { path: '/customers', label: 'Customers', icon: Users, badge: null },
    { path: '/core-web-vitals', label: 'Web Vitals', icon: Zap, badge: null },
    { path: '/scrum-of-scrum', label: 'Scrum', icon: GitBranch, badge: null },
    { path: '/funnel', label: 'Funnel', icon: TrendingUp, badge: null },
    { path: '/reports', label: 'Reports', icon: FileText, badge: '3' },
    { path: '/settings', label: 'Settings', icon: Settings, badge: null },
  ]

  return (
    <div className="min-h-screen bg-background bg-gradient-radial">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-screen transition-all duration-300 ease-in-out",
          "bg-card/95 backdrop-blur-xl border-r border-border",
          // Mobile: slide in/out from left
          isMobile ? (sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72") : "",
          // Desktop: toggle between expanded and collapsed
          !isMobile && (sidebarOpen ? "w-64" : "w-20")
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-3" onClick={closeSidebarOnMobile}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            {(sidebarOpen || isMobile) && (
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight">Ecomm</span>
                <span className="text-xs text-muted-foreground -mt-1">Dashboard</span>
              </div>
            )}
          </Link>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(false)}
              className="h-8 w-8"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {(sidebarOpen || isMobile) && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 mb-4">
              Menu
            </p>
          )}
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebarOnMobile}
                className={cn(
                  "sidebar-link",
                  isActive && "active",
                  !sidebarOpen && !isMobile && "justify-center px-0"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
                {(sidebarOpen || isMobile) && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={item.badge === 'New' ? 'default' : 'secondary'} 
                        className="text-xs px-2 py-0"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User section at bottom */}
        {(sidebarOpen || isMobile) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card/95">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <Avatar className="h-10 w-10 border-2 border-primary/20 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  VJ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Vishal J</p>
                <p className="text-xs text-muted-foreground truncate">Admin</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className={cn(
        "transition-all duration-300 min-h-screen",
        // On mobile, no margin (sidebar overlays)
        isMobile ? "ml-0" : (sidebarOpen ? "ml-64" : "ml-20")
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-14 sm:h-16 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between h-full px-4 sm:px-6">
            <div className="flex items-center gap-3 flex-1">
              {/* Mobile menu button */}
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="h-9 w-9 flex-shrink-0"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}
              {/* Search - hidden on small mobile, visible on larger screens */}
              <div className="relative flex-1 max-w-xs sm:max-w-md hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary h-9 sm:h-10 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile search button */}
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:hidden">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <div className="hidden sm:block w-px h-6 bg-border mx-1" />
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">Welcome back</p>
                  <p className="text-xs text-muted-foreground">Dashboard Overview</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 page-enter">
          {children}
        </main>
      </div>
    </div>
  )
}
