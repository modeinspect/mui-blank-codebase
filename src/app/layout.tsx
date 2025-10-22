import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { AppProvider } from './context/AppContext';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Wanderbnb - Vacation Rentals & Unique Stays",
  description: "Find the perfect vacation rental with Wanderbnb",
};

 export default function RootLayout(props: { children: React.ReactNode }) {
   return (
     <html lang="en">
       <body
        className={`${roboto.variable} antialiased`}
      >
        <AppRouterCacheProvider options={{
          enableCssLayer: true,
        }}>
          <ThemeProvider theme={theme}>
            <AppProvider>
              {props.children}
            </AppProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
