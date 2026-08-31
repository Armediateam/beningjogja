import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { SectionCards } from '@/components/section-card';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';

export default function Dashboard({ stats, chartData }: { stats: any, chartData: any }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards stats={stats} />
                        <ChartAreaInteractive chartData={chartData} />
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
