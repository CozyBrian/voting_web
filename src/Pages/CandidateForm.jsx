import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";

const CandidateForm = () => {
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userClass, setUserClass] = useState("");
  const [role, setRole] = useState("");
  
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRoles = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/roles`);
        setRoles(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getRoles();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      dob,
      gender,
      phoneNumber,
      userClass,
      role,
    };

    try {
      const response = await fetch(
        "https://georgette-backend.onrender.com/enroll_candidate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully");
        // Reset form fields if needed
        setName("");
        setDOB("");
        setGender("");
        setPhoneNumber("");
        setUserClass("");
        setRole("");
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
        <h1 className="text-2xl font-bold mb-4">Candidate Registration</h1>
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
        <div className="mb-4">
          <label htmlFor="gender">Role:</label>
          <select
            id="role"
            className="border rounded py-2 px-3 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((role) => (
              <option value={role.id} key={role.id}>{role.role}</option>
            ))}
            {
              isLoading && <option value="">Loading...</option>
            }
          </select>
        </div>
        <Link to="/">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
};

export default CandidateForm;
