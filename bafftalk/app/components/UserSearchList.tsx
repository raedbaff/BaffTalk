import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "./loading";

const UserSearchList = ({
  searchUsers,
  users,
  loading,
  setSearchUsers,
}: {
  searchUsers: boolean;
  users: Array<any>;
  loading: boolean;
  setSearchUsers: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {}, [users, searchUsers]);
  const router = useRouter();
  return (
    searchUsers && (
      <div className="absolute top-[120%] w-full bg-white rounded-[25px] shadow-2xl border-solid border-gray-200 border">
        <div className="py-5 px-1 flex flex-col gap-0">
          <span className="px-6 my-2 font-extrabold text-xl">Users</span>
          {loading ? (
            <div className="flex items-center justify-center gap-2 p-2">
              <Loading type={"spin"} color="black" height={30} width={30} />
            </div>
          ) : users?.length === 0 ? (
            <div className="flexe p-2 ">
              <strong className="text-xl px-4 py-2 text-red-500">
                {" "}
                No users found
              </strong>
            </div>
          ) : (
            users?.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSearchUsers(false);
                  router.push(`/profile/${user._id}`);
                }}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 p-2 rounded-[5px]"
              >
                <Image
                  loader={({ src }) => src}
                  src={user.avatar ? user.avatar : "/images/emptyAvatar.png"}
                  height={40}
                  width={40}
                  alt="peter"
                  className="rounded-full w-[40px] h-[40px] border-4 border-transparent shadow-lg object-fill "
                />
                <strong>{user.username} </strong>
              </div>
            ))
          )}
        </div>
      </div>
    )
  );
};

export default UserSearchList;
