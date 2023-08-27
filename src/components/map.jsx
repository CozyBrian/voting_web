/* eslint-disable react/prop-types */
import classNames from 'classnames';

const SiteMap = ({ stage = 1 }) => {
  return (
    <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-1 w-[160px]">
            <div className="flex flex-row items-center gap-2">
            <DotBar level={0} stage={stage}/>
            </div>
            <p>Login</p>
          </div>
          <div className="flex flex-col gap-1 w-[160px]">
            <div className="flex flex-row items-center gap-2">
              <DotBar level={1} stage={stage}/>
            </div>
            <p>Authentication</p>
          </div>
          <div className="flex flex-col gap-1 w-[160px]">
            <div className="flex flex-row items-center gap-2">
            <DotBar level={2} stage={stage}/>
            </div>
            <p>Voting Categories</p>
          </div>
          <div className="flex flex-col gap-1 w-[160px]">
            <div className="flex flex-row items-center gap-2">
            <DotBar level={3} stage={stage}/>
            </div>
            <p>Cast your vote</p>
          </div>

        </div>
  )
}

const DotBar = ({level = 0, stage = 0}) => {
  return (
    <>
      <div className={classNames("w-4 h-4 rounded-full",
      level <= stage ? "bg-[#2A17FF]" : "bg-gray-300")}></div>
      <div className={classNames("flex-1 h-1",
      level <= stage ? "bg-[#2A17FF]" : "bg-gray-300")}
      ></div>
    </>
  );
}

export default SiteMap;