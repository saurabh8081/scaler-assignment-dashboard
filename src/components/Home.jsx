import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Image,
  StackDivider,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import axios  from 'axios';
import React,{useEffect,useState} from 'react';

const headingOptions = {
  pos: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  textTransform: 'uppercase',
  p: '4',
  size: '4xl',
};

const Home = () => {
    
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5000/unassignedStudents")
      .then((result) => {
        console.log(result.data);
        setPosts(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {/* teacher details box */}
      <Box>
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="outline"
          m={'20'}
        >
          <Image
            objectFit="cover"
            maxW={{ base: '100%', sm: '200px' }}
            src="https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1"
          />

          <Stack>
            <CardBody>
              <Heading size="md">The perfect latte</Heading>
              <Text py="2">
                Caffè latte is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Buy Latte
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Box>

      {/* students box */}
      <HStack justifyContent="center" marginTop={'15'}>
        <Heading colorScheme="purple">STUDENT ASSIGNED</Heading>
      </HStack>
      <Container>
        <Card marginLeft={'50'} marginTop={'20'} w={'50'}>
          <CardHeader display="flex" alignItems="center">
            <Heading size="md">{posts.name}</Heading>
            <Spacer />
            <Button colorScheme="teal" size="xs">
              Remove
            </Button>
          </CardHeader>

          {/* students details box */}
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Home;
