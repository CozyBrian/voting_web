import thumbsUp from "./assets/thumbs-up.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Instructions from "./Instructions";
import AppNavBar from "./AppNavBar";
import { API_URL } from "./constants";
import { useGlobalContext } from "./context";
import { Oval } from "react-loader-spinner";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null)
  const { setNumber } = useGlobalContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setisLoading(true);

      await axios.post(`${API_URL}/send_otp`, {
        name,
        number: phoneNumber,
      });

      setNumber(phoneNumber)
      navigate("/authenticationpage")

    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response.data.error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col lg:flex-row">
      <Instructions />
      <div className="relative w-full lg:w-1/2 lg:h-screen flex flex-col items-center py-16">
        <div className="w-[400px] flex flex-col items-center">
          <AppNavBar />
          <img src={thumbsUp} className="rounded-full h-16 w-16 lg:mt-16"></img>
          <p className="text-4xl mt-8 font-bold">Welcome!</p>
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col w-full">
            <label htmlFor="name" className="text-xs mt-5">
              Full Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="h-12 bg-[#F1F6FA]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="phoneNumber" className="text-xs mt-5">
              Phone Number:
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="h-12 bg-[#F1F6FA]"
              value ={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button className="py-2 px-2 bg-[#2A17FF] flex items-center justify-center rounded-sm text-white mt-4" type="submit">
              {
                isLoading ? (
                  <div>
                    <Oval width={24} height={24} strokeWidth={4} color="#fff" secondaryColor="secondart" />
                  </div>
                ): ("Submit")
              }
            </button>
            <div className="text-center my-2 text-xs">
              <p>
                Don&apos;t have an account yet?
                <Link to="/signup"> Sign up</Link>
              </p>
            </div>
            {error !== null && <p className="text-red-500 text-center text-xs mt-2">{error}</p>}
          </form>       
        </div>

      </div>
    </div>
  );
}

export default App;
