import { auth, currentUser } from "@clerk/nextjs/server";
import { Card } from 'primereact/card'; // Import Card from PrimeReact

async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        return <div>You are not logged in</div>;
    }

    const user = await currentUser();

    return (
        <div className="container mx-auto p-4">
            <Card title="Welcome to Your Dashboard" className="mb-4">
                <div className="font-bold mt-10">Dashboard Page</div>
                <span>{user?.firstName}</span>
            </Card>

            <Card title="Recent Activities" className="mb-4">
                <ul>
                    <li>Logged in on {new Date().toLocaleString()}</li>
                    <li>Completed profile setup</li>
                    <li>Updated settings</li>
                </ul>
            </Card>
        </div>
    );
}

export default DashboardPage;
