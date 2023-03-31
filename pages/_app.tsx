import Nav from '@/features/nav/Nav';
import { SupabaseProvider } from '@/features/supabase/useSupabase';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SupabaseProvider initialSession={pageProps.initialSession}>
        <Nav />
        <Component {...pageProps} />
      </SupabaseProvider>
    </ChakraProvider>
  );
}
