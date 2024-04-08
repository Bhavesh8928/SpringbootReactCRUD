import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit, MdDeleteForever } from "react-icons/md";

function ListData() {
  const [students, setStudents] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    rollNum: "",
    name: "",
    address: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8084/allstudent");
      setStudents(response.data);
    } catch (error) {
      console.log("Error while fetching data: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/delete?id=${id}`);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log("Unable to delete the data due to - ", error);
    }
  };

  const handleEdit = (student) => {
    setUpdateFormData(student);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8084/update?id=${updateFormData.id}`, updateFormData);
      setIsEditing(false);
      setUpdateFormData({
        id: "",
        rollNum: "",
        name: "",
        address: ""
      });
      fetchData();
    } catch (error) {
      console.log("Unable to update the data due to - ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  return (
    <div>
      <h2>Student Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
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
                <MdEdit onClick={() => handleEdit(student)} />
                <MdDeleteForever onClick={() => handleDelete(student.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div>
          <h2>Edit Student</h2>
          <form onSubmit={handleUpdate}>
            <label>
              Roll Number:
              <input type="text" name="rollNum" value={updateFormData.rollNum} onChange={handleChange} />
            </label>
            <br />
            <label>
              Name:
              <input type="text" name="name" value={updateFormData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Address:
              <input type="text" name="address" value={updateFormData.address} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ListData;
