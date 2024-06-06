import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axios";
import CarouselItem from "../components/CarouselCourse.component";
import AddCourseDialog from "../components/AddCourseDialog.component";
import { Spin } from "antd";
import { useAuth } from "../context/AuthContext";
export default function HomePage() {
  const { accessToken, setToken, logout } = useAuth();
  const [topCourse, setTopCourse] = useState([]);
  const [newCourse, setNewCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [continueCourse, setContinueCourse] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fechUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/api/home");
        setTopCourse(response.data?.topCourse);
        setNewCourse(response.data?.newCourse);
        setContinueCourse(response.data?.continueCourse);
        console.log(response.data);
      } catch (error) {
        if (error.response.status === 401) logout();
      } finally {
        setIsLoading(false);
      }
    };
    if (accessToken) fechUserData();
  }, [accessToken]);
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full mx-auto max-w-screen-2xl	 p-1 md:flex md:items-center md:justify-between">
          <div className="w-full  md:items-center ">
            <div className="w-1/5"></div>
            <AddCourseDialog></AddCourseDialog>

            <CarouselItem courses={topCourse} courseType={"Top Courses"} />
            <CarouselItem courses={newCourse} courseType={"New Courses"} />
            <CarouselItem
              courses={continueCourse}
              courseType={"Continue courses learning"}
            />

          </div>
        </div>
      )}
    </div>
  );
}
