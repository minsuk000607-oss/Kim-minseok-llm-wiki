import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'LLM Wiki OS',
  description: 'Second brain knowledge network'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="app-shell">
          <Sidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
