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
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { router } from "@inertiajs/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
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
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  message: z.string(),
  is_read: z.boolean(),
  created_at: z.string(),
})


const columns = columnHelper.columns([
  columnHelper.accessor("is_read", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.is_read ? (
          <span className="text-zinc-600 dark:text-zinc-400">Read</span>
        ) : (
          <span className="text-blue-600 dark:text-blue-400 font-bold">New</span>
        )}
      </Badge>
    ),
  }),
  columnHelper.accessor("created_at", {
    header: "Date",
    cell: ({ row }) => (
      <div className="w-32">
        <span className="text-muted-foreground">
          {new Date(row.original.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("name", {
    header: "Sender",
    filterFn: "includesString" as any,
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
    enableHiding: false,
  }),
  columnHelper.accessor("email", {
    header: "Contact",
    cell: ({ row }) => (
      <div className="w-48 text-muted-foreground flex flex-col gap-1">
        <a href={`mailto:${row.original.email}`} className="text-blue-600 hover:underline">{row.original.email}</a>
        {row.original.phone && (
            <a href={`https://wa.me/${row.original.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">
                {row.original.phone}
            </a>
        )}
      </div>
    ),
  }),
  columnHelper.accessor("message", {
    header: "Message",
    cell: ({ row }) => (
      <div className="text-left pr-4 truncate max-w-[200px]" title={row.original.message}>
        {row.original.message}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <ActionMenu item={row.original} />
  }),
])

export function ActionMenu({ item }: { item: z.infer<typeof schema> }) {
  const [isViewOpen, setIsViewOpen] = React.useState(false)

  return (
    <div className="flex justify-end">
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
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onSelect={() => setIsViewOpen(true)}>View Details</DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => {
              router.put(`/dashboard/messages/${item.id}`, { is_read: !item.is_read }, {
                preserveScroll: true,
                onSuccess: () => toast.success(item.is_read ? 'Marked as unread' : 'Marked as read')
              })
            }}
          >
            Mark as {item.is_read ? 'Unread' : 'Read'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem 
                variant="destructive"
                onSelect={(e) => e.preventDefault()}
              >
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  variant="destructive" 
                  onClick={() => {
                    router.delete(`/dashboard/messages/${item.id}`, {
                      onSuccess: () => toast.success('Message deleted successfully.')
                    })
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <TableCellViewer item={item} open={isViewOpen} onOpenChange={setIsViewOpen} />
    </div>
  )
}


export function MessageDataTable({
  data: initialData,
  tabsList,
}: {
  data: z.infer<typeof schema>[]
  tabsList?: React.ReactNode
}) {
  const [data, setData] = React.useState(() => initialData)
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

  React.useEffect(() => {
    setData(initialData)
  }, [initialData])

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
            placeholder="Search messages..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm h-9"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <IconPlus />
                <span className="hidden lg:inline">Add Customer</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Customer</DialogTitle>
                <DialogDescription>
                  Enter the details for the new customer here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="new-name">Full Name</Label>
                  <Input id="new-name" placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="new-phone">WhatsApp / Phone</Label>
                    <Input id="new-phone" placeholder="+62 812-3456-7890" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="new-email">Email</Label>
                    <Input id="new-email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="new-totalBookings">Total Bookings</Label>
                    <Input id="new-totalBookings" type="number" defaultValue="0" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="new-status">Member Status</Label>
                    <Select defaultValue="New">
                      <SelectTrigger id="new-status" className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VIP">VIP</SelectItem>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="button" onClick={() => toast.success("Customer saved!")}>Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
                        <TableHead key={header.id} colSpan={header.colSpan}>
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
                        <TableCell key={cell.id}>
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

function TableCellViewer({ item, children, asChild, open, onOpenChange }: { item: z.infer<typeof schema>, children?: React.ReactNode, asChild?: boolean, open?: boolean, onOpenChange?: (open: boolean) => void }) {
  const isMobile = useIsMobile()
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isControlled = open !== undefined && onOpenChange !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  React.useEffect(() => {
    // If opened and not read, mark as read
    if (isOpen && !item.is_read) {
      router.put(`/dashboard/messages/${item.id}`, { is_read: true }, {
        preserveScroll: true,
      })
    }
  }, [isOpen, item.is_read, item.id])

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction={isMobile ? "bottom" : "right"}>
      {!isControlled && (
        <DrawerTrigger asChild>
          {children ? children : (
            <Button variant="link" className={`w-fit px-0 text-left ${item.is_read ? "text-muted-foreground" : "text-foreground font-semibold"}`}>
              {item.name}
            </Button>
          )}
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Message Details</DrawerTitle>
          <DrawerDescription>
            Message from {item.name}
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-6 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">{item.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <span className="font-medium text-foreground">{item.is_read ? 'Read' : 'New'}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">Email</span>
            <span className="text-foreground">{item.email}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">Phone</span>
            <span className="text-foreground">{item.phone || '-'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">Date</span>
            <span className="text-foreground">{new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">Message Content</span>
            <p className="text-foreground whitespace-pre-wrap">{item.message}</p>
          </div>
        </div>
        <DrawerFooter className="pt-4 flex-row justify-end gap-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
