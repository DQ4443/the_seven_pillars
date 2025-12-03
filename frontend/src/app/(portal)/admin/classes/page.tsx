'use client'

import { useState, useMemo } from 'react'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'

// Placeholder class data
const classData = [
  { id: 1, name: 'Year 7 Mathematics', subject: 'Mathematics', yearLevel: 7, teacher: 'Mr. Smith', day: 'Monday', time: '4:00 PM', enrolled: 15, maxStudents: 20 },
  { id: 2, name: 'Year 7 English', subject: 'English', yearLevel: 7, teacher: 'Ms. Johnson', day: 'Tuesday', time: '4:00 PM', enrolled: 18, maxStudents: 20 },
  { id: 3, name: 'Year 8 Science', subject: 'Science', yearLevel: 8, teacher: 'Dr. Williams', day: 'Wednesday', time: '4:00 PM', enrolled: 12, maxStudents: 20 },
  { id: 4, name: 'Year 9 Mathematics', subject: 'Mathematics', yearLevel: 9, teacher: 'Mr. Smith', day: 'Thursday', time: '5:00 PM', enrolled: 20, maxStudents: 20 },
  { id: 5, name: 'Year 10 English', subject: 'English', yearLevel: 10, teacher: 'Ms. Johnson', day: 'Friday', time: '4:00 PM', enrolled: 8, maxStudents: 20 },
]

type ClassInfo = typeof classData[number]

export default function ClassesPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const columns: ColumnDef<ClassInfo>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Class Name',
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue('name')}</span>
        ),
      },
      {
        accessorKey: 'subject',
        header: 'Subject',
      },
      {
        accessorKey: 'yearLevel',
        header: 'Year',
        cell: ({ row }) => <Badge variant="outline">Year {row.getValue('yearLevel')}</Badge>,
      },
      {
        accessorKey: 'teacher',
        header: 'Teacher',
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
        id: 'enrollment',
        header: 'Enrollment',
        cell: ({ row }) => {
          const enrolled = row.original.enrolled
          const max = row.original.maxStudents
          const isFull = enrolled >= max
          return (
            <span className={isFull ? 'text-destructive font-medium' : ''}>
              {enrolled}/{max}
            </span>
          )
        },
      },
      {
        id: 'actions',
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                ...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Class</DropdownMenuItem>
              <DropdownMenuItem>View Enrollments</DropdownMenuItem>
              <DropdownMenuItem>Copy Meet Link</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete Class</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: classData,
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Classes</h1>
          <p className="text-muted-foreground">Manage all class sessions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Class</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
              <DialogDescription>
                Schedule a new class session
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="className">Class Name</Label>
                <Input id="className" placeholder="Year 7 Mathematics" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <select id="subject" className="w-full p-2 border rounded-md">
                    <option value="mathematics">Mathematics</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearLevel">Year Level</Label>
                  <select id="yearLevel" className="w-full p-2 border rounded-md">
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Year {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher">Teacher</Label>
                <Input id="teacher" placeholder="Mr. Smith" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="day">Day</Label>
                  <select id="day" className="w-full p-2 border rounded-md">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <option key={day} value={day.toLowerCase()}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetLink">Google Meet Link</Label>
                <Input id="meetLink" placeholder="https://meet.google.com/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Max Students</Label>
                <Input id="maxStudents" type="number" defaultValue={20} />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Class</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search classes..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="border rounded-lg">
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
    </div>
  )
}
