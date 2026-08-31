import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ stats }: { stats?: any }) {
  const currentStats = stats || {
    revenue: 0,
    reservations: 0,
    newCustomers: 0,
    occupancy: 0,
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pendapatan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(currentStats.revenue)}
          </CardTitle>
          <div>
            <Badge variant="outline">
              <IconTrendingUp />
              +15.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Meningkat bulan ini <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Pendapatan 6 bulan terakhir
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Reservasi</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {currentStats.reservations}
          </CardTitle>
          <div>
            <Badge variant="outline">
              <IconTrendingUp />
              +12%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Stabil bulan ini <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Bening Villa & Private Pool
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pelanggan Baru</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {currentStats.newCustomers}
          </CardTitle>
          <div>
            <Badge variant="outline">
              <IconTrendingDown />
              -5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Turun 5% periode ini <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Butuh promosi lebih lanjut</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tingkat Hunian (Occupancy)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {currentStats.occupancy}%
          </CardTitle>
          <div>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Melebihi target bulanan <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Sangat baik di musim liburan</div>
        </CardFooter>
      </Card>
    </div>
  )
}
