import { Card, CardHeader, CardBody, CardFooter,useToast } from '@chakra-ui/react'
import { Box, Container, Heading, Stack, Text, Image, StackDivider, VStack, HStack } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import axios  from 'axios';
import React,{useEffect,useState} from 'react';

const AddRemoveStudent = () => {
  const [myData,setMyData]=useState();
  const toast = useToast();

  useEffect(()=>{
    axios.get('http://localhost:5000/student/unassignedStudents').then((res)=>
    setMyData(res.data));
  },[]);

  const  assignStudent = async (email, uid) => {
    console.log(email,uid);
    email="sumit@gmail.com";
   await axios.post('http://localhost:5000/teacher/assignStudent', { email, uid })
      .then(res => {
        console.log(res.data);
        toast({
          title: "Student assigned successfully",
          status: "success",
          position: "top",
          colorScheme:"purple",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(err => {
        console.error(err);
        // TODO: handle error response
      });
  }

  return (
    <>
      {/* add remove Students */}
      <Container>
        <Heading m={"10"}>Add Students</Heading>
      </Container>

      {myData?.map((detail)=>{
        const {name,uid,ideation,execution,viva,theory,email,evaluated,assigned}=detail;

        return (
          <div key={uid}>
            <Box>
              <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                m={"20"}
              >
                <Image
                  objectFit='cover'
                  maxW={{ base: '100%', sm: '200px' }}
                  src='https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1'
                />

                <Stack>
                  <CardBody>
                    <Heading size='md'>Name: {name}</Heading>
                    <Text py='2'>
                    E-Mail: {email}
                    </Text>
                    <Text py='2'>
                    UID:{uid}
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <Button
                      variant='solid'
                      colorScheme='blue'
                      onClick={() =>  assignStudent(email, uid)}
                    >
                      ASSIGN
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            </Box>
          </div>
        )
      })}
    </>
  )
}

export default AddRemoveStudent
