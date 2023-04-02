import React, { useRef ,useEffect,useState} from 'react'
import { useReactToPrint } from "react-to-print";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Box, Container, Heading, Text, Image, StackDivider, VStack, HStack,Select,Stack,Button} from '@chakra-ui/react';
import axios from "axios"


const Marksheet = () => {


  const [myData,setMyData]=useState();

  useEffect(()=>{
    axios.get('http://localhost:5000/student/allstudents').then((res)=>
   setMyData(res.data))
  
  },[]);



    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });   


  return (
    <>
    <Container>
        <Heading m={"5"}>Student Marks View</Heading>
    </Container>
    {myData?.map((detail)=>{
   const {name,uid,ideation,execution,viva,theory,email,evaluated,assigned}=detail;
           
   return <div   key={uid}>
<Box ref={componentRef}>
<Card margin={"5"}>
  <CardHeader>
    <Heading size='md'>Name : {name}</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
        UID:{uid}
        </Heading>
        <Text pt='2' fontSize='sm'>
          Ideation Marks : {ideation} <br></br>
          Execution Marks : {execution}<br></br>
          Viva Marks : {execution}<br></br>
          Theory Marks : {execution}<br></br>

        </Text>
      </Box>
     
    </Stack>
  </CardBody>
</Card>

</Box>
    </div>


})}
    

<Button onClick={handlePrint} className="print__button" colorScheme='purple' variant={"outline"} m={"5"}>  Print </Button>
</>
  )
}

export default Marksheet;
