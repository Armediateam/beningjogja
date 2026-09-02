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
  IconTrash,
  IconUsers,
  IconBed,
  IconSwimming,
  IconChecklist,
  IconWifi,
  IconCar,
  IconCoffee,
  IconDeviceTv,
  IconSnowflake,
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
import { Textarea } from "@/components/ui/textarea"
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
  code: z.string(),
  type: z.string(),
  price: z.union([z.string(), z.number()]),
  status: z.string(),
  description: z.string().nullable().optional(),
  facilities: z.array(z.any()).nullable().optional(),
  image: z.string().nullable().optional(),
})

export const availableIcons = [
  { value: 'users', label: 'Users', icon: IconUsers },
  { value: 'bed', label: 'Bed', icon: IconBed },
  { value: 'swimming', label: 'Swimming Pool', icon: IconSwimming },
  { value: 'checklist', label: 'Checklist', icon: IconChecklist },
  { value: 'wifi', label: 'Wifi', icon: IconWifi },
  { value: 'car', label: 'Parking', icon: IconCar },
  { value: 'coffee', label: 'Coffee', icon: IconCoffee },
  { value: 'tv', label: 'TV', icon: IconDeviceTv },
  { value: 'ac', label: 'AC', icon: IconSnowflake },
]

function FacilitiesEditor({ facilities, setFacilities }: { facilities: any[], setFacilities: (f: any[]) => void }) {
  const addFacility = () => {
    setFacilities([...facilities, { name: '', icon: 'checklist' }])
  }
  const removeFacility = (index: number) => {
    const newF = [...facilities]
    newF.splice(index, 1)
    setFacilities(newF)
  }
  const updateFacility = (index: number, key: string, value: string) => {
    const newF = [...facilities]
    if (typeof newF[index] === 'string') {
        newF[index] = { name: newF[index], icon: 'checklist' }
    }
    newF[index] = { ...newF[index], [key]: value }
    setFacilities(newF)
  }

  return (
    <div className="flex flex-col gap-3">
      <Label>Facilities</Label>
      {facilities.map((f, i) => {
        const item = typeof f === 'string' ? { name: f, icon: 'checklist' } : f
        return (
          <div key={i} className="flex items-center gap-2">
            <Select value={item.icon} onValueChange={(val) => updateFacility(i, 'icon', val)}>
              <SelectTrigger className="w-[160px] flex-shrink-0">
                <SelectValue placeholder="Icon" />
              </SelectTrigger>
              <SelectContent>
                {availableIcons.map(ic => {
                  const IconComp = ic.icon
                  return (
                    <SelectItem key={ic.value} value={ic.value}>
                      <div className="flex items-center gap-2">
                         <IconComp className="w-4 h-4 text-muted-foreground" />
                         <span>{ic.label}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <Input 
              value={item.name} 
              onChange={(e) => updateFacility(i, 'name', e.target.value)} 
              placeholder="Facility name..."
            />
            <Button variant="ghost" size="icon" type="button" onClick={() => removeFacility(i)} className="flex-shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive">
              <IconTrash className="w-4 h-4" />
            </Button>
          </div>
        )
      })}
      <Button type="button" variant="outline" size="sm" onClick={addFacility} className="w-fit mt-1">
        <IconPlus className="w-4 h-4 mr-2" /> Add Facility
      </Button>
    </div>
  )
}

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Package / Session",
    filterFn: "includesString" as any,
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
    enableHiding: false,
  }),
  columnHelper.accessor("type", {
    header: "Type / Duration",
    cell: ({ row }) => (
      <div className="w-24">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.type}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: ({ row }) => {
      const [price, setPrice] = React.useState(row.original.price);
      
      React.useEffect(() => {
        setPrice(row.original.price);
      }, [row.original.price]);

      return (
        <div className="flex justify-end">
          <form
          onSubmit={(e) => {
            e.preventDefault()
            const numericPrice = String(price).replace(/[^0-9]/g, '');
            router.put(`/dashboard/pricing/${row.original.id}`, {
              ...row.original,
              price: numericPrice,
            }, {
              onSuccess: () => toast.success(`Price for ${row.original.name} updated successfully.`),
              onError: () => toast.error("Failed to update price.")
            })
          }}
        >
          <Label htmlFor={`${row.original.id}-price`} className="sr-only">
            Price
          </Label>
          <Input
            className="h-8 w-24 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id={`${row.original.id}-price`}
          />
        </form>
        </div>
      )
    },
    meta: { className: "text-right" }
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.status === "Active" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <ActionMenu item={row.original} />
  }),
])


