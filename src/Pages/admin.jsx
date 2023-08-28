import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center p-12'>
      <div className="flex flex-col items-center">
        <p className="text-4xl font-semibold text-[#1753EF]">Admin</p>
      </div>
      <div className='flex-1 flex flex-col gap-4 items-center justify-center'>
      <Link
        to={`/results`}
        className="rounded-full w-[200px] py-2 bg-[#2A17FF] text-white font-medium flex items-center justify-center"
      >
        View Results
      </Link>
      <Link
        to={`/candidateform`}
        className="rounded-full w-[200px] py-2 bg-[#2A17FF] text-white font-medium flex items-center justify-center"
      >
        Add Candidate
      </Link>
      </div>
    </div>
  )
}

export default Admin;