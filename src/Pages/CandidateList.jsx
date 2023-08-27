import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../constants";
import axios from "axios";
import { useGlobalContext } from "../context";
import { Oval } from "react-loader-spinner";
import SiteMap from "../components/map";
import CheckIcon from "../components/check.svg";
import DoneIcon from "../components/Done.svg"

const MODE = {
  NEVER: "NEVER",
  ALREADY_VOTED: "ALREADY_VOTED",
  VOTED: "VOTED",
};

const ListTitles = {
  1: "Presidential Candidates",
  2: "Vice-Presidential Candidates",
  3: "General Secretary Candidates",
  4: "Financial Secretay Candidates",
}

const CandidateList = () => {
  const { number } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [currentRole, setRole] = useState(null);
  const [mode, setMode] = useState(MODE.NEVER);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();
  
  const [URLSearchParams,] = useSearchParams();
  const role = URLSearchParams.get("role") || "1";

  useEffect(() => {
    const getVoteStatus = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.post(`${API_URL}/has_user_voted`, {
          number,
          role_id: role,
        });
        if (data.status) {
          setMode(MODE.ALREADY_VOTED);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    getVoteStatus();
  }, [number, role]);
  
  
  useEffect(() => {
    const getCandidates = async () => {
      setIsLoading(true);
      try {
        const { data: cRole } = await axios.get(`${API_URL}/role?role_id=${role}`);
        setRole(cRole);
        const { data } = await axios.get(`${API_URL}/candidates?role_id=${role}`);
        setCandidates(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCandidates();
  }, [role]);

  const submitVote = async () => {
    try {
      setIsLoadingSubmit(true);
      await axios.post(`${API_URL}/vote`, {
        candidate_id: selectedCandidate,
        role_id: role,
        number,
      });

      setMode(MODE.VOTED);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-100 p-12">
      {mode === MODE.NEVER && <div className="flex flex-col items-center">
        <p className="text-4xl font-semibold text-[#1753EF] uppercase">{currentRole !== null && ListTitles[currentRole.id]}</p>
      </div>}
      <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      {
        isLoading && (
          <div>
            <Oval width={48} height={48} strokeWidth={4} color="#2A17FF" secondaryColor="secondart" />
          </div>
        )
      }
      {
        mode === MODE.NEVER && candidates?.map((candidate) => (
          <div key={candidate.id} onClick={() => setSelectedCandidate(candidate.id)} className="flex flex-row items-center gap-6">
          <button 
            to={`/candidatelist?role=${role.id}`}
            className="flex items-center justify-center bg-white border border-[#30AC25] font-bold h-[50px] w-[300px] rounded m-2"
            >
            <p>{candidate.candidate}</p> 
          </button>
          <button className="w-[50px] h-[50px] p-3 flex items-center justify-center bg-white border border-[#30AC25] rounded-full">
            {candidate.id === selectedCandidate && <img src={CheckIcon} className="w-full h-full" alt="Check"/>}
          </button>
          </div>
        ))
      }
      {mode === MODE.ALREADY_VOTED && (
        <div className="flex flex-col gap-8 justify-center items-center bg-white p-8 rounded-xl">
          <p>
            You have already voted for this category. Please proceed to the next
          </p>
          <button onClick={() => {
            navigate("/categories")
          }} className="bg-[#2A17FF] py-2 px-4 text-white rounded-lg">
            Back to Categories
          </button>
        </div>
      )}
    
      {
        mode === MODE.VOTED && (
          <div className="flex flex-col gap-6 justify-center items-center">
            <div className="w-[240px] h-[240px] p-8 flex items-center justify-center rounded-full border-[12px] border-[#30AC25]">
              <img src={DoneIcon} className="w-full h-full" alt="done" />
            </div>
            <p className="text-lg uppercase">YOUR VOTE HAS SUCCESSFULLY BEEN CAST</p>
            <button
            onClick={() => navigate("/categories")}
              className="flex items-center justify-center text-white bg-[#30AC25D9] font-bold h-[50px] w-[300px] rounded-xl"
            >
              Go to next category
            </button>
          </div>
        )
      } 
      </div>
      {mode === MODE.NEVER && <div className="flex flex-col items-center">
        <button 
          onClick={submitVote}
          className="flex items-center justify-center text-white bg-[#30AC25D9] font-bold h-[50px] w-[500px] rounded-xl m-2 mb-6"
        >
          {
            isLoadingSubmit ? (
              <Oval width={24} height={24} strokeWidth={4} color="#fff" secondaryColor="secondart" />
            ) : (
              <p className="uppercase">Cast your vote</p> 
            )
          }
        </button> 
        <SiteMap stage={3} />
      </div>}
    </div>
   
   
  );
};

export default CandidateList;
