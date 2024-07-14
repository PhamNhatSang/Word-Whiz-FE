import { Avatar } from "@mui/material";
import ItemText from "./ItemText.component";

export default function FeedbackItem({ feedback }) {
    return (
        <div className="w-full border rounded-lg flex flex-col m-5">
           <div className="flex flex-row items-center pl-4 pb-2 pt-2">
            <Avatar src={feedback?.userAvatar}></Avatar>
            <div>
            
            <div className="ml-3 mr-3"> <div>{feedback?.userName}</div> <div><ItemText text={"Teacher"} color="orange"></ItemText></div> </div>
            <div className="ml-3 text-xs"> {"At "+feedback?.createdAt}</div>
            </div>

           </div>
           <div className="mt-4 text-gray-500  pl-4">
           <em>{feedback?.content}</em>
           </div>
        </div>
    )
}