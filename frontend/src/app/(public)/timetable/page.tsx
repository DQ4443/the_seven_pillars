'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Placeholder class data - in production, this would come from the API
const classData = [
  {
    id: 1,
    subject: 'Mathematics',
    yearLevel: 7,
    day: 'Monday',
    time: '4:00 PM - 5:30 PM',
    teacher: 'Mr. Smith',
    spotsAvailable: 5,
    maxStudents: 20,
  },
  {
    id: 2,
    subject: 'English',
    yearLevel: 7,
    day: 'Tuesday',
    time: '4:00 PM - 5:30 PM',
    teacher: 'Ms. Johnson',
    spotsAvailable: 8,
    maxStudents: 20,
  },
  {
    id: 3,
    subject: 'Science',
    yearLevel: 8,
    day: 'Wednesday',
    time: '4:00 PM - 5:30 PM',
    teacher: 'Dr. Williams',
    spotsAvailable: 12,
    maxStudents: 20,
  },
  {
    id: 4,
    subject: 'Mathematics',
    yearLevel: 9,
    day: 'Thursday',
    time: '5:00 PM - 6:30 PM',
    teacher: 'Mr. Smith',
    spotsAvailable: 3,
    maxStudents: 20,
  },
  {
    id: 5,
    subject: 'English',
    yearLevel: 10,
    day: 'Friday',
    time: '4:00 PM - 5:30 PM',
    teacher: 'Ms. Johnson',
    spotsAvailable: 0,
    maxStudents: 20,
  },
  {
    id: 6,
    subject: 'Mathematics',
    yearLevel: 11,
    day: 'Saturday',
    time: '10:00 AM - 11:30 AM',
    teacher: 'Mr. Chen',
    spotsAvailable: 15,
    maxStudents: 20,
  },
  {
    id: 7,
    subject: 'Science',
    yearLevel: 12,
    day: 'Saturday',
    time: '1:00 PM - 2:30 PM',
    teacher: 'Dr. Williams',
    spotsAvailable: 7,
    maxStudents: 20,
  },
]

type ClassInfo = typeof classData[number]

export default function TimetablePage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [yearFilter, setYearFilter] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  const columns: ColumnDef<ClassInfo>[] = useMemo(
    () => [
      {
        accessorKey: 'subject',
        header: 'Subject',
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue('subject')}</span>
        ),
      },
      {
        accessorKey: 'yearLevel',
        header: 'Year',
        cell: ({ row }) => <Badge variant="outline">Year {row.getValue('yearLevel')}</Badge>,
      },
      {
        accessorKey: 'day',
        header: 'Day',
      },
      {
        accessorKey: 'time',
        header: 'Time',
      },
      {
        accessorKey: 'teacher',
        header: 'Teacher',
      },
      {
        accessorKey: 'spotsAvailable',
        header: 'Availability',
        cell: ({ row }) => {
          const spots = row.getValue('spotsAvailable') as number
          if (spots === 0) {
            return <Badge variant="destructive">Full</Badge>
          } else if (spots <= 5) {
            return <Badge variant="secondary">{spots} spots left</Badge>
          }
          return <Badge variant="default">{spots} spots available</Badge>
        },
      },
    ],
    []
  )

  const filteredData = useMemo(() => {
    if (yearFilter === null) return classData
    return classData.filter((c) => c.yearLevel === yearFilter)
  }, [yearFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const yearLevels = [...new Set(classData.map((c) => c.yearLevel))].sort((a, b) => a - b)

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            The Seven Pillars
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/timetable" className="text-sm font-medium">
              Timetable
            </Link>
            <Link href="/faq" className="text-sm hover:underline">
              FAQ
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Class Timetable</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search classes..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={yearFilter === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setYearFilter(null)}
            >
              All Years
            </Button>
            {yearLevels.map((year) => (
              <Button
                key={year}
                variant={yearFilter === year ? 'default' : 'outline'}
                size="sm"
                onClick={() => setYearFilter(year)}
              >
                Year {year}
              </Button>
            ))}
          </div>
          <div className="md:ml-auto flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              Cards
            </Button>
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' ↑',
                          desc: ' ↓',
                        }[header.column.getIsSorted() as string] ?? null}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8">
                      No classes found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Card View */}
        {viewMode === 'cards' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const classInfo = row.original
                return (
                  <Card key={row.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{classInfo.subject}</CardTitle>
                        <Badge variant="outline">Year {classInfo.yearLevel}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Day:</span> {classInfo.day}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Time:</span> {classInfo.time}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Teacher:</span> {classInfo.teacher}
                      </p>
                      <div className="pt-2">
                        {classInfo.spotsAvailable === 0 ? (
                          <Badge variant="destructive">Full</Badge>
                        ) : classInfo.spotsAvailable <= 5 ? (
                          <Badge variant="secondary">{classInfo.spotsAvailable} spots left</Badge>
                        ) : (
                          <Badge variant="default">{classInfo.spotsAvailable} spots available</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <p className="col-span-full text-center py-8 text-muted-foreground">
                No classes found.
              </p>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Interested in enrolling? Register now and take our entrance test.
          </p>
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