export function PricingDataTable({
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
            placeholder="Search package..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
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
          <AddPricingDialog />
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

function TableCellViewer({ item, children, open, onOpenChange }: { item: z.infer<typeof schema>, children?: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) {
  const isMobile = useIsMobile()
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isControlled = open !== undefined && onOpenChange !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  const [name, setName] = React.useState(item.name)
  const [type, setType] = React.useState(item.type)
  const [status, setStatus] = React.useState(item.status)
  const [price, setPrice] = React.useState(String(item.price))
  const [description, setDescription] = React.useState(item.description || "")
  const [facilities, setFacilities] = React.useState<any[]>(item.facilities || [])
  const [image, setImage] = React.useState<File | null>(null)

  React.useEffect(() => {
    if (isOpen) {
      setName(item.name)
      setType(item.type)
      setStatus(item.status)
      setPrice(String(item.price))
      setDescription(item.description || "")
      setFacilities(item.facilities || [])
      setImage(null)
    }
  }, [isOpen, item])

  const handleSave = () => {
    router.post(`/dashboard/pricing/${item.id}`, {
      _method: 'put',
      name,
      type,
      status,
      description,
      facilities: facilities.filter((f: any) => {
          if (typeof f === 'string') return f.trim() !== ''
          return f.name.trim() !== ''
      }),
      image,
      price: price.replace(/[^0-9]/g, '')
    }, {
      onSuccess: () => {
        toast.success("Pricing details updated successfully")
        setIsOpen(false)
      }
    })
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction={isMobile ? "bottom" : "right"}>
      {!isControlled && (
        <DrawerTrigger asChild>
          {children ? children : (
            <Button variant="link" className="w-fit px-0 text-left text-foreground flex items-center gap-3">
              {item.image && (
                <img src={`/storage/${item.image}`} alt={item.name} className="w-8 h-8 rounded-md object-cover" />
              )}
              {item.name}
            </Button>
          )}
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name} Details</DrawerTitle>
          <DrawerDescription>
            Update pricing details
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm mt-4">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Package / Session</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type / Duration</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Private Pool">Private Pool</SelectItem>
                    <SelectItem value="All Inclusive">All Inclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Short description..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <FacilitiesEditor facilities={facilities} setFacilities={setFacilities} />
            <div className="flex flex-col gap-3">
              <Label htmlFor="image">Image (Optional)</Label>
              {item.image && !image && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
                  <img src={`/storage/${item.image}`} alt={item.name} className="object-cover w-full h-full" />
                </div>
              )}
              {image && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
                  <img src={URL.createObjectURL(image)} alt="Preview" className="object-cover w-full h-full" />
                </div>
              )}
              <Input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button onClick={handleSave}>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function AddPricingDialog() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [type, setType] = React.useState("")
  const [status, setStatus] = React.useState("Active")
  const [price, setPrice] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [facilities, setFacilities] = React.useState<any[]>([])
  const [image, setImage] = React.useState<File | null>(null)

  const handleSave = () => {
    if (!name || !type || !price) {
      toast.error("Please complete all form fields!")
      return
    }

    router.post('/dashboard/pricing', {
      name,
      type,
      status,
      description,
      facilities: facilities.filter((f: any) => {
          if (typeof f === 'string') return f.trim() !== ''
          return f.name.trim() !== ''
      }),
      image,
      price: price.replace(/[^0-9]/g, '')
    }, {
      onSuccess: () => {
        toast.success("Pricing added successfully")
        setIsOpen(false)
        setName("")
        setType("")
        setPrice("")
        setDescription("")
        setFacilities([])
        setImage(null)
      },
      onError: (errors: any) => {
        if(errors.code) {
            toast.error(errors.code)
        } else {
            toast.error("Failed to add pricing")
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Add Price</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Price</DialogTitle>
          <DialogDescription>
            Enter the details for the new pricing here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-3">
            <Label htmlFor="new-name">Package / Session Name</Label>
            <Input id="new-name" placeholder="Villa Rental" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-type">Group Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="new-type" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Private Pool">Private Pool</SelectItem>
                  <SelectItem value="All Inclusive">All Inclusive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="new-status" className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="new-price">Price (Rp)</Label>
            <Input id="new-price" placeholder="1500000" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="new-desc">Description</Label>
            <Textarea id="new-desc" placeholder="Short description..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <FacilitiesEditor facilities={facilities} setFacilities={setFacilities} />
          <div className="flex flex-col gap-3">
            <Label htmlFor="new-image">Image</Label>
            {image && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
                <img src={URL.createObjectURL(image)} alt="Preview" className="object-cover w-full h-full" />
              </div>
            )}
            <Input id="new-image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleSave}>Save</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ActionMenu({ item }: { item: z.infer<typeof schema> }) {
  const [isEditOpen, setIsEditOpen] = React.useState(false)

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
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>View / Edit</DropdownMenuItem>
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
                  This action cannot be undone. This will permanently delete this pricing package.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  variant="destructive" 
                  onClick={() => {
                    router.delete(`/dashboard/pricing/${item.id}`, {
                      onSuccess: () => toast.success("Pricing deleted successfully.")
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

      <TableCellViewer item={item} open={isEditOpen} onOpenChange={setIsEditOpen} />
    </div>
  )
}
