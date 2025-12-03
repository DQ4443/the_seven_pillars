import { PortalHeader } from '@/components/shared/portal-header'

const adminNavItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/classes', label: 'Classes' },
  { href: '/admin/subjects', label: 'Subjects' },
  { href: '/admin/resources', label: 'Resources' },
  { href: '/admin/tests', label: 'Tests' },
  { href: '/admin/faq', label: 'FAQ' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In production, this would come from the session/auth
  const userName = 'Admin User'

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader
        userName={userName}
        userRole="admin"
        navItems={adminNavItems}
      />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
