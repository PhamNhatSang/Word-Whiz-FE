import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState ,useRef} from "react";
import Button from '@mui/material/Button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { Toast } from "primereact/toast";
import axiosInstance from '../api/axios';
export default function ReviewItem({visible,setVisible,words,courseId}) {
    const toast = useRef(null);
    const nagative = useNavigate();
   const handleViewDetail = ()=>{
    console.log('view detail')
         nagative(`/library/course/${courseId}`)
    }

  const header = () =>{
    return (
        <div class="flex justify-between items-center ">
            <h2>List Terms</h2>
           <Button onClick={() =>handleViewDetail()} >View Detail</Button>
        </div>
    )
  }
    return (
        <div className="card flex justify-content-center items-center">
                              <Toast ref={toast} />

            <Dialog header={header} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <div className="card">
            <DataTable value={words} tableStyle={{ minWidth: '50rem' }}>
                <Column field="term"></Column>
                <Column field="definition" ></Column>
            </DataTable>
        </div>
            </Dialog>
        </div>
    )
}
        