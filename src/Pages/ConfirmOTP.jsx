import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { useGlobalContext } from "../context";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const ConfirmOTP = () => {
  const { number, setUser } = useGlobalContext();
  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [digit3, setDigit3] = useState('');
  const [digit4, setDigit4] = useState('');
  const [digit5, setDigit5] = useState('');
  const [digit6, setDigit6] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = async (e) => {
    // Replace this with your actual OTP verification logic
    e.preventDefault();

    const formData = {
      number,
      otp: `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`,
    };

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${API_URL}/confirm_otp`, formData);
      setUser(data);
      navigate("/categories");
    } catch (error) {
      console.error("Error submitting otp:", error);
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-md p-8 flex flex-col items-center gap-5">
        <p className="text-[#2A17FF] text-xl">Verify your account</p>
        <p className="font-light">We sent a six-digit code to your number. Please enter the code below </p>
        <div className="flex flex-row items-center gap-2">
          <div
            className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center p-2 text-gray-700 text-2xl font-bold"
          >
            <input type="number" value={digit1} onChange={(event) => setDigit1(event.target.value)} maxLength={1} className="w-full h-full rounded-md text-2xl" />
          </div>
          <div
            className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center p-2 text-gray-700 text-2xl font-bold"
          >
            <input type="number" value={digit2} onChange={(event) => setDigit2(event.target.value)} maxLength={1} className="w-full h-full rounded-md text-2xl" />
          </div>
          <div
            className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center p-2 text-gray-700 text-2xl font-bold"
          >
            <input type="number" value={digit3} onChange={(event) => setDigit3(event.target.value)} maxLength={1} className="w-full h-full rounded-md text-2xl" />
          </div>
          <div
            className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center p-2 text-gray-700 text-2xl font-bold"
          >
            <input type="number" value={digit4} onChange={(event) => setDigit4(event.target.value)} maxLength={1} className="w-full h-full rounded-md text-2xl" />
          </div>
          <div
            className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center p-2 text-gray-700 text-2xl font-bold"
          >
            <input type="number" value={digit5} onChange={(event) => setDigit5(event.target.value)} maxLength={1} className="w-full h-full rounded-md text-2xl" />
          </div>
          <div
            className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center p-2 text-gray-700 text-2xl font-bold"
          >
            <input type="number" value={digit6} onChange={(event) => setDigit6(event.target.value)} maxLength={1} className="w-full h-full rounded-md text-2xl" />
          </div>
          
        </div>
        <button
          onClick={handleVerifyOTP}
          className="flex items-center justify-center text-white bg-[#2A17FF] font-bold h-[50px] w-[300px] rounded-xl uppercase"
        >
          {
            isLoading ? (
              <Oval width={24} height={24} strokeWidth={4} color="#fff" secondaryColor="secondart" />
            ) : (
              <p>Verify</p>
            )
          }
        </button>
        {error !== null && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ConfirmOTP;
