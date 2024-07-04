import { cookies } from "next/headers";

export function login (){
    
    cookies().set('name', 'lee')
    

}