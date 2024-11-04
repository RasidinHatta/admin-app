/* eslint-disable @next/next/no-img-element */
import { currentUser } from "@clerk/nextjs/server";
import { Card } from 'primereact/card'; // Import Card from PrimeReact

async function DashboardPage() {
    const user = await currentUser();
    console.log(user);
    return (
        <div className="container mx-auto p-4">
            <Card title="Welcome to Your Dashboard" className="mb-4">
                <div className="font-bold mt-10">Dashboard Page</div>
                <span>{user?.firstName}</span>
            </Card>

            <Card title="Recent Activities" className="mb-4">
                <div>Hello, {user?.username} welcome to Clerk</div>
                <div>Email:  {user?.emailAddresses[0].emailAddress} </div>
            </Card>
        </div>
    );
}

export default DashboardPage;
