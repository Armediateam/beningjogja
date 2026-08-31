"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData: any[] = [];

const chartConfig = {
  villa: {
    label: "Villa",
    color: "var(--chart-1)",
  },
  pool: {
    label: "Private Pool",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function AnalyticRevenueBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendapatan Bulanan</CardTitle>
        <CardDescription>Tahun 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="villa" fill="var(--color-villa)" radius={4} />
            <Bar dataKey="pool" fill="var(--color-pool)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Pendapatan naik 5.2% bulan ini <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan total pendapatan untuk Villa dan Private Pool
        </div>
      </CardFooter>
    </Card>
  )
}
