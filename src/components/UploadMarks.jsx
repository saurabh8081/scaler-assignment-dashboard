import React from 'react'
import { useState } from "react";

function UploadMarks() {
    // Define state to store marks
    const [marks, setMarks] = useState([
      { subject: "Maths", marks: "" },
      { subject: "Science", marks: "" },
      { subject: "English", marks: "" },
      { subject: "Social Studies", marks: "" }
    ]);
  
    // Define function to update marks
    function handleMarksChange(index, event) {
      const newMarks = [...marks];
      newMarks[index].marks = event.target.value;
      setMarks(newMarks);
    }

    return (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark, index) => (
              <tr key={index}>
                <td>{mark.subject}</td>
                <td>
                  <input
                    type="text"
                    value={mark.marks}
                    onChange={(event) => handleMarksChange(index, event)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default UploadMarks;
