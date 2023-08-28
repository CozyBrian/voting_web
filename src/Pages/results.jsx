import axios from 'axios';
import { useQuery } from 'react-query';
import { API_URL } from '../constants';
import { Oval } from 'react-loader-spinner';
import { BarChart, Card, Subtitle, Title } from "@tremor/react";
import { useState } from 'react';
import useOnClickOutside from '../hooks/useMouseOverCallback';
import { useRef } from 'react';

const Results = () => {
  const [selectedCategoryId, setselectedCategoryId] = useState(null);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setselectedCategoryId(null));

  const { data: categories, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/roles`);
      return data;
    }
  });

  const { data: results, isLoading: resultsLoading } = useQuery({
    queryKey: ['results', selectedCategoryId],
    enabled: selectedCategoryId !== null,
    queryFn: async () => {
      const { data } = await axios.post(`${API_URL}/results`, {
        role_id: selectedCategoryId,
      });
      return data;
    }
  });

  const chartsData = results?.candidates.map((candidate, index) => ({
    name: results.candidates[index],
    "Number of votes": results.votes[index],
  }));

  const totalVotes = results?.votes.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-100 p-12">
      {
        selectedCategoryId !== null && (
          <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-black/30">
            <div ref={ref} className='w-[calc(100%-64px)] max-w-[800px] bg-white rounded-3xl'>
            <Card>
              <Title>{results?.role}</Title>
              <Subtitle>Total votes: {totalVotes}</Subtitle>
              {resultsLoading ? (
                <div className="flex items-center justify-center">
                  <Oval width={48} height={48} strokeWidth={4} color="#2A17FF" secondaryColor="secondart" />
                </div>
              ) : (<BarChart
                className="mt-6"
                data={chartsData}
                index="name"
                categories={["Number of votes"]}
                colors={["blue"]}
                yAxisWidth={48}
              />)}
            </Card>
            </div>
            <button 
              onClick={() => setselectedCategoryId(null)}
              className='bg-white flex items-center justify-center rounded-lg px-4 py-2 mt-4'>
              <p>Close</p>
            </button>
          </div>
        )
      }
      <div className="flex flex-col items-center">
        <p className="text-4xl font-semibold text-[#1753EF]">Results</p>
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
        categories !== undefined && categories.map((role) => (
          <button
            key={role.role}
            onClick={() => setselectedCategoryId(role.id)}
            className="flex items-center justify-center bg-white border border-[#A9B9EF] font-bold py-3 w-[300px] rounded m-2"
          >
            {role.role}
          </button>
        ))
      }
      </div>
    </div>
  )
}

export default Results;