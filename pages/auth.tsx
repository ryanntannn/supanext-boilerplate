import { Box, Center } from '@chakra-ui/react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <Center>
      <Box minWidth={400}>
        <Auth
          supabaseClient={supabase}
          theme="default"
          providers={[]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'black',
                  brandAccent: 'black',
                },
              },
            },
          }}
          redirectTo="/"
        />
      </Box>
    </Center>
  );
}
