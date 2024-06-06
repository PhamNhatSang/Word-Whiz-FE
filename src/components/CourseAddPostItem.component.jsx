import React,{useState} from 'react';
import Switch from '@mui/material/Switch';
import axiosInstance from '../api/axios';
export default function CourseAddPostItem({course,handleAddCourse,handleRemoveCourse ,isSwitched}) {
    const [checked, setChecked] = useState(course?.isInPost);
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const handleCourse = () => {
        try{
          if(checked){
          
            handleRemoveCourse(course?.courseId);
          }else{
            
            handleAddCourse(course?.courseId);
          }
          setChecked(!checked);
        }catch(e){
            console.log(e);
        }
        
    }
    return (
     
          <div className="border-gray-300 w-full border rounded-lg mt-2  flex justify-between items-center">
            <div className="text-3xl p-4 font-semibold text-black" >{course?.courseName}</div>
            {isSwitched && <Switch {...label} defaultChecked checked={checked} onChange={handleCourse}/>}
           
          </div>
    )
}