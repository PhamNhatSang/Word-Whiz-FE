import React,{useEffect,useState} from "react";
import { TextArea } from 'antd';
import FeedbackItem from "./FeedbackItem.component";
import { Dialog } from "primereact/dialog";

export default function ViewFeedBackDialog({ visible,setVisible,header,width,feedbacks }) {

    return (
        <Dialog
            header={header}
            disableEscapeKeyDown
            visible={visible}
            style={{ width: width || "50vw" }}
            onHide={() => setVisible(false)}
        >
            <div className="flex flex-col items-center justify-center">
            {
                feedbacks.map((feedback)=>{
                    return <FeedbackItem  feedback={feedback}></FeedbackItem>
                })
            }
          
            </div>
        </Dialog>
    );
}