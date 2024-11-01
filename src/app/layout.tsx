import {
  ClerkProvider,
} from '@clerk/nextjs'
import { PrimeReactProvider } from 'primereact/api';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../../public/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../../styles/layout/layout.scss';
import '../../styles/demo/Demos.scss';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <PrimeReactProvider>
          <ClerkProvider>
            {children}
            <SpeedInsights />
          </ClerkProvider>
        </PrimeReactProvider>
      </body>
    </html>
  )
}