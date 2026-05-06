import { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { BackgroundNetworkPattern } from '../components/BackgroundNetworkPattern';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'sans-serif', color: '#e5e7eb' }}>
        <BackgroundNetworkPattern />
        <div style={{ display: 'flex', gap: 16, padding: 16 }}>
          <Sidebar />
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
