import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { MessageDataTable } from '@/components/message-table';

interface Message {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
}

export default function Messages({ messages }: { messages: Message[] }) {
    return (
        <>
            <Head title="Inbox" />

            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Inbox (Contact Us)</h1>
                            <p className="text-muted-foreground mt-1">
                                Manage incoming messages from the website.
                            </p>
                        </div>
                        
                        <div className="mt-4">
                            <MessageDataTable data={messages} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

Messages.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Inbox',
            href: '/dashboard/messages',
        },
    ],
};
