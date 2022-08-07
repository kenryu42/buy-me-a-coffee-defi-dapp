import { ReactNode } from 'react'
import { Footer } from '.'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-stone-100">
      <main className="flex min-h-screen flex-col items-center justify-center py-2">
        {children}
      </main>
      <Footer />
    </div>
  )
}
