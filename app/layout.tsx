
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ResourceProvider } from '@/context/ResourceContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Construction Management Dashboard',
    description: 'An interactive dashboard for tracking construction project progress, resource allocation, and budget management.',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ResourceProvider>
                    {children}
                </ResourceProvider>
            </body>
        </html>
    );
}
