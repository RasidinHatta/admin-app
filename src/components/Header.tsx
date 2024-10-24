import { auth } from '@clerk/nextjs/server';
import HeaderClient from './HeaderClient'; // Adjust the import path based on your project structure

export default async function Header() {
    const { userId } = await auth(); // Server-side authentication

    return <HeaderClient userId={userId} />;
}
