'use client';  // Add this to mark it as a Client Component

import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';  // Correct the Sidebar import
import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from 'primereact/menuitem';
import '../app/panel-menu.css';
import { UserButton } from '@clerk/nextjs';

const Sidebar = () => {
    const [visible, setVisible] = useState(false);
    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => window.location.href = '/' // Always available
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-th-large', // Change to a more appropriate icon
            items: [
                {
                    label: 'Overview',
                    icon: 'pi pi-chart-line',
                    command: () => window.location.href = '/dashboard',
                }
            ],
        },
        {
            label: 'ThreeJS',
            icon: 'pi pi-cog',
            items: [
                {
                    label: 'Project1',
                    icon: 'pi pi-briefcase',
                    command: () => window.location.href = '/project1',
                },
                {
                    label: 'Project2',
                    icon: 'pi pi-briefcase',
                    command: () => window.location.href = '/project2',
                },
            ]
        },        
        {
            label: 'Reports',
            icon: 'pi pi-chart-bar',
            items: [
                {
                    label: 'Sales Reports',
                    icon: 'pi pi-file',
                    items: [{ label: 'Monthly Sales' }, { label: 'Yearly Sales' }]
                },
                {
                    label: 'User Activity',
                    icon: 'pi pi-users',
                    items: [{ label: 'User Logins' }, { label: 'User Actions' }]
                }
            ]
        },
        {
            label: 'User Management',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'Manage Users',
                    icon: 'pi pi-users',
                    items: [{ label: 'Add User' }, { label: 'Remove User' }]
                },
                {
                    label: 'Roles & Permissions',
                    icon: 'pi pi-lock',
                    items: [{ label: 'Manage Roles' }]
                }
            ]
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            items: [
                { label: 'General Settings', icon: 'pi pi-sliders-h' },
                { label: 'Account Settings', icon: 'pi pi-user-edit' },
                { label: 'API Settings', icon: 'pi pi-key' }
            ]
        },
        {
            label: 'Help & Support',
            icon: 'pi pi-question-circle',
            items: [
                { label: 'Documentation', icon: 'pi pi-book' },
                { label: 'Contact Support', icon: 'pi pi-envelope' }
            ]
        },
    ];

    return (
        <div className="flex justify-content-between h-auto p-3 sidebar-bg">
            <PrimeSidebar
                visible={visible}
                onHide={() => setVisible(false)}
            >
                <div className="flex relative lg:static surface-ground">
                    <PanelMenu model={items} className="w-full md:w-20rem" />
                </div>
            </PrimeSidebar>
            <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
            <UserButton />
        </div>
    );
};

export default Sidebar;
