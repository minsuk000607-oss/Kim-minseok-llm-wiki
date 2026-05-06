import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';
import { BackgroundNetworkPattern } from '@/components/BackgroundNetworkPattern';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <BackgroundNetworkPattern />
        <div className="shell">
          <aside className="sidebar">
            <h2>LLM Wiki</h2>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/search">Search</Link>
            </nav>
          </aside>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
