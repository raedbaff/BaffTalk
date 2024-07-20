"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TextEditor from "../components/TextEditor";
import { useRouter } from "next/navigation";
import Topic from "../components/Topic";
import { useAuth } from "../context/AuthContext";
import { FormPost, Group, PostType } from "@/types";
import Link from "next/link";
import Success from "../components/Success";

interface formError {
  noTitleError: boolean;
  noDescriptionError: boolean;
  noGroupError: boolean;
  noImageError: boolean;
}

const CreatePost = () => {
  const router = useRouter();
  const { GlobalUser } = useAuth();
  const [selectedPostType, setSelectedPostType] = useState("Text");
  const [wordCount, setWordCount] = useState(0);
  const [chooseGroup, setChooseGroup] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [Loading, setLoading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [formError, setFormError] = useState<formError>({
    noTitleError: false,
    noDescriptionError: false,
    noGroupError: false,
    noImageError: false,
  });
  const [post, setPost] = useState<FormPost>({
    title: "",
    description: "",
    maker: GlobalUser?._id,
    group: "",
    postImage: undefined,
  });

  const fetchGroups = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/joined/${GlobalUser?._id}`
      );
      if (response.status === 404 || response.status === 500) {
        setGroups([]);
      } else {
        const data = await response.json();
        setGroups(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!post.group) {
        setFormError({ ...formError, noGroupError: true });
        setLoading(false);
        setTimeout(() => {
          setFormError({ ...formError, noGroupError: false });
        }, 2000);
        return;
      }
      if (!post.title) {
        setFormError({ ...formError, noTitleError: true });
        setLoading(false);
        setTimeout(() => {
          setFormError({ ...formError, noTitleError: false });
        }, 2000);
        return;
      }
      if (!post.description) {
        setFormError({ ...formError, noDescriptionError: true });
        setLoading(false);
        setTimeout(() => {
          setFormError({ ...formError, noDescriptionError: false });
        }, 2000);
        return;
      }

      if (!post.postImage) {
        console.log("no image");

        setFormError({ ...formError, noImageError: true });
        setLoading(false);
        setTimeout(() => {
          setFormError({ ...formError, noImageError: false });
        }, 2000);
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("maker", post.maker as string);
      formData.append("group", post.group as string);
      formData.append("postImage", post.postImage as Blob);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        setLoading(false);
        setsuccess(true);
        const data = await response.json();
        console.log(data);
        setPost({
          title: "",
          description: "",
          maker: GlobalUser?._id,
          group: "",
          postImage: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [GlobalUser]);
  const handlebutton = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setChooseGroup(true);
  };
  const handleClickAnywhere = () => {
    setChooseGroup(false);
  };
  const stopPropagation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setPost({ ...post, title: inputText });
    setWordCount(inputText.length);
  };
  return (
    <div
      onClick={handleClickAnywhere}
      className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px] xl:w-[calc(100vw-255px-355px)] xl:ml-[255px] xl:mr-[355px]"
    >
      {success && (
        <Success
          closeModal={() => setsuccess(false)}
          message={"Post created successfully"}
        />
      )}
      <div className="p-6 flex flex-col ">
        <div className="flex items-center">
          <strong className="text-2xl ">Create Post</strong>
          <button
            onClick={() => {
              router.push("/createGroup");
            }}
            className="ml-auto p-2 bg-white rounded-[20px] flex items-center text-black border border-gray-600"
          >
            <Image
              src={"/images/plus.svg"}
              width={30}
              height={30}
              alt="createGroup"
            />
            Create Group
          </button>
        </div>
        <div className="mt-2 relative">
          <button
            onClick={handlebutton}
            className={`px-2 py-1 border border-black rounded-[25px] bg-gray-200 flex items-center gap-2 ${
              !chooseGroup ? "" : "hidden"
            }`}
          >
            <Image
              src={"/images/topic.svg"}
              alt="topic"
              height={25}
              width={25}
            />
            <span>Choose Group</span>
            <Image
              className="ml-auto"
              src={"/images/arrowDown.svg"}
              alt="topic"
              height={25}
              width={25}
            />
          </button>
          {formError.noGroupError && (
            <div className="text-red-500">Group is required</div>
          )}{" "}
          <div
            className={`relative w-[50%] ${chooseGroup ? "block" : "hidden"}`}
          >
            <input
              disabled
              value={selectedGroup}
              type="text"
              placeholder="Group"
              className="rounded-[25px] bg-gray-200 py-2 pl-10 pr-4 w-full "
            />
            <Image
              src={"/images/groups.svg"}
              width={20}
              height={20}
              alt="search"
              className="absolute left-3 top-[50%] transform -translate-y-1/2"
            />
          </div>
          {chooseGroup && (
            <div
              onClick={stopPropagation}
              className=" mt-2 w-[300px] shadow-lg z-50 border-black flex flex-col rounded-[10px]"
            >
              <div className="p-4">
                <strong>Joined Groups</strong>
                {groups.length === 0 ? (
                  <div className="px-2 py-2 text-gray-600 font-bold">
                    no groups found,{" "}
                    <Link href={"/groups"} className="text-red-600">
                      Join some
                    </Link>{" "}
                  </div>
                ) : (
                  groups.map((group) => (
                    <div
                      key={group?.name}
                      onClick={(e) => {
                        setSelectedGroup(group?.name);
                        setPost({ ...post, group: group?._id });
                      }}
                    >
                      <Topic
                        key={group.name}
                        name={group.name}
                        photo={`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/photo/${group?._id}`}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          <div className="flex gap-2 items-center mt-2 px-3 py-4">
            <div
              onClick={() => setSelectedPostType("Text")}
              className="font-bold hover:border hover:bg-gray-300 p-2 cursor-pointer relative text-sm"
            >
              Text
              <div className="absolute bottom-0 left-0 w-full flex flex-col items-center">
                <hr
                  className={`mb-auto  border-t-[5px] border-blue-800 my-2 w-[80%] ${
                    selectedPostType === "Text" ? "" : "hidden"
                  }`}
                ></hr>
              </div>
            </div>
            <div
              onClick={() => setSelectedPostType("Images & videos")}
              className="font-bold hover:border hover:bg-gray-300 p-2 cursor-pointer relative text-sm "
            >
              Images & videos
              <div className="absolute bottom-0 left-0 w-full flex flex-col items-center">
                <hr
                  className={`mb-auto  border-t-[5px] border-blue-800 my-2 w-[80%] ${
                    selectedPostType === "Images & videos" ? "" : "hidden"
                  }`}
                ></hr>
              </div>
            </div>
            <div
              onClick={() => setSelectedPostType("Link")}
              className="font-bold hover:border hover:bg-gray-300 p-2 cursor-pointer relative text-sm "
            >
              Link
              <div className="absolute bottom-0 left-0 w-full flex flex-col items-center">
                <hr
                  className={`mb-auto  border-t-[5px] border-blue-800 my-2 w-[80%] ${
                    selectedPostType === "Link" ? "" : "hidden"
                  }`}
                ></hr>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-2 px-3 py-4 relative">
            <input
              onChange={handleChange}
              value={post.title}
              className="w-full p-2 border border-gray-600 hover:bg-gray-200 rounded-[15px]"
              type="text"
              placeholder="Title *"
            ></input>
            <div className="absolute right-3 bottom-[-5px] text-[12px] ">
              {wordCount}/300
            </div>
          </div>
          {formError.noTitleError && (
            <div className="text-red-500">Title is required</div>
          )}
          {selectedPostType === "Text" && (
            <div className="mt-2 px-3 py-4 flex flex-col  gap-2">
              <label className="p-2 font-bold">Post description</label>

              <textarea
                className="h-[150px] px-4 py-2 rounded-[20px] border border-black "
                onChange={(e) =>
                  setPost({ ...post, description: e.target.value })
                }
                placeholder="description"
                value={post.description}
              />
              {formError.noDescriptionError && (
                <div className="text-red-500">Description is required</div>
              )}
            </div>
          )}
          {selectedPostType === "Images & videos" && (
            <div className="mt-2 h-[100px] p-2 border border-gray-200 rounded-[15px] flex flex-col items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <label htmlFor="fileInput" className="cursor-pointer ">
                  <div className="flex gap-2 items-center">
                    <h1>Choose file</h1>{" "}
                    <Image
                      src={"/icons/upload.svg"}
                      alt="upload"
                      width={25}
                      height={25}
                    />
                  </div>
                  <input
                    onChange={(e) => {
                      setPost({ ...post, postImage: e.target.files![0] });
                    }}
                    id="fileInput"
                    className="hidden"
                    type="file"
                  ></input>
                  {formError.noImageError && (
                    <div className="text-red-500">Image is required</div>
                  )}
                </label>
              </div>
            </div>
          )}
          {selectedPostType === "Link" && (
            <div className="flex gap-2 items-center mt-2 px-3 py-4">
              <input
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 hover:bg-gray-200 rounded-[15px]"
                type="text"
                placeholder="Link *"
              ></input>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={Loading}
        className={`bg-gray-500 p-2 text-white border rounded-[20px] mt-auto mb-[70px] ${
          Loading ? "cursor-not-allowed bg-gray-700" : ""
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePost;
