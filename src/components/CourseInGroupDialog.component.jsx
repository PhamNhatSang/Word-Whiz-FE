import React, { useState } from 'react';

import { Dialog } from "primereact/dialog"
import CourseItemInGroup from "./CourseItemInGroup.component"
import { Button, Modal } from 'antd';
import axiosInstance from '../api/axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function CourseInGroupDialog({listCourseInGroup, visible, handleChoose,setVisible,setChoice,groupId}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseId, setCourseId] = useState(null);
    const [terms , setTerms] = useState(0);
    const navigate = useNavigate();
    const handleClose = () => {

        setVisible(false);
    }

    const showModal = (course) => {
     

       setTerms(course?.terms);
      setCourseId(course?.course_id);
        setVisible(false);
        setIsModalOpen(true);

      };
      const handleCreateTest = async () => {
        try{
          if(terms != 0){
            console.log(courseId);
            console.log(groupId);
        await axiosInstance.post('/api/learning/test-create/default',{courseId:courseId,groupId:groupId});
        await setChoice('tests');
          }else{
            message.error('This course has no terms');
          }
          
        setIsModalOpen(false);
        }catch(e){

        }
      };
      const handleCreateTestEddit = () => {
        navigate(`/group/${groupId}/test-edit/${courseId}`);
        setIsModalOpen(false);
      };

      const closeMoadl = () => {
        setIsModalOpen(false);
      }

      const Footer = ( )=>{
        return(
            <div className='w-full flex justify-center'>
                <Button className='mr-3' key="back" type="primary" onClick={handleCreateTestEddit}>
                    Create by yourself
                </Button>
                <Button key="submit" type="primary" onClick={ async ()=>{await handleCreateTest()}}>
                    Create default
                </Button>
            </div>
        )
      }
        
  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Select course to create test"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => handleClose()}
      >
     
        <div className="py-3 flex flex-col justify-center items-center">
          {listCourseInGroup?.map((course) => (
            <div className='w-full cursor-pointer' onClick={()=>showModal(course)}>            <CourseItemInGroup  course={course}></CourseItemInGroup>
           
</div>
          ))}
          
        </div>
      </Dialog>

      <Modal title="Choose your type of test" open={isModalOpen} centered={true} footer={<Footer></Footer>} onCancel={closeMoadl} >
        
        </Modal>

     
    </div>

        )
    }