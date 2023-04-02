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
  const [assignedStudents, setAssignedStudents] = useState([]);

  const fetchAssignedStudents = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/assignedStudents', { email });
      setAssignedStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchAssignedStudents("sumit@gmail.com");
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
              <Heading size="md">sumit</Heading>
              <Text py="2">
              sumit@gmail.com
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
               Add Student
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
      <HStack justifyContent="center" marginTop={'15'}>
        <Heading colorScheme="purple">STUDENT ASSIGNED</Heading>
      </HStack>
      {
       assignedStudents?.map((detail)=>{
         const {name,uid,ideation,execution,viva,theory,email,evaluated,assigned}=detail;
           
         return <div   key={uid}>
              

      {/* students box */}
      
      <Container>
        <Card marginLeft={'50'} marginTop={'20'} w={'50'}>
          <CardHeader display="flex" alignItems="center">
            <Heading size="md">{name}</Heading>
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
                  UID :
                </Heading>
                <Text pt="2" fontSize="sm">
                 {uid}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                 E-mail:
                </Heading>
                <Text pt="2" fontSize="sm">
                 {email}
                </Text>
              </Box>
              
            </Stack>
          </CardBody>
        </Card>
      </Container>
         </div>

        })
      }
      
      
    </>
  );
};

export default Home;