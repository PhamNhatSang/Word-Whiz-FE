
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import image from "../assets/Web capture_2-5-2024_91421_www.logoai.com.jpeg";
import SendIcon from "@mui/icons-material/Send";

import { Input } from "antd";
import { Image } from "antd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import axiosInstance from "../api/axios";
import CourseAddPostItem from "./CourseAddPostItem.component";
import ReviewItem from "./ReviewItem.component";
import CommentItem from "./CommentItem.component";
const { TextArea } = Input;
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


export default function PostItemComponent({ post,user }){

  const [openComment, setOpenComment] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [content, setContent] = useState("");
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [listComment, setListComment] = useState([{content:'',
    commentId:0,
    userId: 0,
    userAvatar:'',
    userName:'',}])
  const handleOpenComment = async () => {  

if(!openComment){
  const result = await axiosInstance.get(`/api/community/post/comment/${post?.postId}`)
  setListComment(result.data)
  };

    setOpenComment(!openComment);
}



  const handleAddComment = async () => {
    try{
      if(content === '') return
      const result =await axiosInstance.post(`/api/community/post/comment`,{postId:post?.postId,content:content})
      setListComment([...listComment,result.data])
      setOpenComment(true)
      setContent('')
    }
    catch(e){
      console.log(e)
    }
  }

  const handleLikePost = async () => {
    try {
      setIsLiked(!isLiked);
      await axiosInstance.post(`/api/community/post/like/${post?.postId}`, { isLiked:!isLiked });
    } catch (e) {
      setIsLiked(isLiked);
      console.log(e);
    }
  }
    return (  <div
        className=" mt-20 flex flex-col items-center"
        style={{ width: "36%" }}
      >
        <div className="bg-white w-full  rounded-lg drop-shadow-lg">
          <div className="w-full p-4">
            <div className="header flex flex-row items-center">
              <div>
                <Avatar alt="abc" src={post?.userAvatar}></Avatar>
              </div>
              <div className="px-2">{post?.userName}</div>
            </div>

            <div className="content mt-3">
              <div>{post?.content}</div>
              <div>

                {post?.imageUrl && ( <div className="w-full">
                   
                   <Image
                     preview={false}
                     className="w-full h-40"
                     key={post?.id}
                     src={post?.imageUrl}
                     alt={`Uploaded ${post?.id}`}
                     style={{ maxWidth: "100%" }}
                   />
                 
               </div>)}
              </div>

              {post?.courses.map((course) => (
               <CourseAddPostItem course={course} isSwitched={false}></CourseAddPostItem>
              ))}
            </div>

            <div className={`react  mt-2 ${openComment ? "border-b-2" : ""}`}>
              <IconButton component="label" variant="contained" style={{ color: isLiked ? 'red' : 'gray' }} onClick={async () =>{await handleLikePost()}}>
                <FavoriteIcon></FavoriteIcon>
              </IconButton>
              <IconButton
                onClick={async () =>{await handleOpenComment()}}
                component="label"
                variant="contained"
              >
                <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
              </IconButton>
            </div>
            {openComment && (
              <div
                className="comment list overflow-y-scroll scrollbar-hide"
                style={{ maxHeight: "35rem" }}
              >
                {listComment&&listComment.map((comment) => (
                  <CommentItem comment={comment}></CommentItem>
                ))}
              </div>
            )}

            <div
              className={`comment flex flex-row items-center  justify-between mt-1  ${openComment ? "border-t-2" : ""}`}
            >
              <div className="">
                <Avatar alt="abc" src={user?.avatar}></Avatar>
              </div>
              <div className="w-10/12">
                <TextArea className="" placeholder="Comment" autoSize onChange={(e)=>setContent(e.target.value)} value={content}/>
              </div>
              <IconButton
                component="label"
                variant="contained"
                onClick={ async () => (await handleAddComment())}
              >
                <SendIcon color="primary"></SendIcon>
              </IconButton>
            </div>
          </div>
        </div>
      </div>)
}