"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const FriendRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState<any[]>([]);
  const [deniedRequests, setDeniedRequests] = useState<any[]>([]);
  const [sentRequests, setSentRequests] = useState<any[]>([]);
  const { GlobalUser } = useAuth();

  const fetchReceivedRequests = async () => {
    try {
      let pendingRequests: any[] = [];
      let rejectedRequests: any[] = [];
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getFriendRequests/${GlobalUser?._id}`
      );
      if (response.status === 404) {
        setReceivedRequests([]);
      } else {
        const data = await response.json();
        for (let request of data) {
          if (request.state === "pending") {
            pendingRequests.push(request);
          }
        }

        for (let request of data) {
          if (request.state === "rejected") {
            rejectedRequests.push(request);
          }
        }
        setReceivedRequests(pendingRequests);
        setDeniedRequests(rejectedRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSentRequests = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sentFriendRequests/${GlobalUser?._id}`
      );
      if (response.status === 404) {
        setSentRequests([]);
      } else {
        const data = await response.json();
        console.log(data);
        setSentRequests(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequest = async (request: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/acceptFriendRequest/${request._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setReceivedRequests((prev) =>
          prev.filter((req) => req._id !== request._id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const rejectFriendRequest = async (request: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/rejectFriendRequest/${request._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setReceivedRequests((prev) =>
          prev.filter((req) => req._id !== request._id)
        );
        setDeniedRequests((prev) => [...prev, request]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (GlobalUser) {
      fetchReceivedRequests();
      fetchSentRequests();
    }
  }, [GlobalUser]);
  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px]">
      <div className="flex flex-col lg:flex-row gap-4 ">
        <div className="flex flex-col gap-4 w-full lg:w-[70%]">
          <div className="flex flex-col gap-4 bg-gray-200 shadow-lg border-transparent rounded-[20px] pb-4 ">
            <span className="mt-5 font-bold text-xl py-2 px-5">
              Pending Friend requests
            </span>
            {receivedRequests?.length > 0 ? (
              receivedRequests.map((request: any) => (
                <div
                  key={request._id}
                  className="flex flex-col gap-3 w-full lg:w-[60%] shadow-lg border-transparent rounded-[20px] bg-white mx-2 "
                >
                  <div className="p-4 flex wf items-center gap-2">
                    <Image
                      loader={() => request.sender.avatar ? request.sender.avatar : "/images/emptyAvatar.png"}
                      src={
                        request.sender.avatar
                          ? request.sender.avatar
                          : "/images/emptyAvatar.png"
                      }
                      alt={request.sender.username}
                      width={50}
                      height={50}
                      className="rounded-full w-[45px] h-[45px] border-4 border-transparent shadow-lg object-fill"
                    />
                    <div className="flex flex-col gap-0">
                      <span className="font-bold ">
                        {request.sender.username}{" "}
                      </span>
                      <strong className="text-sm text-gray-500 font-bold ">
                        2 hours ago
                      </strong>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                      <Image
                        onClick={() => acceptFriendRequest(request)}
                        src={"/icons/accept.svg"}
                        height={30}
                        width={30}
                        alt="accept"
                        className="cursor-pointer hover:scale-125"
                      />
                      <Image
                        onClick={() => rejectFriendRequest(request)}
                        src={"/icons/decline.svg"}
                        height={30}
                        width={30}
                        alt="decline"
                        className="cursor-pointer hover:scale-125"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 text-red-400 font-bold">
                <span>You have no friend requests at this time .</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[30%] gap-4 ">
          <div className="flex flex-col gap-4 bg-gray-200 shadow-lg border-transparent rounded-[20px] pb-4 ">
            <span className="mt-5 font-bold text-xl p-5">
              Rejected Friend requests
            </span>
            {deniedRequests?.length > 0 ? (
              deniedRequests.map((request: any) => (
                <div
                  key={request._id}
                  className="flex flex-col gap-3 w-[90%] mx-2  shadow-lg border-transparent rounded-[20px] bg-red-200 "
                >
                  <div className="p-4 flex wf items-center gap-2">
                    <Image
                      loader={() => request.sender.avatar ? request.sender.avatar : "/images/emptyAvatar.png"}
                      src={
                        request.sender.avatar
                          ? request.sender.avatar
                          : "/images/emptyAvatar.png"
                      }
                      alt={request.sender.username}
                      width={50}
                      height={50}
                      className="rounded-full w-[45px] h-[45px] border-4 border-transparent shadow-lg object-fill"
                    />
                    <div className="flex flex-col gap-0">
                      <span className="font-bold ">
                        {request.sender.username}{" "}
                      </span>
                      <strong className="text-sm text-gray-500 font-bold ">
                        2 hours ago
                      </strong>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 text-red-400 font-bold">
                <span>You have not denied any friend requests yet .</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full border-transparent shadow-lg rounded-[20px] mt-[50px]">
        <div className="flex flex-col gap-4 w-full ">
          <div className="flex flex-col gap-4 bg-gray-200 shadow-lg border-transparent rounded-[20px] pb-4 ">
            <span className="mt-5 font-bold text-xl p-5">My sent requests</span>

            {sentRequests?.length > 0 ? (
              sentRequests.map((request: any) => (
                <div
                  key={request._id}
                  className="flex flex-col gap-3 w-full lg:w-[60%] shadow-lg border-transparent rounded-[20px] bg-white mx-2 "
                >
                  <div className="p-4 flex w-full items-center gap-2">
                    <Image
                      loader={() => request.receiver.avatar}
                      src={
                        request.receiver.avatar
                          ? request.receiver.avatar
                          : "/images/emptyAvatar.png"
                      }
                      alt={request.sender.username}
                      width={50}
                      height={50}
                      className="rounded-full w-[45px] h-[45px] border-4 border-transparent shadow-lg object-fill"
                    />
                    <div className="flex flex-col gap-0">
                      <span className="font-bold ">
                        {request.receiver.username}
                      </span>
                      <strong className="text-sm text-gray-500 font-bold ">
                        2 hours ago
                      </strong>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                      <span
                        className={`${
                          request.state === "pending"
                            ? "text-orange-600"
                            : request.state === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        } font-bold`}
                      >
                        {request.state}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 text-red-400 font-bold">
                <span>You have not sent any friend requests yet .</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
