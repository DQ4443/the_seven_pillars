import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            The Seven Pillars
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/timetable" className="text-sm hover:underline">
              Timetable
            </Link>
            <Link href="/faq" className="text-sm hover:underline">
              FAQ
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Excel in Your Studies with Expert Tutoring
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Personalized tutoring aligned with the Australian curriculum.
            Small class sizes, experienced teachers, and proven results.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg">Start Learning Today</Button>
            </Link>
            <Link href="/timetable">
              <Button variant="outline" size="lg">View Classes</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Australian Curriculum</CardTitle>
                <CardDescription>
                  Aligned with the official Australian curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our courses are designed specifically for the Australian education system,
                  ensuring students get relevant and up-to-date content.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Small Class Sizes</CardTitle>
                <CardDescription>
                  Maximum 20 students per class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We maintain small class sizes to ensure every student gets the attention
                  they need to succeed.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expert Teachers</CardTitle>
                <CardDescription>
                  Experienced and qualified educators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our teachers are passionate about education and bring years of experience
                  to help students achieve their potential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Year Levels Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Programs for All Levels</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Years 1-3', 'Years 4-6', 'Years 7-9', 'Years 10-12'].map((level) => (
              <Card key={level} className="text-center">
                <CardHeader>
                  <CardTitle>{level}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive tutoring in Mathematics, English, and Science
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg mb-8 opacity-90">
            Take our entrance test to find your level and get started on your learning journey.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Take Entrance Test
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 The Seven Pillars. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/faq" className="hover:underline">FAQ</Link>
              <Link href="/timetable" className="hover:underline">Timetable</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
