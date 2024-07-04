import Image from "next/image";
import Menu from "./Menu";
import Link from "next/link";
import NavbarUserSection from "./NavbarUserSection";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50">
      <nav className="flex items-center justify-between gap-4 lg:gap-8 py-3 px-4 h-[47px]">
        {/* Left Section */}
        <Link href={"/"} className="flex items-center gap-2">
          <Menu />
          <Image
            src={"/logos/reddit.svg"}
            width={30}
            height={30}
            alt="bafftalk"
          />
          <h1 className="text-orange-500 hidden lg:block font-bold">
            BAFFTALK
          </h1>
        </Link>

        {/* Center Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full lg:w-[70%]">
            <input
              type="text"
              placeholder="Search bafftalk"
              className="rounded-[25px] bg-gray-200 py-2 pl-10 pr-4 w-full "
            />
            <Image
              src={"/icons/search.svg"}
              width={20}
              height={20}
              alt="search"
              className="absolute left-3 top-[50%] transform -translate-y-1/2"
            />
          </div>
        </div>

        {/* Right Section */}
        <NavbarUserSection />
        
      </nav>
      <hr className="border-t-1 border-gray-300 my-0 w-full"></hr>
      
    </div>
  );
};

export default Navbar;
