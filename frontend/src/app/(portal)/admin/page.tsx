import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Placeholder stats - in production, these would come from the API
const stats = [
  { label: 'Total Students', value: 156, change: '+12 this month' },
  { label: 'Active Classes', value: 24, change: '8 this week' },
  { label: 'Parent Accounts', value: 89, change: '+5 this month' },
  { label: 'Pending Tests', value: 7, change: 'Needs grading' },
]

const recentActivity = [
  { action: 'New student registered', user: 'John Doe', time: '2 hours ago' },
  { action: 'Class enrollment', user: 'Jane Smith', time: '3 hours ago' },
  { action: 'Test submitted', user: 'Mike Johnson', time: '5 hours ago' },
  { action: 'Resource uploaded', user: 'Admin', time: '1 day ago' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your admin portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                </div>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg">Add New User</CardTitle>
            <CardDescription>Create a new student, parent, or admin account</CardDescription>
          </CardHeader>
        </Card>
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg">Create Class</CardTitle>
            <CardDescription>Schedule a new class session</CardDescription>
          </CardHeader>
        </Card>
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg">Grade Tests</CardTitle>
            <CardDescription>Review and grade pending submissions</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
