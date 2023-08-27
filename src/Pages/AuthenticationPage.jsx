import SiteMap from "../components/map";
import BiometricIcon from "../components/biometric.svg";
import BiometricWhiteIcon from "../components/biometric-white.svg";
import PhoneIcon from "../components/phone.svg";
import PhoneWhiteIcon from "../components/phone-white.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
  return (
    <>
    {showModal && (
      <div className="fixed z-10 top-0 left-0 w-screen h-screen bg-black/10 flex items-center justify-center">
        <div className="w-[500px] h-[300px] bg-white rounded-2xl flex flex-col gap-8 items-center justify-center">
          <div className="w-16 h-16">
            <img src={BiometricIcon} className="w-full h-full group-hover:hidden " />
          </div>

          <p>You have been successfully biometrically verified!</p>

          <button onClick={() => {
            setShowModal(false)
            navigate("/categories")
          }} className="bg-[#2A17FF] py-2 px-4 text-white rounded-lg">
            Proceed
          </button>
        </div>
      </div>
    )}
    <div className="flex flex-col justify-between h-screen bg-gray-100 p-12">
      <div className="flex flex-col items-center lg:items-start">
        <div>
          <p className="text-2xl lg:text-4xl font-semibold">AUTHENTICATION</p>
          <div className="w-[74px] h-1.5 bg-[#2A17FF] rounded-full"></div>
        </div>
      </div>
      <div className="flex-1 flex flex-row gap-8 lg:gap-16 items-center justify-center">
        <button onClick={() => setShowModal(true)} className="group shrink-0 w-[140px] h-[140px] lg:w-[200px] lg:h-[200px] flex flex-col gap-3 items-center justify-center bg-white hover:bg-[#2A17FF] hover:text-white rounded-2xl duration-150">
          <div className="w-10 lg:w-16 lg:h-16">
            <img src={BiometricIcon} className="w-full h-full group-hover:hidden " />
            <img src={BiometricWhiteIcon} className="w-full h-full hidden group-hover:block" />
          </div>
          <p className="lg:text-xl leading-6">Biometric Authenitcation</p>
        </button>
        <button onClick={() => navigate("/confirmotp")} className="group shrink-0 w-[140px] h-[140px] lg:w-[200px] lg:h-[200px] flex flex-col gap-3 items-center justify-center bg-white hover:bg-[#2A17FF] hover:text-white rounded-2xl duration-150">
          <div className="w-10 lg:w-16 lg:h-16">
            <img src={PhoneIcon} className="w-full h-full group-hover:hidden " />
            <img src={PhoneWhiteIcon} className="w-full h-full hidden group-hover:block" />
          </div>
          <p className="lg:text-xl leading-6">OTP <br /> Authenitcation</p>
        </button>
      </div>
      <div className="flex flex-col items-center">
        <SiteMap stage={1} />
      </div>
    </div>
    </>
  );
};

export default AuthenticationPage;
