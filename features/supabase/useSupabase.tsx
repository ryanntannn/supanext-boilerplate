import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  SessionContextProvider,
  SessionContextProviderProps,
} from '@supabase/auth-helpers-react';
import { PropsWithChildren, useState } from 'react';

export const SupabaseProvider = ({
  children,
  ...props
}: PropsWithChildren<Omit<SessionContextProviderProps, 'supabaseClient'>>) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
};
