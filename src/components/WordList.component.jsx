import React, { useState, useEffect ,useRef} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "@mui/material";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import { Link } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axiosInstance from "../api/axios";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
export default function WordList({
  selectedWord,
  setSelectedWord,
  setPage,
  words,
  courseId,
  inLibrary,
}) {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [isInLibrary, setIsInLibrary] = useState(inLibrary);  
  const toast = useRef(null);
  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };
  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 2000,
    });
  }
  const nagative = useNavigate();
  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 2000,
    });
  }
  const clearFilter = () => {
    setGlobalFilterValue("");
  };

  const handleAddToLibrary = async () => {
    try {
      await axiosInstance.post(`api/home/import/course/${courseId}`);
      setIsInLibrary(true);
      showSuccess("Add to library success");
    } catch (err) {
      console.log(err);
      showError("Add to library fail");
    }
  }

  const handleMoveToFlashCard = () => {
    if(words.length === 0){
      showError('No word in course')
      return;
    }
    nagative(`/library/course/${courseId}/flashcard`);
  }

  const handleMoveToTest = () => {
    if(words.length === 0){
      showError('No word in course')
      return;
    }
    nagative(`/library/course/${courseId}/test`);
  }

  

  const renderHeader = () => {
    return (
      <div className="flex  flex-row justify-between bg-default h-full">
        <Toast ref={toast} />
        <div className="flex flex-row">
          <div>
            
              <Button
                startIcon={<PaymentsOutlinedIcon></PaymentsOutlinedIcon>}
                variant="contained"
                onClick={handleMoveToFlashCard}
              >
                Flashcard
              </Button>
          </div>
          <div className="px-5">
              <Button
                startIcon={<QuizOutlinedIcon></QuizOutlinedIcon>}
                variant="contained"
                onClick={handleMoveToTest}
              >
                Test
              </Button>
          </div>
        </div>
        <div>
          {!isInLibrary ? (  <Button onClick={async ()=>{await handleAddToLibrary()}} startIcon={<FileDownloadIcon />}>Import Course</Button>):(<div className=" text-green-300"> In library</div>)}
        </div>
      </div>
    );
  };

  const handleSeletectedProduct = (e) => {
    setSelectedWord(e);
    setPage(words.indexOf(e));
  };
  return (
    <div className="card  drop-shadow-md">
      <DataTable
        value={words}
        scrollable
        scrollHeight="680px"
        selectionMode="single"
        selection={selectedWord}
        onSelectionChange={(e) => handleSeletectedProduct(e.value)}
        onPage={(e) => console.log(e)}
        dataKey="id"
        metaKeySelection={true}
        tableStyle={{ minWidth: "50rem" }}
        header={renderHeader}
      >
        <Column field="term" header="Term"></Column>
        <Column field="definition" header="Definition"></Column>
      </DataTable>
    </div>
  );
}
