// pages/Project1.js
import { Card } from 'primereact/card';
import { auth } from "@clerk/nextjs/server";
import React from 'react';
import ThreeScene from '@/components/three/ThreeScene';

async function Page() {
    const { userId } = await auth();

    if (!userId) {
        return <div>You are not logged in</div>;
    }

    return (
        <div className="container mx-auto p-4" style={{ height: '100vh' }}> {/* Full viewport height */}
            <Card title="Welcome to Project1" className="h-full w-full mb-4"> {/* Full height and width */}
                <ThreeScene />
            </Card>
        </div>
    );
}

export default Page;
