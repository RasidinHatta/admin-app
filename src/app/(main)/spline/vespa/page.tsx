import Vespa from '@/components/spline/vespa'
import { Card } from 'primereact/card'
import React from 'react'

const page = () => {
    return (
        <div className="container mx-auto p-4">
            <Card title="Welcome to Spline" className="mb-4">
                <Vespa />
            </Card>
        </div>
    )
}

export default page