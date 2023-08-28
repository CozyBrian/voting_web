import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { Oval } from "react-loader-spinner";

const CandidateForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      candidate: name,
      role_id: role,
    };

    try {
      setSubmitLoading(true);
      await axios.post(`${API_URL}/create_candidate`, formData);

      setName("");
      setRole("");

      navigate("/admin", { replace: true });

    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response.data.error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 overflow-hidden">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96 m-4"
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 flex items-center justify-center text-white font-bold py-2 px-4 rounded w-full"
        >
          {
            submitLoading ? (
              <Oval width={24} height={24} strokeWidth={4} color="#fff" secondaryColor="secondart" />
            ) : ("Submit")
          }
        </button>
      </form>
      <div>
        {error !== null && <p className="text-red-500 text-center text-xs mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CandidateForm;
