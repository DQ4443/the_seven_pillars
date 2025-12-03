import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Placeholder data
const upcomingClasses = [
  { id: 1, subject: 'Mathematics', time: 'Today, 4:00 PM', teacher: 'Mr. Smith', meetLink: 'https://meet.google.com/abc' },
  { id: 2, subject: 'English', time: 'Tomorrow, 4:00 PM', teacher: 'Ms. Johnson', meetLink: 'https://meet.google.com/def' },
  { id: 3, subject: 'Science', time: 'Wednesday, 5:00 PM', teacher: 'Dr. Williams', meetLink: 'https://meet.google.com/ghi' },
]

const recentResources = [
  { id: 1, title: 'Math Homework Week 5', subject: 'Mathematics', date: '2 days ago' },
  { id: 2, title: 'Essay Guidelines', subject: 'English', date: '3 days ago' },
  { id: 3, title: 'Lab Report Template', subject: 'Science', date: '1 week ago' },
]

const pendingTests = [
  { id: 1, title: 'Year 7 Entrance Test', timeLimit: '60 min', status: 'not_started' },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your classes</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Enrolled Classes</CardDescription>
            <CardTitle className="text-3xl">4</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Active courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Classes This Week</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Upcoming sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Resources</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Available for download</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your next scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{cls.time}</Badge>
                    <Button size="sm" variant="outline" asChild>
                      <a href={cls.meetLink} target="_blank" rel="noopener noreferrer">
                        Join
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/student/classes" className="block mt-4">
              <Button variant="ghost" className="w-full">
                View All Classes
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Resources</CardTitle>
            <CardDescription>Latest uploaded materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{resource.title}</p>
                    <p className="text-sm text-muted-foreground">{resource.subject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{resource.date}</span>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/student/resources" className="block mt-4">
              <Button variant="ghost" className="w-full">
                View All Resources
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tests */}
      {pendingTests.length > 0 && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Pending Tests</CardTitle>
            <CardDescription>Complete these tests to get placed in appropriate classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTests.map((test) => (
                <div
                  key={test.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{test.title}</p>
                    <p className="text-sm text-muted-foreground">Time limit: {test.timeLimit}</p>
                  </div>
                  <Link href={`/student/tests/${test.id}`}>
                    <Button>Start Test</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
