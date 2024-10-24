'use client';  // This marks it as a Client Component

import React from 'react';
import { MegaMenu } from 'primereact/megamenu';
import { UserButton } from '@clerk/nextjs';
import { Button } from 'primereact/button';

const HeaderClient = ({ userId }: { userId: string | null }) => {
    // Define the menu items based on user authentication status
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => window.location.href = '/' // Always available
        },
        ...(userId ? [  // Only show Dashboard if the user is logged in
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-th-large', // Change to a more appropriate icon
                command: () => window.location.href = '/dashboard',
            }
        ] : [])
    ];

    // If user is logged in, show UserButton; otherwise, show Sign Up / Sign In
    const end = userId ? (
        <UserButton />
    ) : (
        <div className="flex gap-2">
            <Button
                label="Sign Up"
                onClick={() => window.location.href = '/sign-up'}
                className="p-button"
            />
            <Button
                label="Sign In"
                onClick={() => window.location.href = '/sign-in'}
                className="p-button"
            />
        </div>
    );

    return (
        <div className="text-neutral-100 p-3">
            <MegaMenu model={items} orientation="horizontal" end={end} className='pl-20 gap-10 h-auto' />
        </div>
    );
};

export default HeaderClient;
