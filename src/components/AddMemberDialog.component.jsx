import React, { useState,useRef } from "react";
import { Dialog } from "primereact/dialog";
import { TextField, Button } from "@mui/material";
import axiosInstance from "../api/axios";
import { Toast } from "primereact/toast";
export default function AddMemberDialog({ visible, setVisible,handleAddMember,groupId }) {
  const Header = ({ text }) => {
    return <h1 className="text-sm">{text}</h1>;
  };

  const toast = useRef(null);
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

  const [listEmail, setListEmail] = useState("");
  const label = { inputProps: { "aria-label": "Size switch demo" } };
  const handleAddMem = async () => {
    try {
      const arrayEmail = listEmail.split(/[ ,;:'\]\[\)\(]+/);
      const result = await axiosInstance.post(`api/group/student`, {
        emails: arrayEmail,
        groupId: groupId,
      });
      handleAddMember(result?.data);
      setListEmail("");
      setVisible(false);
      showSuccess("Add member successfully");
    } catch (e) {
      showError("Add member failed");
      console.log(e);
    }
  }
 

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Dialog
        header="Add Members"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div>
          <div>Please insert user's email to add user</div>
          <div className="py-3 flex flex-row">
            <TextField
              id="email"
              label="Email"
              variant="standard"
              sx={{ width: "70%" }}
              value={listEmail}
              onChange={(e) => setListEmail(e.target.value)}

            />
            <div className="py-7 px-4">
            <Button  variant="contained" size="small" onClick={async ()=>{await handleAddMem()}}>Add Member</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
