import { Container, Flex, Link, SimpleGrid, Text, Box, Image, Button } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NextLink from 'next/link'
import React from 'react'
import { LocalFaucetButton } from '../LocalFaucetButton'
import { Head, MetaProps } from './Head'

interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

export const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <Container maxWidth="container.xl">
          <SimpleGrid
            columns={[1, 1, 1, 2]}
            alignItems="center"
            justifyContent="space-between"
            py="8"
            // boxShadow="0px 2px 60px 0px rgba(0, 0, 0, 0.16)"
            // bg="green.500"
          >
            <Flex py={[4, null, null, 0]}>
              <Box mr="4">
                <Image style={{maxHeight: 40}} src="./logo.png" alt="Mocha Logo" />
              </Box>
              <Text fontSize="xl" color="green">Mocha</Text>
              <NextLink href="/" passHref legacyBehavior>
                <Link px="4" py="1" color="green">
                  Home
                </Link>
              </NextLink>
              <NextLink href="/nft" passHref legacyBehavior>
                <Link px="4" py="1" color="green">
                  For Projects
                </Link>
              </NextLink>
              <NextLink href="/token-gated" passHref legacyBehavior>
                <Link px="4" py="1" color="green">
                  For Individuals
                </Link>
              </NextLink>
              <NextLink href="/token-gated" passHref legacyBehavior>
                <Link px="4" py="1" color="green">
                  Blog
                </Link>
              </NextLink>
              <NextLink href="/token-gated" passHref legacyBehavior>
                <Link px="4" py="1" color="green">
                  Contact
                </Link>
              </NextLink>
            </Flex>
            <Flex
               order={[-1, null, null, 2]}
               alignItems={'center'}
               justifyContent={['flex-start', null, null, 'flex-end']}
>             
              <Button bg="white" border="1px solid green" mr="4">
                Charity Login
              </Button>
              <ConnectButton
                label={"Connect Wallet to Donate"}
                chainStatus={"none"}
                
                showBalance={false}
                
                accountStatus="avatar"
               />
            </Flex>
          </SimpleGrid>
        </Container>
      </header>
      <main>
        <Container maxWidth="container.xl">{children}</Container>
      </main>
      <footer>
        <Container mt="8" py="8" maxWidth="container.xl">
          <Text mb="4">
            Built by Team Mocha
          </Text>
          
        </Container>
      </footer>
    </>
  )
}
