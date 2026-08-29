"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
  { subject: "Kebersihan", score: 95 },
  { subject: "Fasilitas", score: 88 },
  { subject: "Pelayanan", score: 92 },
  { subject: "Lokasi", score: 85 },
  { subject: "Harga", score: 90 },
  { subject: "Kenyamanan", score: 96 },
]

const chartConfig = {
  score: {
    label: "Skor Kepuasan",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function AnalyticSatisfactionRadar() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Kepuasan Pelanggan</CardTitle>
        <CardDescription>
          Rata-rata penilaian (Skala 1-100)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="subject" />
            <PolarGrid />
            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="flex items-center gap-2 font-medium leading-none">
          Kenyamanan & Kebersihan tertinggi <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Berdasarkan 245 ulasan pelanggan.
        </div>
      </CardFooter>
    </Card>
  )
}
