"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
  bookings: {
    label: "Reservasi",
  },
  whatsapp: {
    label: "WhatsApp",
    color: "var(--chart-1)",
  },
  website: {
    label: "Website",
    color: "var(--chart-2)",
  },
  instagram: {
    label: "Instagram",
    color: "var(--chart-3)",
  },
  traveloka: {
    label: "Traveloka",
    color: "var(--chart-4)",
  },
  tiket: {
    label: "Tiket.com",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function AnalyticBookingSource() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sumber Reservasi</CardTitle>
        <CardDescription>Platform pemesanan terbanyak</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" dataKey="bookings" hide />
            <XAxis
              dataKey="source"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="bookings"
              radius={4}
            >
              <LabelList
                dataKey="source"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="bookings"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm pt-4">
        <div className="flex gap-2 font-medium leading-none">
          WhatsApp paling diminati <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menunjukkan mayoritas reservasi dilakukan secara direct (langsung).
        </div>
      </CardFooter>
    </Card>
  )
}
