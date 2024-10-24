import Sidebar from '@/components/Sidebar';
export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body>
                <Sidebar />
                {children}
            </body>
        </html>
    )
}