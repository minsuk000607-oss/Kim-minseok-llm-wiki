import './globals.css';
import { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { BackgroundNetworkPattern } from '@/components/BackgroundNetworkPattern';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="layout">
          <Sidebar />
          <main className="main">
            <BackgroundNetworkPattern />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
