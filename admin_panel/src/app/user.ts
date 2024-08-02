export interface User {
    _id?: string;
    username?: string;
    email?:string;
    avatar?:string;
    googleId?:string;
    links?:Array<string>;
    createdAt?:string;
    role?:string;
    postCount?:number;
}
