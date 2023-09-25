import { ElementType } from "react"
import { BiTargetLock } from "react-icons/bi"
import { GiBowman } from "react-icons/gi"
import weight from "../assets/weight.svg"

export const Info = () => {
  return (
    <div className="ml-4 flex h-full justify-between gap-3">
      <div className="flex h-full flex-col">
        <InfoItem Icon={GiBowman} text="Start"></InfoItem>
        <InfoItem Icon={BiTargetLock} text="End"></InfoItem>
        <div className="flex items-center pl-0.5">
          <img src={weight} className="h-6 w-6" />
          <p className="ml-2 text-lg font-semibold">Weight</p>
        </div>
      </div>

      <div className="flex h-full flex-col">
        <div className="flex items-center pl-1">
          <div className="h-5 w-5 overflow-hidden rounded bg-black"></div>
          <p className="ml-2 text-lg font-semibold">Wall</p>
        </div>
        <div className="flex items-center pl-1">
          <div className="h-5 w-5 overflow-hidden rounded bg-[#39fc17]"></div>
          <p className="ml-2 text-lg font-semibold">Shortest</p>
        </div>
        <div className="flex items-center pl-1">
          <div className="h-5 w-5 overflow-hidden rounded bg-[rgb(0,190,218)]"></div>
          <p className="ml-2 text-lg font-semibold">Visited</p>
        </div>
      </div>
    </div>
  )
}

const InfoItem = ({ Icon, text }: { Icon: ElementType; text: string }) => {
  return (
    <div className="flex items-center">
      <Icon className="h-7 w-7" />
      <p className="ml-2 text-lg font-semibold">{text}</p>
    </div>
  )
}
