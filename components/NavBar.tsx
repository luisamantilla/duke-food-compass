'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Star, Users, Heart, ChefHat } from 'lucide-react'

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/recommendations', icon: Compass, label: 'Recs' },
  { href: '/specials', icon: Star, label: 'Specials' },
  { href: '/friends', icon: Users, label: 'Friends' },
  { href: '/mood', icon: Heart, label: 'Mood' },
  { href: '/remix', icon: ChefHat, label: 'Remix' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-bottom">
        <div className="grid grid-cols-6 gap-0">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || pathname?.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-all ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className={`text-xs mt-1 font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40">
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Duke Food</h1>
                <p className="text-xs text-gray-500">Compass</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href || pathname?.startsWith(href + '/')
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                      <span className="text-sm">{label === 'Recs' ? 'Recommendations' : label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              Duke Food Compass
              <br />
              <span className="text-gray-400">v1.0.0</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
