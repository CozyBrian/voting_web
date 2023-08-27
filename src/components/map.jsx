/* eslint-disable react/prop-types */
import classNames from 'classnames';

const Levels = [
  {
    title: "Login",
    level: 0,
  },
  {
    title: "Authentication",
    level: 1,
  },
  {
    title: "Voting Categories",
    level: 2,
  },
  {
    title: "Cast your vote",
    level: 3,
  }
]

const SiteMap = ({ stage = 1 }) => {
  return (
    <div className="flex flex-row gap-3">
      {
        Levels.map((item) => (
          <div key={item.title} className="flex flex-col gap-1 w-[70px] lg:w-[160px]">
            <div className="flex flex-row items-center gap-2">
            <DotBar level={item.level} stage={stage}/>
            </div>
            <p className='text-xs lg:text-base'>{item.title}</p>
          </div>
        ))
      }
    </div>
  )
}

const DotBar = ({level = 0, stage = 0}) => {
  return (
    <>
      <div className={classNames("w-2 h-2 lg:w-4 lg:h-4 rounded-full",
      level <= stage ? "bg-[#2A17FF]" : "bg-gray-300")}></div>
      <div className={classNames("flex-1 h-0.5 lg:h-1",
      level <= stage ? "bg-[#2A17FF]" : "bg-gray-300")}
      ></div>
    </>
  );
}

export default SiteMap;