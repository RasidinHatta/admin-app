// pages/Project1.js
import { Card } from 'primereact/card';
import { auth } from "@clerk/nextjs/server";
import React from 'react';
import ThreeScene from '@/components/ThreeScene';

async function Project1() {
    const { userId } = await auth();

    if (!userId) {
        return <div>You are not logged in</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Card title="Welcome to Project1" className="mb-4" style={{ width: '100%', height: '500px' }}> {/* Set a height for the Card */}
                <ThreeScene />
            </Card>
        </div>
    );
}

export default Project1;
