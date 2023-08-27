import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import SiteMap from "../components/map";
import { Oval } from "react-loader-spinner";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRoles = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/roles`);
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getRoles();
  }, [])
  

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-100 p-12">
      <div className="flex flex-col items-center">
        <p className="text-4xl font-semibold text-[#1753EF]">Voting Category</p>
      </div>
      <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      {
        isLoading && (
          <div>
            <Oval width={48} height={48} strokeWidth={4} color="#2A17FF" secondaryColor="secondart" />
          </div>
        )
      }
      {
        !isLoading && categories.map((role) => (
          <Link
            key={role.role}
            to={`/candidatelist?role=${role.id}`}
            className="flex items-center justify-center bg-white border border-[#A9B9EF] font-bold py-3 w-[300px] rounded m-2"
          >
            {role.role}
          </Link>
        ))
      }
      </div>
      <div className="flex flex-col items-center"> 
        <SiteMap stage={2} />
      </div>
    </div>
  );
};

export default Categories;
