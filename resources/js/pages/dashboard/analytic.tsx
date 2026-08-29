import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { AnalyticRevenueBar } from '@/components/analytic-revenue-bar';
import { AnalyticBookingsPie } from '@/components/analytic-bookings-pie';
import { AnalyticTargetRadial } from '@/components/analytic-target-radial';
import { AnalyticBookingSource } from '@/components/analytic-booking-source';
import { AnalyticSatisfactionRadar } from '@/components/analytic-satisfaction-radar';

export default function AnalyticContent() {
    return (
        <>
            <Head title="Analytics" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Analytics & Laporan</h1>
                            <p className="text-muted-foreground mt-1">
                                Pantau performa bisnis, tren reservasi, dan kepuasan pelanggan Bening Villa & Private Pool.
                            </p>
                        </div>

                        {/* Row 1: Tren Reservasi (Span 2) + Target Pendapatan (Span 1) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="md:col-span-2">
                                <ChartAreaInteractive />
                            </div>
                            <div className="md:col-span-1">
                                <AnalyticTargetRadial />
                            </div>
                        </div>

                        {/* Row 2: Sumber Booking, Kepuasan Pelanggan, Distribusi Layanan */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <AnalyticBookingSource />
                            <AnalyticSatisfactionRadar />
                            <AnalyticBookingsPie />
                        </div>

                        {/* Row 3: Pendapatan Bulanan */}
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            <AnalyticRevenueBar />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

AnalyticContent.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Analytic',
            href: '/dashboard/analytic',
        },
    ],
};
