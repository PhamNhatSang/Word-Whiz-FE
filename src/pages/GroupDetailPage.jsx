import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import React, { useEffect, useState,useRef } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import CourseItem from "../components/CourseItem.component";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Select, MenuItem, Avatar } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import AddCourseDialog from "../components/AddCourseDialog.component";
import AddMemberDialog from "../components/AddMemberDialog.component";
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import ItemText from "../components/ItemText.component";
import { useAuth } from "../context/AuthContext";
import image from "../assets/Web capture_2-5-2024_91421_www.logoai.com.jpeg";
import { Toast } from "primereact/toast";

export default function GroupDetailPage() {
  const [choice, setChoice] = useState("courses");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addMemberVisible, setAddMemberVisible] = useState(false);
  const [group, setGroup] = useState(null);
  const [courseInGroup, setCourseInGroup] = useState([]);
  const [listCourseToAdd, setListCourseToAdd] = useState([]);
  const [studentInGroup, setStudentInGroup] = useState([]);
  const { user } = useAuth();
  const {groupId}= useParams();
  const toast = useRef(null);
  const handleChange = (event) => {
    console.log(event.target.value);
    setChoice(event.target.value);
  };

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

  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const Title = ({ text }) => {
    return <h1 className="text-sm">{text}</h1>;
  };
  const handleListCourseToAdd = async () => {
   setVisible(true);
    try {
      const res = await axiosInstance.get(`api/library/course-add-group/${groupId}`);
      setListCourseToAdd(res.data);
    } catch (e) {
      console.log(e);
    }
    

  }
  
  const handleAddCourse=(course)=>{
      setCourseInGroup([...courseInGroup,course]);
      console.log(course);
      console.log(listCourseToAdd)
      let list = listCourseToAdd.map((item)=>{if(item.courseId==course.course_id){
        return { ...item, isAdded: true };
      }else{ return item;}
      });
      console.log(list);
      setListCourseToAdd(list);
  }
  const handleRemoveCourse=(courseId)=>{
    setCourseInGroup(courseInGroup.filter(course=>course.course_id!==courseId));
    console.log(listCourseToAdd)
    let list = listCourseToAdd.map((item)=>{if(item.courseId==courseId){
      return { ...item, isAdded: false };
    }
    return item;
  } );
    console.log(list);
    setListCourseToAdd(list);
  }

  const handleAddMember=(student)=>{
    setStudentInGroup([...studentInGroup,...student]);
    setChoice('members');
  }
  const handleRemoveMember= async (email)=>{
    try{
    const result = await axiosInstance.put(`/api/group/student`,{groupId,email});
    setStudentInGroup(studentInGroup.filter(student=>student.student_email!==result?.data.email));
    showSuccess("Remove member successfully");
    }catch(e){
      showError("Remove member failed");
      console.log(e);
    }
  }

  useEffect(() => {

    async function fetchData() {
      try {
        const res = await axiosInstance.get(`/api/group/${groupId}`);
        console.log(res.data);
        setGroup(res.data);
        setCourseInGroup(res.data?.courses);
        setStudentInGroup(res.data?.students);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  },[])
  return (
    <div className=" py-4 px-60 ">
      <Toast ref={toast} />
      <div className="flex flex-row items-center ">
        <div>
          <GroupOutlinedIcon
            sx={{ height: 70, width: 70 }}
            color="disabled"
          ></GroupOutlinedIcon>
        </div>
        <h1 className="text-3xl font-semibold">{group?.group_name}</h1>
      </div>
      <div className="flex flex-row items-center ">
        <Tooltip title={<Title text={"Add courses"}></Title>}>
          <IconButton color="primary" onClick={async () =>{await handleListCourseToAdd()} }>
            <AddOutlinedIcon sx={{ height: 35, width: 35 }}></AddOutlinedIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title={<Title text={"Add members"}></Title>}>
          <IconButton color="primary" onClick={()=>setAddMemberVisible(true)}>
            <GroupAddOutlinedIcon
              sx={{ height: 35, width: 35 }}
            ></GroupAddOutlinedIcon>
          </IconButton>
        </Tooltip>
        <AddCourseDialog
          visible={visible}
          setVisible={setVisible}
          listCourseToAdd={listCourseToAdd}
          handleAddCourse={handleAddCourse}
          handleRemoveCourse={handleRemoveCourse}
          groupId={groupId}
        ></AddCourseDialog>
        <AddMemberDialog
          visible={addMemberVisible}
          setVisible={setAddMemberVisible}  
          handleAddMember={handleAddMember}
          groupId={groupId}
        ></AddMemberDialog>
      </div>
      <div className="w-full py-4">
        {" "}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={choice}
            label="Status"
            onChange={handleChange}
            className="bg-white"
          >
           
            <MenuItem value={'courses'}>Courses</MenuItem>
            <MenuItem value={'members'}>Members</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-row  py-10 w-full">
        <div className="w-full" style={{ maxWidth: "70%" }}>

          {choice === "courses" ? (
            <div> <div>Courses</div> 
            {courseInGroup.map((course) => (
              <Link to={`/library/course/${course.course_id}`}> <CourseItem course={course}></CourseItem></Link>
            ))}</div>
          ) : (
            <div>  <div>Members</div> 

            
            <div className="w-full bg-white drop-shadow-lg mt-4"> <div className="p-4 flex flex-row items-center justify-between">
              <div className="member flex flex-row items-center ">
  
                <Avatar src={group?.owner_avatar} alt="avc" sx={{width:50,height:50}}></Avatar>
                <div className="  text-xl ml-2 mr-2 ">{group?.owner_name}</div>
                <ItemText text={'Admin'}></ItemText>
              </div>
              </div></div>
              {studentInGroup.map((student) => (
                    <div className="w-full bg-white drop-shadow-lg mt-4"> <div className="p-4 flex flex-row items-center justify-between">
                    <div className="member flex flex-row items-center ">
        
                      <Avatar src={student.student_avatar} alt="avc" sx={{width:50,height:50}}></Avatar>
                      <div className="  text-xl ml-2 ">{student.student_name}</div>
                    </div>
                    {user?.id===group?.owner_id&&<IconButton onClick={async ()=>{await handleRemoveMember(student.student_email) }}><DeleteIcon  style={{color:'red'}}></DeleteIcon></IconButton>}
                    </div></div>
                ))}
          
              
              </div>
          )}

            
        </div>
        <div className="py-4 px-10  flex flex-col" style={{ maxWidth: "30%" }}>
          <div className="text-xl ">Class Detail</div>
          <div className="py-4 flex flex-row ">
            <AutoAwesomeMotionOutlinedIcon></AutoAwesomeMotionOutlinedIcon>
            <div className="px-4 text-gray-500 break-all">
             {courseInGroup.length+" courses"}
            </div>
          </div>
          <div className="py-4 flex flex-row">
            <PeopleAltOutlinedIcon></PeopleAltOutlinedIcon>
            <div className="px-4 text-gray-500 break-all">{studentInGroup.length+" students"}</div>
          </div>
          <div className="py-4 flex flex-row">
            <InfoOutlinedIcon></InfoOutlinedIcon>
            <div className="px-4 text-gray-500 break-all">{group?.description}</div>
          </div>

          <div className="py-4 flex flex-row">
            <CodeOutlinedIcon></CodeOutlinedIcon>
            <div className="px-4 text-gray-500 break-all">{group?.code}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
