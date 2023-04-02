import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import axios from "axios"

const UploadMarks = () => {
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [selectedUid, setSelectedUid] = useState(null);
  const [marks, setMarks] = useState({
    subject1: '',
    subject2: '',
    subject3: '',
    subject4: '',
  });

  const fetchAssignedStudents = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/teacher/assignedStudents', { email });
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
    console.log(marks); // You can remove this line
    console.log(selectedUid);
    try {
      const { subject1, subject2, subject3, subject4 } = marks;
      const response = await axios.post('http://localhost:5000/teacher/evaluateStudent', {
        email: "sumit@gmail.com",
        uid: selectedUid,
        ideation: subject1,
        execution: subject2,
        viva: subject3,
        theory: subject4,
      });
      console.log(response.data);
      // Show success message to the user
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
                <FormLabel>Subject 1</FormLabel>
                <Input
                  type="number"
                  name="subject1"
                  value={marks.subject1}
                  onChange={handleMarksChange}
                  required
                />
              </FormControl>
              <FormControl marginTop={'10'}>
                <FormLabel>Subject 2</FormLabel>
                <Input
                  type="number"
                  name="subject2"
                  value={marks.subject2}
                  onChange={handleMarksChange}
                  required
                />
              </FormControl>
              <FormControl marginTop={'10'}>
                <FormLabel>Subject 3</FormLabel>
                <Input
                  type="number"
                  name="subject3"
                  value={marks.subject3}
                  onChange={handleMarksChange}
                  required
                />
              </FormControl>
              <FormControl marginTop={'10'}>
                <FormLabel>Subject 4</FormLabel>
                <Input
                  type="number"
                  name="subject4"
                  value={marks.subject4}
                  onChange={handleMarksChange}
                  required
                />
              </FormControl>
              <Button type="submit" onClick={handleSubmit} variant="solid" colorScheme="blue" marginTop={'10'}>
                Upload Marks
              </Button>


            </form>
          </>
        )}
      </Container>
    </>
  );
};

export default UploadMarks;
