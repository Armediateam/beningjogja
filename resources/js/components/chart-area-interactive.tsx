"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "Statistik Reservasi Bening Villa & Pool"

const chartData = [
  { date: "2024-04-01", villa: 2, pool: 5 },
  { date: "2024-04-02", villa: 1, pool: 8 },
  { date: "2024-04-03", villa: 1, pool: 2 },
  { date: "2024-04-04", villa: 2, pool: 6 },
  { date: "2024-04-05", villa: 3, pool: 9 },
  { date: "2024-04-06", villa: 3, pool: 12 },
  { date: "2024-04-07", villa: 2, pool: 8 },
  { date: "2024-04-08", villa: 4, pool: 10 },
  { date: "2024-04-09", villa: 1, pool: 3 },
  { date: "2024-04-10", villa: 2, pool: 5 },
  { date: "2024-04-11", villa: 3, pool: 11 },
  { date: "2024-04-12", villa: 2, pool: 7 },
  { date: "2024-04-13", villa: 3, pool: 12 },
  { date: "2024-04-14", villa: 1, pool: 8 },
  { date: "2024-04-15", villa: 1, pool: 7 },
  { date: "2024-04-16", villa: 1, pool: 9 },
  { date: "2024-04-17", villa: 4, pool: 14 },
  { date: "2024-04-18", villa: 3, pool: 15 },
  { date: "2024-04-19", villa: 2, pool: 8 },
  { date: "2024-04-20", villa: 1, pool: 5 },
  { date: "2024-04-21", villa: 1, pool: 6 },
  { date: "2024-04-22", villa: 2, pool: 7 },
  { date: "2024-04-23", villa: 1, pool: 8 },
  { date: "2024-04-24", villa: 3, pool: 9 },
  { date: "2024-04-25", villa: 2, pool: 8 },
  { date: "2024-04-26", villa: 1, pool: 5 },
  { date: "2024-04-27", villa: 3, pool: 14 },
  { date: "2024-04-28", villa: 1, pool: 8 },
  { date: "2024-04-29", villa: 3, pool: 9 },
  { date: "2024-04-30", villa: 4, pool: 12 },
  { date: "2024-05-01", villa: 1, pool: 8 },
  { date: "2024-05-02", villa: 2, pool: 11 },
  { date: "2024-05-03", villa: 2, pool: 9 },
  { date: "2024-05-04", villa: 3, pool: 14 },
  { date: "2024-05-05", villa: 4, pool: 13 },
  { date: "2024-05-06", villa: 4, pool: 15 },
  { date: "2024-05-07", villa: 3, pool: 10 },
  { date: "2024-05-08", villa: 1, pool: 7 },
  { date: "2024-05-09", villa: 2, pool: 8 },
  { date: "2024-05-10", villa: 2, pool: 11 },
  { date: "2024-05-11", villa: 3, pool: 9 },
  { date: "2024-05-12", villa: 1, pool: 8 },
  { date: "2024-05-13", villa: 1, pool: 6 },
  { date: "2024-05-14", villa: 4, pool: 15 },
  { date: "2024-05-15", villa: 4, pool: 12 },
  { date: "2024-05-16", villa: 3, pool: 14 },
  { date: "2024-05-17", villa: 4, pool: 14 },
  { date: "2024-05-18", villa: 3, pool: 11 },
  { date: "2024-05-19", villa: 2, pool: 8 },
  { date: "2024-05-20", villa: 1, pool: 7 },
  { date: "2024-05-21", villa: 1, pool: 5 },
  { date: "2024-05-22", villa: 1, pool: 4 },
  { date: "2024-05-23", villa: 2, pool: 9 },
  { date: "2024-05-24", villa: 2, pool: 8 },
  { date: "2024-05-25", villa: 2, pool: 8 },
  { date: "2024-05-26", villa: 2, pool: 7 },
  { date: "2024-05-27", villa: 4, pool: 15 },
  { date: "2024-05-28", villa: 2, pool: 9 },
  { date: "2024-05-29", villa: 1, pool: 5 },
  { date: "2024-05-30", villa: 3, pool: 10 },
  { date: "2024-05-31", villa: 1, pool: 8 },
  { date: "2024-06-01", villa: 1, pool: 7 },
  { date: "2024-06-02", villa: 4, pool: 14 },
  { date: "2024-06-03", villa: 1, pool: 6 },
  { date: "2024-06-04", villa: 4, pool: 12 },
  { date: "2024-06-05", villa: 1, pool: 5 },
  { date: "2024-06-06", villa: 2, pool: 9 },
  { date: "2024-06-07", villa: 3, pool: 11 },
  { date: "2024-06-08", villa: 3, pool: 10 },
  { date: "2024-06-09", villa: 4, pool: 15 },
  { date: "2024-06-10", villa: 1, pool: 8 },
  { date: "2024-06-11", villa: 1, pool: 6 },
  { date: "2024-06-12", villa: 4, pool: 14 },
  { date: "2024-06-13", villa: 1, pool: 5 },
  { date: "2024-06-14", villa: 4, pool: 12 },
  { date: "2024-06-15", villa: 3, pool: 11 },
  { date: "2024-06-16", villa: 3, pool: 10 },
  { date: "2024-06-17", villa: 4, pool: 15 },
  { date: "2024-06-18", villa: 1, pool: 7 },
  { date: "2024-06-19", villa: 3, pool: 9 },
  { date: "2024-06-20", villa: 4, pool: 14 },
  { date: "2024-06-21", villa: 1, pool: 8 },
  { date: "2024-06-22", villa: 3, pool: 9 },
  { date: "2024-06-23", villa: 4, pool: 15 },
  { date: "2024-06-24", villa: 1, pool: 8 },
  { date: "2024-06-25", villa: 1, pool: 7 },
  { date: "2024-06-26", villa: 4, pool: 12 },
  { date: "2024-06-27", villa: 4, pool: 15 },
  { date: "2024-06-28", villa: 1, pool: 8 },
  { date: "2024-06-29", villa: 1, pool: 6 },
  { date: "2024-06-30", villa: 4, pool: 13 },
]

const chartConfig = {
  visitors: {
    label: "Reservasi",
  },
  villa: {
    label: "Villa",
    color: "var(--chart-1)",
  },
  pool: {
    label: "Private Pool",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Statistik Reservasi</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total reservasi 3 bulan terakhir
          </span>
          <span className="@[540px]/card:hidden">3 bulan terakhir</span>
        </CardDescription>
        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 Bulan Terakhir</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 Hari Terakhir</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 Hari Terakhir</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="3 Bulan Terakhir" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 Bulan Terakhir
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30 Hari Terakhir
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7 Hari Terakhir
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillVilla" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-villa)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-villa)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPool" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pool)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pool)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value as string).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="pool"
              type="natural"
              fill="url(#fillPool)"
              stroke="var(--color-pool)"
              stackId="a"
            />
            <Area
              dataKey="villa"
              type="natural"
              fill="url(#fillVilla)"
              stroke="var(--color-villa)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
