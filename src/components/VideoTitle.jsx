import { MdOutlineInfo } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screeen overflow-hidden aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-2/4">{overview}</p>
      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-white py-2 px-10 text-lg text-black rounded-sm"><FaPlay /> Play</button>
        <button className="flex items-center bg-opacity-50 gap-2 bg-gray-500 p-4 px-10 text-lg text-white rounded-sm"><MdOutlineInfo />More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
