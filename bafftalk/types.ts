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
export interface Rule {
    _id?:string
    name:string,
    description:string
}