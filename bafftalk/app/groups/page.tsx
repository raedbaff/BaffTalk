"use client"
import React, { useEffect, useState } from 'react'
import GroupComponent from '../components/GroupComponent'
import { Group } from '@/types';

const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const fetchGroups = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/group`
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
            Best of Bafftalk

        </div>
        <div className='flex flex-col gap-2'>
            <span className='font-bold'>All groups</span>
            <span className='text-sm text-gray-500'>Browse Bafftalks largest groups
            </span>
            {groups?.length > 0 ? (
 <div className='grid grid-cols-4  py-2 px-3 mt-4'>
 {groups.map((group, index) => (
     <GroupComponent key={group?._id} index={index + 1} image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/photo/${group?._id}`} groupName={group?.name} groupCategory={group?.topic} groupMembers={group?.members.length} link={`/group/${group?._id}`} />
 ))}



</div>
            ):(
                <div className='flex items-center justify-center w-full h-40'>
                    <span className='text-gray-500 text-3xl'>No groups found</span>
                </div>
            )}
           

        </div>
        </div>

  )
}

export default Groups