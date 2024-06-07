import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import axiosInstance from "../api/axios";
import ReviewItem from "./ReviewItem.component";
export default function CourseAddPostItem({
  course,
  handleAddCourse,
  handleRemoveCourse,
  isSwitched,
}) {
  const [checked, setChecked] = useState(course?.isInPost);
  const label = { inputProps: { "aria-label": "Size switch demo" } };
  const [visible, setVisible] = useState(false);
  const [words, setWords] = useState([]);

  const handleCourse = () => {
    try {
      if (checked) {
        handleRemoveCourse(course?.courseId);
      } else {
        handleAddCourse(course?.courseId);
      }
      setChecked(!checked);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenReviewItem = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/course/${course?.courseId}`
      );
      setWords(response.data?.words);
      setVisible(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full">
      {!isSwitched&& <ReviewItem
        visible={visible}
        setVisible={setVisible}
        words={words}
        courseId={course?.courseId}
      ></ReviewItem>}

      <div
        className="border-gray-300 w-full border rounded-lg mt-2  flex justify-between items-center cursor-pointer hover:border-gray-800"
        onClick={async () => {
          await handleOpenReviewItem();
        }}
      >
        <div className="text-3xl p-4 font-semibold text-black">
          {course?.courseName}
        </div>
        {isSwitched && (
          <Switch
            {...label}
            defaultChecked
            checked={checked}
            onChange={handleCourse}
          />
        )}
      </div>
    </div>
  );
}
