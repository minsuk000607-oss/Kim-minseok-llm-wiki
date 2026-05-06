import { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { BackgroundNetworkPattern } from '../components/BackgroundNetworkPattern';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <BackgroundNetworkPattern />
        <div className="layout">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
