import React, { useEffect, useState } from "react";
// axios is a popular library used for making HTTP requests from the browser. We'll use it to fetch data from the backend.
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function ListData() {
  // We use the useState hook to create a state variable named students and a function setStudents to update this state variable.
  // Initially, students is an empty array, and it will hold the fetched student data.
  const [students, setStudents] = useState([]);

  //We use the useEffect hook to perform side effects in functional components. In this case, we want to fetch data from the
  // backend when the component mounts (i.e., when it is first rendered to the DOM). The fetchData function is called inside the
  // useEffect hook.The empty dependency array ([]) as the second argument ensures that the effect runs only once when the component mounts.
  useEffect(() => {
    fetchData();
  }, []);

  //This function is an asynchronous function that sends a GET request to fetch data from the backend endpoint 'http://localhost:8084/allstudent'.
  // Upon successful response, the fetched student data is stored in the students state variable using the setStudents function.
  // If an error occurs during the fetch operation, it is caught and logged to the console.
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8084/allstudent");
      setStudents(response.data);
    } catch (error) {
      console.log("Error while fetching data: ", error);
    }
  };

  // handleDelete function is defined to handle the delete action. It sends a DELETE request to the backend API to delete the student
  // with the specified id. After successful deletion, it updates the state to remove the deleted student from the list.
  // The delete icon (MdDeleteForever) is rendered in the table, and its onClick event is set to call the handleDelete function with the
  //  id of the corresponding student.
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/delete?id=${id}`);
      // Update the state to reflect the changes after deletion
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log("Unable to delete the data due to - ", error);
    }
  };

  return (
    //   <h1>This is List data form</h1>
    <div>
      <h2>Student Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Address</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.rollNum}</td>
              <td>{student.name}</td>
              <td>{student.address}</td>
              <td>
                <MdEdit />
              </td>
              <td>
                <MdDeleteForever
                  onClick={() => {    
                    handleDelete(student.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListData;
