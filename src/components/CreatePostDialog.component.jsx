import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { TextField } from "@mui/material";
import Input from "@mui/material/Input";
export default function CreatePostDialog({visible, setVisible }) {
    const [value, setValue] = useState('');

    return (
        <Dialog
        header={'Create Post'}
        visible={visible}
        style={{ width: "35vw" }}
        onHide={() => setVisible(false)}
      >
        <div>
        <div className="card flex justify-content-center">
        <Input 
        className="w-full"
          id="outlined-multiline-flexible"
          multiline
          maxRows={200}
        />
        </div>
        </div>
      </Dialog>
    )
}