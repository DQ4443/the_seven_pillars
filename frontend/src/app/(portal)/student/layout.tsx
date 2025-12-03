import { PortalHeader } from '@/components/shared/portal-header'

const studentNavItems = [
  { href: '/student', label: 'Dashboard' },
  { href: '/student/classes', label: 'My Classes' },
  { href: '/student/timetable', label: 'Timetable' },
  { href: '/student/resources', label: 'Resources' },
  { href: '/student/tests', label: 'Tests' },
]

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In production, this would come from the session/auth
  const userName = 'Student User'

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader
        userName={userName}
        userRole="student"
        navItems={studentNavItems}
      />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
