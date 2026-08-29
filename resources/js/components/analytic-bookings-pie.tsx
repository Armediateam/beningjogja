"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

const chartData = [
  { category: "Villa", visitors: 275, fill: "var(--color-villa)" },
  { category: "Pool Pagi", visitors: 200, fill: "var(--color-poolPagi)" },
  { category: "Pool Siang", visitors: 187, fill: "var(--color-poolSiang)" },
  { category: "Pool Malam", visitors: 173, fill: "var(--color-poolMalam)" },
  { category: "Pool Full", visitors: 90, fill: "var(--color-poolFull)" },
]

const chartConfig = {
  visitors: {
    label: "Reservasi",
  },
  villa: {
    label: "Villa",
    color: "var(--chart-1)",
  },
  poolPagi: {
    label: "Pool Pagi",
    color: "var(--chart-2)",
  },
  poolSiang: {
    label: "Pool Siang",
    color: "var(--chart-3)",
  },
  poolMalam: {
    label: "Pool Malam",
    color: "var(--chart-4)",
  },
  poolFull: {
    label: "Pool Full Day",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function AnalyticBookingsPie() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribusi Layanan</CardTitle>
        <CardDescription>Berdasarkan Total Reservasi</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Reservasi
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Villa mendominasi 30% dari total <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Sesi siang untuk Private Pool juga cukup populer.
        </div>
      </CardFooter>
    </Card>
  )
}
