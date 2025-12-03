import { PortalHeader } from '@/components/shared/portal-header'

const parentNavItems = [
  { href: '/parent', label: 'Dashboard' },
  { href: '/parent/children', label: 'My Children' },
  { href: '/parent/classes', label: 'Classes' },
  { href: '/parent/resources', label: 'Resources' },
  { href: '/parent/tests', label: 'Test Results' },
]

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In production, this would come from the session/auth
  const userName = 'Parent User'

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader
        userName={userName}
        userRole="parent"
        navItems={parentNavItems}
      />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
