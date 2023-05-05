
export interface Message{
    id:string;
    topicId:string|undefined;
    userId:string |undefined;
    createDate:number;
    content:string;
}