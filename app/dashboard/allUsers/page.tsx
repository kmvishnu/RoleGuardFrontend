import Table from '@/app/dashboard/allUsers/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invoices',
};


export default async function Page() {


    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>All Users</h1>
            </div>
           
            <Suspense>
                <Table />
            </Suspense>
           
        </div>
    );
}