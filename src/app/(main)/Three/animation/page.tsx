// pages/Project1.js
import { Card } from 'primereact/card';
import React from 'react';
import ThreeAnimation from '@/components/three/animation';

function Page() {
    return (
        <div className="container mx-auto p-4" style={{ height: '100vh' }}> {/* Full viewport height */}
            <Card title="Welcome to ThreeJS Animation Project" className="h-full w-full mb-4"> {/* Full height and width */}
                <ThreeAnimation />
            </Card>
        </div>
    );
}

export default Page;
