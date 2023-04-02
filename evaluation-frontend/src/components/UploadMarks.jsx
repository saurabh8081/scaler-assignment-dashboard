import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Flex,
  Spacer
} from '@chakra-ui/react';
import axios from "axios"

const UploadMarks = () => {
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [selectedUid, setSelectedUid] = useState(null);
  const [marks, setMarks] = useState({
    Ideation: '',
    Execution: '',
    Theory: '',
    Viva: '',
  });

  const toast = useToast();

  const fetchAssignedStudents = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/teacher/unevaluatedStudents', { email });
      setAssignedStudents(response.data);
      if (response.data.length > 0) {
        setSelectedUid(response.data[0].uid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUidChange = (event) => {
    setSelectedUid(event.target.value);
  };

  const handleMarksChange = (event) => {
    const { name, value } = event.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(marks);
    console.log(selectedUid);
    try {
      const { Ideation, Execution,Theory,Viva } = marks;
      const response = await axios.post('http://localhost:5000/teacher/evaluateStudent', {
        email: "sumit@gmail.com",
        uid: selectedUid,
        ideation: Ideation,
        execution: Execution,
        viva: Theory,
        theory: Viva,
      });
      console.log(response.data);
      // Show success message to the user
      toast({
        title: "Marks uploaded successfully",
        status: "success",
        position: "top",
        colorScheme: "purple",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      // Show error message to the user
    }
  };
  const handleFinalSubmit = async (event) => {
    event.preventDefault();
    console.log(marks);
    console.log(selectedUid);
    try {
      const { Ideation, Execution,Theory,Viva } = marks;
      const response = await axios.post('http://localhost:5000/teacher/evaluateStudent', {
        email: "sumit@gmail.com",
        uid: selectedUid,
        ideation: Ideation,
        execution: Execution,
        viva: Theory,
        theory: Viva,
      });
      console.log(response.data);
      // Show success message to the user
      
      toast({
        title: "Marks uploaded successfully",
        status: "success",
        position: "top",
        colorScheme: "purple",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      // Show error message to the user
    }

    try {
      const { Ideation, Execution,Theory,Viva } = marks;
      const response = await axios.post('http://localhost:5000/student/lockStudent', {
        uid: selectedUid
      });
      console.log(response.data);
      // Show success message to the user
      toast({
        title: "Marks locked sucessfully",
        status: "success",
        position: "top",
        colorScheme: "purple",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      // Show error message to the user
    }
  };

  useEffect(() => {
    fetchAssignedStudents("sumit@gmail.com");
  }, []);


return (
    <>
      <Container marginTop={'10'}>
        <Heading>Upload Marks</Heading>
        {assignedStudents.length > 0 && (
          <>
            <Select
              placeholder="Select student"
              marginTop={'10'}
              value={selectedUid}
              onChange={handleUidChange}
            >
              {assignedStudents.map(student => (
                <option key={student.uid} value={student.uid}>
                  {student.name}
                </option>
              ))}
            </Select>
            <Heading as="h2" size="md" marginTop={'10'}>
              Selected Student: {selectedUid}
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl marginTop={'10'}>
                <FormLabel>Ideation</FormLabel>
                <Input
                  type="number"
                  name="Ideation"
                  value={marks.Ideation}
                  onChange={handleMarksChange}
                  required
                />
              </FormControl>
              <FormControl marginTop={'10'}>
                <FormLabel>Execution</FormLabel>
                <Input
                  type="number"
                  name="Execution"
                  value={marks.Execution}
                  onChange={handleMarksChange}
                  required
                />
              </FormControl>
              <FormControl marginTop={'10'}>
                <FormLabel>Theory</FormLabel>
                <Input
                  type="number"
                  name="Theoru"
                  value={marks.Theory}
                  onChange={handleMarksChange}
                  required
                />
              </FormControl>
              <FormControl marginTop={'10'}>
                <FormLabel>Viva</FormLabel>
                <Input
                  type="number"
                  name="Viva"
                  value={marks.Viva}
                  onChange={handleMarksChange}
                  required
                />
              </FormControl>
              <Flex>
              <Button type="submit" onClick={handleSubmit} variant="solid" colorScheme="blue" marginTop={'10'}>
                Upload Marks
              </Button>
              <Spacer></Spacer>
              <Button type="submit" onClick={handleFinalSubmit} variant="solid" colorScheme="blue" marginTop={'10'}>
                Lock Marks
              </Button>
              </Flex>


            </form>
          </>
        )}
      </Container>
    </>
  );
};

export default UploadMarks;