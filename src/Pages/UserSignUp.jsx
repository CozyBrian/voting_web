import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const CreateUserForm = () => {
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userClass, setUserClass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: name,
      dob,
      gender,
      number: phoneNumber,
      classOfUser: userClass,
    };

    try {
      const response = await fetch(
        `${API_URL}/enroll_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setName("");
        setDOB("");
        setGender("");
        setPhoneNumber("");
        setUserClass("");

        navigate("/");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 overflow-hidden">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96 m-4 "
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">User Registration</h1>
        <div className="mb-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="border rounded py-2 px-3 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            className="border rounded py-2 px-3 w-full"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            className="border rounded py-2 px-3 w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            className="border rounded py-2 px-3 w-full"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userClass">Class of User:</label>
          <input
            type="text"
            id="userClass"
            className="border rounded py-2 px-3 w-full"
            value={userClass}
            onChange={(e) => setUserClass(e.target.value)}
          />
        </div> 
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Submit
          </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
