import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Select, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import CourseAddItem from "./CourseAddItem.component";
import { useNavigate } from "react-router-dom";
import CourseAddPostItem from "./CourseAddPostItem.component";
export default function AddCoursePostDialog({ visible, setVisible,listCourseToAdd,setListCourseAdd}) {
  const Header = ({ text }) => {
    return <h1 className="text-sm">{text}</h1>;
  };
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };
  const navigate = useNavigate();
 const handleClose = () => {
    setVisible(false);

  };

    const handleAddCourse = (courseId) => {
        const newCourse = listCourseToAdd.map((course) => {
            if (course.courseId === courseId) {
              course.isInPost = true;
                return course 
            }
            return course;
        });
        console.log(newCourse);
        setListCourseAdd(newCourse);
    }

    const handleRemoveCourse = (courseId) => {
        const newCourse = listCourseToAdd.map((course) => {
            if (course.courseId === courseId) {
              course.isInPost = false;
                return course
            }
            return course;
        });
        console.log(newCourse);
        setListCourseAdd(newCourse);
    }


  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Add Course"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => handleClose()}
      >
     
        <div className="py-3 flex flex-col justify-center items-center">
          {listCourseToAdd?.map((course) => (
            <CourseAddPostItem course={course} handleAddCourse={handleAddCourse} handleRemoveCourse={handleRemoveCourse} isSwitched={true}></CourseAddPostItem>
          ))}
         
          
        </div>
      </Dialog>
    </div>
  );
}
