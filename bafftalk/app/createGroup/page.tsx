"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Topic from "../components/Topic";
import { topics } from "../../data";
import { useAuth } from "../context/AuthContext";
import Success from "../components/Success";
import { Rule } from "@/types";

const CreateGroup = () => {
  const { GlobalUser } = useAuth();
  const [filteredTopics, setfilteredTopics] = useState(topics);
  const router = useRouter();
  const [selectedPostType, setSelectedPostType] = useState("Text");
  const [wordCount, setWordCount] = useState(0);
  const [chooseTopic, setChooseTopic] = useState(false);
  const [dropDownTopics, setDropDownTopics] = useState(false);
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maker, setMaker] = useState(GlobalUser?._id);
  const [photo, setPhoto] = useState(null);
  const [noNameError, setnoNameError] = useState(false);
  const [noDescError, setnoDescError] = useState(false);
  const [noTopicError, setnoTopicError] = useState(false);
  const [success, setsuccess] = useState(false);
  const [successMessage, setsuccessMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [numberOfRules, setNumberOfRules] = useState(0);
  const [rules, setRules] = useState<Rule[]>([]);
  const handleFileChange = (e: React.ChangeEvent<any>) => {
    setPhoto(e.target.files[0]);
  };
  const handlebutton = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setChooseTopic(true);
    setDropDownTopics(true);
  };
  const handleClickAnywhere = () => {
    // setChooseTopic(false);
    // setTopic("")
  };
  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    setfilteredTopics(topics);
    e.stopPropagation();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setWordCount(inputText.length);
    setName(inputText);
  };
  const handleTopicChange = (topic: any, e: React.ChangeEvent<any>) => {
    e.stopPropagation();
    setTopic(topic.name);
    setDropDownTopics(false);
  };
  const filterTopics = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropDownTopics(true);
    let filteredData = topics.filter((topic) =>
      topic.name.toLowerCase().includes(e.target.value)
    );
    setfilteredTopics(filteredData);
    setTopic(e.target.value);
  };
  const handleTopicInuputClick = () => {
    setTopic("");
    setDropDownTopics(true);
  };
  const resetActions = () => {
    setfilteredTopics(topics);
    setChooseTopic(false);
    setTopic("");
    setDropDownTopics(false);
  };
  const handleNumberOfRulesChange = (e: any) => {
    const count = parseInt(e.target.value || 0);
    setNumberOfRules(count);
    const newRules: Rule[] = [];
    console.log(numberOfRules);

    for (let i = 0; i < count; i++) {
      newRules.push({
        name: "",
        description: "",
      });
    }
    setRules(newRules);
  };
  const handleRuleChange = (
    field: "name" | "description",
    value: string,
    index: number
  ) => {
    const updatedRules = [...rules];
    console.log(updatedRules);

    updatedRules[index - 1][field] = value;
    console.log(updatedRules);
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!name) {
        setnoNameError(true);
        setTimeout(() => {
          setnoNameError(false);
        }, 2000);
      }
      if (!description) {
        setnoDescError(true);
        setTimeout(() => {
          setnoDescError(false);
        }, 2000);
      }
      if (!topic) {
        setnoTopicError(true);
        setTimeout(() => {
          setnoTopicError(false);
        }, 2000);
      }
      setisLoading(true);

      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      if (photo) {
        formdata.append("file", photo);
      }
      formdata.append("topic", topic);
      formdata.append("maker", maker);
      formdata.append("rules", JSON.stringify(rules));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group`,
        {
          method: "POST",
          body: formdata,
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setisLoading(false);
        setsuccess(true);
        setsuccessMessage("You have successfully created a new group");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={handleClickAnywhere}
      className="h-screen overflow-auto flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px] xl:w-[calc(100vw-255px-355px)] xl:ml-[255px] xl:mr-[355px]"
    >
      <div className="p-6 flex flex-col ">
        {success && (
          <Success
            closeModal={() => setsuccess(false)}
            message={successMessage}
          />
        )}
        <div className="flex items-center">
          <strong className="text-2xl ">Create Group</strong>
          <button
            onClick={() => {
              router.push("/createPost");
            }}
            className="ml-auto p-2 bg-white rounded-[20px] flex items-center text-black border border-gray-600"
          >
            <Image
              src={"/images/plus.svg"}
              width={30}
              height={30}
              alt="createGroup"
            />
            Create Post
          </button>
        </div>
        <div className="mt-2 relative">
          <button
            onClick={handlebutton}
            className={`px-2 py-1 border border-black rounded-[25px] bg-gray-200 flex items-center gap-2 ${
              !chooseTopic && topic === "" ? "" : "hidden"
            }`}
          >
            <Image
              src={"/images/topic.svg"}
              alt="topic"
              height={25}
              width={25}
            />
            <span>Choose Topic</span>
            <Image
              className="ml-auto"
              src={"/images/arrowDown.svg"}
              alt="topic"
              height={25}
              width={25}
            />
          </button>
          {noTopicError && (
            <span className="px-6 py-2 text-red-600 font-bold">
              Please provide topic
            </span>
          )}

          <div
            className={`relative w-[50%] p-2 ${
              chooseTopic ? "block" : "hidden"
            }`}
            onClick={handleInputClick}
          >
            <div
              onClick={handleTopicInuputClick}
              className="rounded-[25px] bg-gray-200 py-2 pl-5 pr-4 w-full flex items-center gap-2 "
            >
              <Image
                src={"/images/topic.svg"}
                width={20}
                height={20}
                alt={topic}
              />
              {topic ? `${topic}` : "topic"}
            </div>
          </div>

          {dropDownTopics && (
            <div className=" mt-2 w-[300px] shadow-lg z-50 border-black flex flex-col rounded-[10px]">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <strong>Topics</strong>

                  <button
                    className="ml-auto text-red-600"
                    onClick={resetActions}
                  >
                    cancel
                  </button>
                </div>
                <div
                  className={`relative w-full p-2 ${
                    chooseTopic ? "block" : "hidden"
                  }`}
                  onClick={handleInputClick}
                >
                  <input
                    type="text"
                    onClick={handleTopicInuputClick}
                    value={topic}
                    onChange={filterTopics}
                    placeholder="Search Topic"
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
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.name}
                    onClick={(e) => handleTopicChange(topic, e)}
                  >
                    <Topic
                      key={topic.name}
                      name={topic.name}
                      photo={topic.photo}
                    />
                  </div>
                ))}
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
              onClick={() => setSelectedPostType("Rules")}
              className="font-bold hover:border hover:bg-gray-300 p-2 cursor-pointer relative text-sm "
            >
              Rules
              <div className="absolute bottom-0 left-0 w-full flex flex-col items-center">
                <hr
                  className={`mb-auto  border-t-[5px] border-blue-800 my-2 w-[80%] ${
                    selectedPostType === "Rules" ? "" : "hidden"
                  }`}
                ></hr>
              </div>
            </div>
          </div>

          {selectedPostType === "Text" && (
            <div>
              <div className="flex gap-2 items-center mt-2 px-3 py-4 relative">
                <input
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 hover:bg-gray-200 rounded-[15px]"
                  type="text"
                  placeholder="Group title *"
                ></input>
                <div className="absolute right-3 bottom-[-5px] text-[12px] ">
                  {wordCount}/300
                </div>
              </div>
              {noNameError && (
                <span className="px-6 py-2 text-red-600 font-bold">
                  Please provide title
                </span>
              )}
              <div className="mt-2 px-3 py-4 flex flex-col  gap-2">
                <label className="p-2 font-bold">Group description</label>
                <textarea
                  className="h-[150px] px-4 py-2 rounded-[20px] border border-black "
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="description"
                  value={description}
                />

                {noDescError && (
                  <span className="px-3 py-2 text-red-600 font-bold">
                    Please provide description for your group
                  </span>
                )}
              </div>
            </div>
          )}
          {selectedPostType === "Images & videos" && (
            <>
              <label className="p-2 font-bold">Group Image</label>
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
                      id="fileInput"
                      className="hidden"
                      type="file"
                      onChange={handleFileChange}
                    ></input>
                  </label>
                </div>
              </div>
            </>
          )}
          {selectedPostType === "Rules" && (
            <div className="flex flex-col gap-1">
              <div>
                <input
                  onChange={handleNumberOfRulesChange}
                  min={0}
                  className="px-4 py-2 rounded-[20px] bg-gray-50 border border-black"
                  type="number"
                  placeholder="number of rules"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                {Array.from(
                  { length: numberOfRules },
                  (_, index) => index + 1
                ).map((value) => (
                  <div className="flex flex-col gap-2" key={value}>
                    <span className="font-bold text-lg text-gray-500 ">
                      Rule number {value} :
                    </span>
                    <input
                      onChange={(e) => {
                        handleRuleChange("name", e.target.value, value);
                      }}
                      className="px-4 py-2 rounded-[15px] bg-gray-50 border border-black"
                      type="text"
                      placeholder="Rule name"
                    ></input>
                    <textarea
                      onChange={(e) =>
                        handleRuleChange("description", e.target.value, value)
                      }
                      className="px-4 py-2 rounded-[15px] bg-gray-50 border border-black"
                      placeholder="Rule description"
                    ></textarea>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className={`bg-gray-500 p-2 text-white border rounded-[20px] mt-auto mb-[70px] ${
          isLoading ? "cursor-not-allowed bg-gray-700" : ""
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default CreateGroup;
