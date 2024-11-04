import Sidebar from '@/components/Sidebar';
import { auth } from "@clerk/nextjs/server";
export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth();

    if (!userId) {
        return <div>You are not logged in</div>;
    }
    return (
        <div>
            <Sidebar />
            {children}
        </div>
    )
}