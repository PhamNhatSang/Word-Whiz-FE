import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FilterIcon from "@mui/icons-material/Filter";
import { IconButton } from "@mui/material";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import Avatar from "@mui/material/Avatar";
import image from "../assets/Web capture_2-5-2024_91421_www.logoai.com.jpeg";
import CreateDialog from "../components/CreateDialog.component";
import AddCoursePostDialog from "../components/AddCoursePostDialog.component";
import { Input, message } from "antd";
import { Spin } from "antd";
import { Toast } from "primereact/toast";
import CourseAddPostItem from "../components/CourseAddPostItem.component";
import axiosInstance from "../api/axios";
import PostItemComponent from "../components/PostItem.component";
import { useAuth } from "../context/AuthContext";

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

export default function CommunityPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddCourseDialog, setOpenAddCourseDialog] = useState(false);
  const [content, setContent] = useState("");
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const [listCourseToAdd, setListCourseToAdd] = useState([
    { courseId: 0, courseName: "Course 1", isInPost: false },
  ]);

  const [listPost, setListPost] = useState([
    {
      content: "",
      postId: 0,
      userId: 0,
      numberOfLikes: 0,
      numberOfComments: 0,
      userAvatar: "",
      userName: "",
      imageUrl: "",
      courses: [],
      isLiked: false,
    },
  ]);

  const showSuccess = (Message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: Message,
      life: 3000,
    });
  };

  const showError = (Message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: Message,
      life: 3000,
    });
  };

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [fileUrls, setFileUrls] = useState([]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFiles(file);

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFileUrls((prevUrls) => [...prevUrls, fileUrl]);
    }
  };

  const handleGetMorePost = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const res = await axiosInstance.get(`/api/community?page=${nextPage}`);
      const newPosts = res.data;
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        const newPostData=[]
        listPost.concat(newPosts).forEach((post) => {
          if (!newPostData.find((newPost) => newPost.postId === post.postId)) {
            newPostData.push(post);
          }
        });
          
        setListPost(newPostData);
        setPage(nextPage);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleUploadPost = async () => {
    try {
      setSelectedFiles(null);
    setFileUrls([]); // Clear the file URLs

    setOpenDialog(false);   
    setIsLoading(true);
      

      const formData = new FormData();
      formData.append("file", selectedFiles);
      formData.append("content", content);
      const listCourseId = [];
      listCourseToAdd.forEach((course) => {
        if (course.isInPost)  
        listCourseId.push(course.courseId);
      });
      formData.append("listCourseId", listCourseId);

      const response = await axiosInstance.post(
        "/api/community/post",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const newPost = response.data;
      setListPost((prevPosts) => [newPost, ...prevPosts]);
      message.success("Post uploaded successfully");
      setHasMore(true);
    } catch (e) {
      message.error("Upload post failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = async () => {
    try {
      const res = await axiosInstance.get(`/api/library/course-add-post`);
      setListCourseToAdd(res.data);
      setOpenAddCourseDialog(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setListCourseToAdd([]);
    setContent("");
    setFileUrls([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(`/api/community?page=${page}`);
        setListPost(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <Toast ref={toast} />
      <div
        className="create-post bg-white drop-shadow-lg rounded-lg"
        style={{ width: "36%" }}
      >
        <div className="p-2 flex flex-row justify-between">
          <Avatar alt="dsad" sx={{ width: 45, height: 45 }} src={user?.avatar} />
          <div
            className=" w-11/12  cursor-pointer  bg-blue-gray-50 hover:bg-blue-gray-100 rounded-r-full rounded-l-full flex flex-col justify-center"
            onClick={() => setOpenDialog(true)}
          >
            <div className="p-3 text-blue-gray-200">Share something today</div>
          </div>
        </div>
      </div>

      <CreateDialog
        visible={openDialog}
        handleClose={handleCloseDialog}
        header="Create Post"
        width={"35vw"}
      >
        <div className="card flex justify-content-center">
          <TextArea
            placeholder="Share something today"
            autoSize
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>

        <div className="w-full flex items-center justify-center">
          {fileUrls.map((fileUrl, index) => (
            <img
              key={index}
              src={fileUrl}
              alt={`preview-${index}`}
              className="max-w-full max-h-40 m-2"
            />
          ))}
        </div>
        <div>
          {listCourseToAdd.map(
            (course, index) =>
              course.isInPost && (
                <CourseAddPostItem
                  key={index}
                  course={course}
                  setListCourseToAdd={setListCourseToAdd}
                  listCourseToAdd={listCourseToAdd}
                  isSwitched={false}
                />
              )
          )}
        </div>
        <div className="flex flex-row">
          <IconButton component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            <FilterIcon color="success" />
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </IconButton>
          <IconButton
            component="label"
            variant="contained"
            onClick={async () => {
              await handleOpenDialog();
            }}
          >
            <CollectionsBookmarkIcon color="primary" />
          </IconButton>
        </div>
        <div
          className="w-full flex items-center justify-center"
          onClick={async () => {
            await handleUploadPost();
          }}
        >
          <Button className="w-full" variant="contained" disabled={content === ''}>
            Post
          </Button>
        </div>
      </CreateDialog>
      <AddCoursePostDialog
        visible={openAddCourseDialog}
        setVisible={setOpenAddCourseDialog}
        listCourseToAdd={listCourseToAdd}
        setListCourseAdd={setListCourseToAdd}
      />
     {isLoading ? (
    <div className="w-full flex mt-11 justify-center items-center">
      <Spin size="large" />
    </div>
  ) : (
    <>
      {Array.from(listPost).map((post, index) => (
        <PostItemComponent
          post={post}
          key={index}
          user={user}
          setListPost={setListPost}
          setIsLoading={setIsLoading}
          setHasMore={setHasMore}
          setPage={setPage}
        />
      ))}

      {loadingMore && (
        <div className="w-full flex mt-11 justify-center items-center">
          <Spin size="large" />
        </div>
      )}

      {hasMore ? (
        <div
          className="w-full flex mt-11 justify-center items-center"
          onClick={async () => {
            await handleGetMorePost();
          }}
        >
          <Button variant="text">Load more</Button>
        </div>
      ) : (
        <div className=" mt-4">There are no posts</div>
      )}
    </>
  )}
    </div>
  );
}
