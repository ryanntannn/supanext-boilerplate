import { PropsWithChildren, ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav({ children }: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  return (
    <>
      <Box bg={useColorModeValue('white', 'black')} px={8} py={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Link href="/">
                <Image src="/med.png" alt="logo" width={90} height={90} />
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {children}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {!session && (
              <Button onClick={() => router.push('/auth')}>Sign-in</Button>
            )}
            {session && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar size={'sm'} bgColor="gray.200" />
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => supabase.auth.signOut()}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {children}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
