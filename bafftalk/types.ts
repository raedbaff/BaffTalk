export interface Group {
    _id:string,
    name:string,
    description:string,
    maker:string,
    topic:string,
    members:Array<string>,
    groupCoverImage?:string
    rules:Array<Rule>
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
    createdAt:string | number | Date
    comments?:Array<string>,
    upvotes?:Array<string>,
    downvotes?:Array<string>,
}
export interface FormPost {
    title:string,
    description:string,
    maker:string | Blob,
    group:string | Blob,
    postImage?:any,
    createdAt?:string | number | Date
}
export interface CommentInter {
    _id:string,
    content:string,
    maker:User,
    post:PostType,
    upvotes : Array<string>,
    downvotes : Array<string>,
    createdAt:string | number | Date
}