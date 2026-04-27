import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';


import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "FundHope - Crowdfunding Platform",
  description: "Empowering people to help people. Start a fundraiser or donate to a cause you care about.",
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
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
