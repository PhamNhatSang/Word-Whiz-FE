
import React from "react";
import { Avatar } from "@mui/material";
export default function CommentItem({ comment }) {
    return (
        <div className="comment-item flex flex-row">
        <Avatar alt="abc" src={comment?.userAvatar}></Avatar>
        <div className="comment-text mt-1 ml-3">
          <div className=" font-semibold"> {comment?.userName}</div>
          <div className="mt-2">{comment?.content}</div>
        </div>
      </div>
    );
    }