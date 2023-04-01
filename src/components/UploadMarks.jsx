import React, { useState } from 'react';
import {
  Container,
  Heading,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const UploadMarks = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [marks, setMarks] = useState({
    subject1: '',
    subject2: '',
    subject3: '',
    subject4: '',
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMarksChange = (event) => {
    const { name, value } = event.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(marks); // You can replace this with your API call to submit marks
  };

  return (
    <>
      <Container marginTop={'10'}>
        <Heading>Upload Marks</Heading>
        <Select
          placeholder="Select option"
          marginTop={'10'}
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </Select>
        {selectedOption && (
          <>
            <Heading as="h2" size="md" marginTop={'10'}>
              Selected User: {selectedOption}
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
              <Button type="submit" variant="solid" colorScheme="blue" marginTop={'10'}>
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
