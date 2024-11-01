import {
  ClerkProvider,
} from '@clerk/nextjs'
import { PrimeReactProvider } from 'primereact/api';
import '../../public/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../../styles/layout/layout.scss';
import '../../styles/demo/Demos.scss';
import './globals.css';
import Spline from '@splinetool/react-spline';

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
            <Spline
              scene="https://prod.spline.design/xBvhYrO2Tn9uIiJH/scene.splinecode"
              className="absolute top-0 left-0 w-full h-full border-none -z-20"
            />
            <div>
              {children}
            </div>
          </ClerkProvider>
        </PrimeReactProvider>
      </body>
    </html>
  )
}