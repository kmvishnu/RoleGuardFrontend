import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Providers from './redux/Provider';

export const metadata: Metadata = {
  title: {
    template: '%s | RoleGuard Dashboard',
    default: 'RoleGuard Dashboard',
  },
  description: 'UserManagement website',
  metadataBase: new URL('https://kmvishnu.netlify.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
} 