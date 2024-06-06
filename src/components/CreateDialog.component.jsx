import { Dialog } from "primereact/dialog";

export default function CreateDialog({visible,handleClose,header,children,width}) {
    return (
        <Dialog
          header={header}
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