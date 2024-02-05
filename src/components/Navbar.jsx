import { PiPhoneDisconnectBold } from "react-icons/pi";


const Navbar = () => {
  return (
    <div className="h-[60px] bg-white my-2 rounded-lg flex justify-center items-center gap-3 text-xl font-medium">
              <PiPhoneDisconnectBold />
              <h1>Firebase Contact</h1>
    </div>
  )
}

export default Navbar;
