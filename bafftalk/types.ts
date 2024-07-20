export interface Group {
    _id:string,
    name:string,
    description:string,
    maker:string,
    topic:string,
    members:[any],
    groupCoverImage?:string
    rules:[Rule]
}
export interface User {
    _id:string,
    username:string,
    email:string,
    avatar:string,
    googleId:string,
    links:[string]

}
export interface Rule {
    _id?:string
    name:string,
    description:string
}
export interface PostType {
    _id?:string,
    title:string,
    description:string,
    maker:User,
    group:Group ,
    postImage?:any,
    createdAt?:any,
}
export interface FormPost {
    title:string,
    description:string,
    maker:string | Blob,
    group:string | Blob,
    postImage?:any,
    createdAt?:any,
}