"use client"
import React, { useEffect, useState } from 'react'
import GroupComponent from '../components/GroupComponent'
import { Group } from '@/types';
import { useAuth } from '../context/AuthContext';

const JoinedGroups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const {GlobalUser} = useAuth();
    const fetchGroups = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/joined/${GlobalUser?._id}`
            );
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchGroups();

    }, []);
  return (
    <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px]">
        <div className='text-xl font-bold flex items-center justify-center  mt-2 '>
            MY GROUPS

        </div>
        <div className='flex flex-col gap-2'>
            <span className='font-bold'>My groups</span>
            <span className='text-sm text-gray-500'>Browse Groups you have joined
            </span>
            <div className='grid grid-cols-4  py-2 px-3 mt-4'>
                {groups.map((group, index) => (
                    <GroupComponent key={group?._id} index={index + 1} image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/photo/${group?._id}`} groupName={group?.name} groupCategory={group?.topic} groupMembers={group?.members.length} link={`/group/${group?._id}`} />
                ))}



            </div>

        </div>
        </div>

  )
}

export default JoinedGroups