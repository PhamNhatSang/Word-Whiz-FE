import { Dialog } from "primereact/dialog";
import { DialogContent } from "@mui/material";
export default function CreateDialog({visible,handleClose,header,children,width}) {
    return (
        <Dialog
          header={header}
          disableEscapeKeyDown
          visible={visible}
          style={{ width: width || "50vw"}}
          onHide={()=>handleClose()}
        >
          <div>
            {children}
          </div>
        </Dialog>
      );
}