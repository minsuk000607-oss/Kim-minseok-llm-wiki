import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '김민석 LLM Wiki',
  description: 'Korean medicine and neuroscience knowledge operating system.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
