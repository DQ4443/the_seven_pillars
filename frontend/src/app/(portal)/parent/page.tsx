'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

// Placeholder data
const children = [
  { id: '1', name: 'Emma Wilson', yearLevel: 7 },
  { id: '2', name: 'Jack Wilson', yearLevel: 9 },
]

const upcomingClasses = [
  { id: 1, subject: 'Mathematics', time: 'Today, 4:00 PM', teacher: 'Mr. Smith', child: 'Emma Wilson' },
  { id: 2, subject: 'English', time: 'Tomorrow, 4:00 PM', teacher: 'Ms. Johnson', child: 'Emma Wilson' },
  { id: 3, subject: 'Science', time: 'Wednesday, 5:00 PM', teacher: 'Dr. Williams', child: 'Jack Wilson' },
]

const recentResources = [
  { id: 1, title: 'Math Homework Week 5', subject: 'Mathematics', child: 'Emma Wilson', date: '2 days ago' },
  { id: 2, title: 'Essay Guidelines', subject: 'English', child: 'Jack Wilson', date: '3 days ago' },
]

const testResults = [
  { id: 1, title: 'Entrance Test', child: 'Emma Wilson', score: 85, maxScore: 100, status: 'graded' },
  { id: 2, title: 'Entrance Test', child: 'Jack Wilson', score: null, maxScore: 100, status: 'pending' },
]

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(children[0])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground">Monitor your children&apos;s progress</p>
        </div>

        {/* Child Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedChild.name} (Year {selectedChild.yearLevel})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {children.map((child) => (
              <DropdownMenuItem
                key={child.id}
                onClick={() => setSelectedChild(child)}
              >
                {child.name} (Year {child.yearLevel})
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Enrolled Classes</CardDescription>
            <CardTitle className="text-3xl">4</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {selectedChild.name}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming This Week</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Classes scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Resources</CardDescription>
            <CardTitle className="text-3xl">2</CardTitle>
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
            <CardDescription>Next scheduled sessions</CardDescription>
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
                    <p className="text-sm text-muted-foreground">
                      {cls.teacher} • {cls.child}
                    </p>
                  </div>
                  <Badge variant="outline">{cls.time}</Badge>
                </div>
              ))}
            </div>
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
                    <p className="text-sm text-muted-foreground">
                      {resource.subject} • {resource.child}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{resource.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
          <CardDescription>Entrance tests and assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testResults.map((test) => (
              <div
                key={test.id}
                className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{test.title}</p>
                  <p className="text-sm text-muted-foreground">{test.child}</p>
                </div>
                <div className="text-right">
                  {test.status === 'graded' ? (
                    <>
                      <p className="font-medium">{test.score}/{test.maxScore}</p>
                      <Badge variant="default">Graded</Badge>
                    </>
                  ) : (
                    <Badge variant="secondary">Pending Grading</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
