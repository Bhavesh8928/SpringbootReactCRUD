// React aur useState import karna
import React, { useState } from 'react';
//axios or fetch to send HTTP POST requests from your React.js frontend to Spring Boot backend.
import axios from 'axios'; 

// RegistrationForm naam ka functional component banana
function RegistrationForm() {
  // useState hook ka use karke initial state set karna
  const [formData, setFormData] = useState({
    rollNum: '', // rollNum field ka shuruaati state set karna
    name: '',    // name field ka shuruaati state set karna
    address: '', // address field ka shuruaati state set karna
  });

  // handleChange function define karna, jo har input field ke changes ko handle karega
  const handleChange = (e) => {
    // Event object se name aur value extract karna
    const { name, value } = e.target;
    // setFormData hook ka use karke existing formData state ko update karna, [name]: value se specific field ka value update karna
    setFormData({ ...formData, [name]: value });
  };

  // handleSubmit function define karna, jo form submit ko handle karega
  const handleSubmit = async (e) => {
    e.preventDefault(); // Default form submission ko rokna
    // Yahan par form submission ka logic aayega, jaise ki data ko backend server par bhejna
    // console.log(formData); // formData ko console par print karna
 
  try {
    // ensure rollNum is parsed to an integer before sending to backend
    const parsedFormData = { ...formData,  rollNum: parseInt(formData.rollNum, 10)};
    console.log("Form data to be sent to backend:", parsedFormData); // Log form data to console

    const response = await axios.post('http://localhost:8084/savest', parsedFormData);
    console.log(response.data); // handle response from server
    console.log("Form data saved");
    // Optionally, reset the form fields after successful submission
    setFormData({ rollNum: '', name: '', address: '' });
  } catch (error) {
    console.error('Error registering user:', error);  
  }
};

  // Return statement mein form ka JSX render karna
  return (
    <form onSubmit={handleSubmit}> {/* Form submit hone par handleSubmit function call hoga */}
      <label>
        Roll Number:
        <input type="text" name="rollNum" value={formData.rollNum} onChange={handleChange} /> {/* rollNum field ke liye input */}
      </label>
      <br />
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} /> {/* name field ke liye input */}
      </label>
      <br />
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} /> {/* address field ke liye input */}
      </label>
      <br />
      <button type="submit">Register</button> {/* Register button */}
    </form>
  );
}

export default RegistrationForm; // RegistrationForm component ko export karna
