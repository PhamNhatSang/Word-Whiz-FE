import React,{useEffect,useState} from "react";
import { Input } from 'antd';

import { Button } from "@mui/material";
import axiosInstance from "../api/axios";
import { message } from "antd";
import { Dialog } from "primereact/dialog";
const { TextArea } = Input;

export default function FeedBackDialog({ visible,setVisible,header,width,testId,groupId }) {

    const [value, setValue] = useState('');

    const handleCreateFeedBack = async () => {
        try {
            await axiosInstance.post(`/api/learning/feedback`, {
                testId: testId,
                groupId: groupId,
                content: value
            });
            setVisible(false);
            setValue('');
            message.success(' Feedback success');
        } catch (e) {
            message.error(' Feedback failed');
            console.log(e);
        }
    }
    return (
        <Dialog
            header={header}
            disableEscapeKeyDown
            visible={visible}
            style={{ width: width || "50vw" }}
            onHide={() => setVisible(false)}
        >
            <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full mb-5"> <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled autosize"
        autoSize={{ minRows: 6, maxRows: 8 }}
      /></div>
           
      <Button   onClick={async ()=>{await handleCreateFeedBack() }}variant="contained">Contained</Button>

            </div>
        </Dialog>
    );
}