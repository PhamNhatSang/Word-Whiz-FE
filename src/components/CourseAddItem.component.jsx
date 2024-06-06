import React,{useState} from 'react';
import Switch from '@mui/material/Switch';
import axiosInstance from '../api/axios';
export default function CourseAddItem({course,handleAddCourse,handleRemoveCourse,groupId}) {
    const [checked, setChecked] = useState(course?.isAdded);
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const handleCourse = async () => {
        try{
          if(checked){
            const result = await axiosInstance.put(`/api/group/course`,{courseId:course.courseId,groupId:groupId});
            console.log(result);
            handleRemoveCourse(result?.data.courseId);
          }else{
            const result = await axiosInstance.post(`/api/group/course`,{courseId:course.courseId,groupId:groupId});
            console.log(result.data);
            handleAddCourse(result?.data);
          }
          setChecked(!checked);

        }catch(e){
            console.log(e);
        }

          
        
    }
    return (
     
          <div className="border-gray-300 w-full border rounded-lg mt-2  flex justify-between items-center">
            <div className="text-3xl p-4 font-semibold text-black" >{course.courseName}</div>
            <Switch {...label} defaultChecked checked={checked} onChange={async ()=>{await handleCourse()}} />
          </div>
    )
}