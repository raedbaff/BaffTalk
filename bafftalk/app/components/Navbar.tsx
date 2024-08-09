"use client";
import Image from "next/image";
import Menu from "./Menu";
import Link from "next/link";
import NavbarUserSection from "./NavbarUserSection";
import { useAuth } from "../context/AuthContext";
import UserSearchList from "./UserSearchList";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [searchUsers, setSearchUsers] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [Loading, setLoading] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const fetchUsers = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setsearchInput(event.target.value);

      if (event.target.value === "") {
        setSearchResults([]);
        return;
      }
      const searchObject = {
        searchInput: event.target.value,
      };
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/searchUsers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchObject),
        }
      );
      setLoading(false);

      if (response.status === 404) {
        setSearchResults([]);
        return;
      } else {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      setSearchResults([]);
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setSearchUsers(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
        <div
          ref={navbarRef}
          className="flex-1 flex items-center justify-center "
        >
          <div className="relative w-full lg:w-[70%]">
            <input
              type="text"
              onClick={() => {
                setSearchUsers(true);
              }}
              onChange={fetchUsers}
              value={searchInput}
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
            <UserSearchList
              setSearchUsers={setSearchUsers}
              searchUsers={searchUsers}
              users={searchResults}
              loading={Loading}
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
