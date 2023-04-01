import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Box, Container, Heading, Stack, Text, Image, StackDivider, VStack, HStack, Button } from '@chakra-ui/react';
import React from 'react'

const AddRemoveStudent = () => {
  return (
    <>
<Box>
<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>The perfect latte</Heading>

      <Text py='2'>
        Caffè latte is a coffee beverage of Italian origin made with espresso
        and steamed milk.
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Buy Latte
      </Button>
    </CardFooter>
  </Stack>
</Card>
</Box>
    </>
  )
}

export default AddRemoveStudent
