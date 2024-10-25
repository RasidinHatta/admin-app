// pages/Project1.js
import { Card } from 'primereact/card';
import React from 'react';
import ThreeBasic from '@/components/three/basic';

function Page() {
    return (
        <div className="container mx-auto p-4" style={{ height: '100vh' }}> {/* Full viewport height */}
            <Card title="Welcome to ThreeJS Basic Project" className="h-full w-full mb-4"> {/* Full height and width */}
                <ThreeBasic />
            </Card>
        </div>
    );
}

export default Page;
