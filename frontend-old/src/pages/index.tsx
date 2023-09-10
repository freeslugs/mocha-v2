import { Text, Button, Link } from '@chakra-ui/react'

import { Navbar } from '../components/navbar'
import { Hero } from '../components/core/Hero'
import { Core } from '../components/core'
import { Footer } from '../components/footer/index'
import { Container } from '../components/Container'
//https://wagmi.sh/react/hooks/useAccount

const Index = () => {
  

  return (
    <Container height="100vh">
      <Navbar />
      <Hero />
      <Core />
      <Footer>
        <Text color="text">footer</Text>
      </Footer>
    </Container>
  )
}
export default Index