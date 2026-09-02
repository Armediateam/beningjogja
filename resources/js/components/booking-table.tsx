"use client"

import * as React from "react"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
  IconCalendar,
} from "@tabler/icons-react"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type Row,
  type SortingState,
} from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { router } from '@inertiajs/react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
})

const columnHelper = createColumnHelper<
  typeof features,
  z.infer<typeof schema>
>()

export const schema = z.object({
  id: z.number(),
  bookingId: z.string(),
  type: z.string(),
  status: z.string(),
  customer: z.string(),
  amount: z.string(),
  date: z.string(),
  paymentProof: z.string().nullable().optional(),
})

// Create a separate component for the drag handle

const columns = columnHelper.columns([
  columnHelper.accessor("bookingId", {
    header: "Booking ID",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
    enableHiding: false,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: ({ row }) => (
      <div className="w-24">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.type}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.status === "Confirmed" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
  }),
  columnHelper.accessor("customer", {
    header: "Customer",
    filterFn: "includesString" as any,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.customer}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-customer`} className="sr-only">
          Customer
        </Label>
        <Input
          className="h-8 w-32 border-transparent bg-transparent text-left shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
          defaultValue={row.original.customer}
          id={`${row.original.id}-customer`}
        />
      </form>
    ),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving amount for ${row.original.bookingId}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-amount`} className="sr-only">
          Amount
        </Label>
        <Input
          className="h-8 w-24 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
          defaultValue={row.original.amount}
          />
        </form>
      </div>
    ),
    meta: { className: "text-right" }
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: ({ row }) => {
      const isAssigned = row.original.date !== "Assign date"

      if (isAssigned) {
        return row.original.date
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-date`} className="sr-only">
            Date
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-date`}
            >
              <SelectValue placeholder="Assign date" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="Tomorrow">Tomorrow</SelectItem>
            </SelectContent>
          </Select>
        </>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  }),
])

function ActionCell({ row }: { row: any }) {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [newDate, setNewDate] = React.useState<Date | undefined>(row.original.date ? new Date(row.original.date) : undefined);

  const handleReschedule = () => {
    if (!newDate) return;
    router.put(`/dashboard/booking/${row.original.id}/reschedule`, { booking_date: format(newDate, "yyyy-MM-dd") }, {
      onSuccess: () => {
        setSheetOpen(false);
        toast.success("Schedule updated successfully");
      },
      onError: (errors) => {
        toast.error(errors.booking_date || "Failed to update schedule");
      }
    });
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <TableCellViewer item={row.original} trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View Details</DropdownMenuItem>
          } />
          <SheetTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Reschedule</DropdownMenuItem>
          </SheetTrigger>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Booking {row.original.bookingId} will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  router.delete(`/dashboard/booking/${row.original.id}`, {
                    onSuccess: () => toast.success("Booking deleted successfully"),
                    onError: () => toast.error("Failed to delete booking")
                  });
                }}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <SheetContent className="p-6 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Reschedule Booking</SheetTitle>
          <SheetDescription>
            Set a new date for booking {row.original.bookingId}.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          <div className="grid gap-2">
            <Label>New Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !newDate && "text-muted-foreground"
                  )}
                >
                  <IconCalendar className="mr-2 h-4 w-4" />
                  {newDate ? format(newDate, "PPP") : <span>Select a new date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newDate}
                  onSelect={setNewDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={handleReschedule} className="w-full">
            Save New Schedule
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}


export function BookingDataTable({
  data: initialData,
  tabsList,
}: {
  data: z.infer<typeof schema>[]
  tabsList?: React.ReactNode
}) {
  const [data, setData] = React.useState(() => initialData)
  
  React.useEffect(() => {
    setData(initialData)
  }, [initialData])
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useTable({
    features,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {tabsList && tabsList}
          <Input
            placeholder="Search by customer..."
            value={(table.getColumn("customer")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("customer")?.setFilterValue(event.target.value)
            }
            className="max-w-sm h-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <AddBookingDialog />
        </div>
      </div>
      
      <div className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan} className={(header.column.columnDef.meta as any)?.className}>
                          {header.isPlaceholder ? null : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className={(cell.column.columnDef.meta as any)?.className}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.state.pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.state.pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.state.pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function TableCellViewer({ item, trigger }: { item: z.infer<typeof schema>, trigger?: React.ReactNode }) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = React.useState(false)
  const [localStatus, setLocalStatus] = React.useState(item.status)

  // Reset local state if item changes
  React.useEffect(() => {
    setLocalStatus(item.status)
  }, [item])

  const handleSave = () => {
    if (localStatus !== item.status) {
      router.put(`/dashboard/booking/${item.id}/status`, { status: localStatus.toLowerCase() }, {
        onSuccess: () => {
          toast.success("Status updated successfully")
          setIsOpen(false)
        },
        onError: () => toast.error("Failed to update status")
      })
    } else {
      setIsOpen(false)
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        {trigger || (
          <Button variant="link" className="w-fit px-0 text-left text-foreground">
            {item.bookingId}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.bookingId} Details</DrawerTitle>
          <DrawerDescription>
            Booking information and payment proof.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="bookingId">Booking ID</Label>
              <Input id="bookingId" defaultValue={item.bookingId} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Villa">
                      Villa
                    </SelectItem>
                    <SelectItem value="Private Pool">
                      Private Pool
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Update Status</Label>
                <Select value={localStatus} onValueChange={(val) => setLocalStatus(val)}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="customer">Customer</Label>
                <Input id="customer" defaultValue={item.customer} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" defaultValue={item.amount} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="date">Date</Label>
              <Input id="date" defaultValue={item.date} />
            </div>
            
            {item.paymentProof && (
              <div className="flex flex-col gap-3 mt-2">
                <Label>Payment Proof</Label>
                <a href={`/storage/${item.paymentProof}`} target="_blank" rel="noreferrer" className="w-full">
                  <Button type="button" variant="outline" className="w-full justify-start text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                    <IconLayoutColumns className="w-4 h-4 mr-2" />
                    View Uploaded Proof
                  </Button>
                </a>
              </div>
            )}
          </form>
        </div>
        <DrawerFooter>
          <Button onClick={handleSave}>Done</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function AddBookingDialog() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [customer, setCustomer] = React.useState("")
  const [type, setType] = React.useState("villa")
  const [status, setStatus] = React.useState("confirmed")
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const handleSave = () => {
    if (!customer || !date) {
      toast.error("Please complete all form fields!")
      return
    }

    router.post('/dashboard/booking', {
      customer_name: customer,
      type: type,
      status: status.toLowerCase(),
      booking_date: format(date, "yyyy-MM-dd")
    }, {
      onSuccess: () => {
        toast.success("Booking added successfully!")
        setIsOpen(false)
        setCustomer("")
        setDate(undefined)
      },
      onError: (errors: any) => {
        toast.error("Failed to add booking")
        console.error(errors)
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Add Booking</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Booking</DialogTitle>
          <DialogDescription>
            Enter the manual booking details below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="new-customer">Customer Name</Label>
            <Input id="new-customer" placeholder="John Doe" value={customer} onChange={(e) => setCustomer(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="new-type" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa">Villa Rental</SelectItem>
                  <SelectItem value="pool">Private Pool</SelectItem>
                  <SelectItem value="full">Full Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="new-status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <IconCalendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select booking date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
