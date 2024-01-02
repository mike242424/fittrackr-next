import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import NavBar from './NavBar';

const inter = Roboto({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Fittrackr App',
  description: 'Fittrackr - Your Personal Fitness Tracker',
  icons: {
    icon: '/icon.png',
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="p-6 text-white">{children}</main>
      </body>
    </html>
  );
};

export default layout;
