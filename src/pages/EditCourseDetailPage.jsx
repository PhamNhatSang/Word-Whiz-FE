import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
export default function EditCourseDetailPage() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    id: null,
    createdAt: "",
    updatedAt: "",
    title: "",
    description: "",
    accessiblity: "",
    words: [],
    isInLibrary: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCourse({ ...course, [id]: value });
  };

  const handleWordChange = (index, e) => {
    const { id, value } = e.target;
    const newWords = [...course.words];
    newWords[index][id] = value;
    setCourse({ ...course, words: newWords });
  };

  const addWord = () => {
    setCourse({
      ...course,
      words: [
        ...course.words,
        { term: "", definition: "" },
        { term: "", definition: "" },
        { term: "", definition: "" },
        { term: "", definition: "" },
        { term: "", definition: "" },
      ],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/api/course/${courseId}`);
      console.log(res.data);
      setCourse(res.data);
    };
    fetchData();
  }, []);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const filteredWords = course.words.filter(
        (word) => word.term.trim() !== '' && word.definition.trim() !== ''
      );
      const updatedCourse = { ...course, words: filteredWords };
      const response = await axiosInstance.put(`/api/course`, {course:updatedCourse});
      setCourse(response.data);
      navigate(`/library/course/${courseId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  const handleDelete =  (word) => {
    const newWords = course.words.filter(w => w !== word);
    console.log(newWords);
    setCourse({...course, words: newWords});
  }
    

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white w-10/12 flex flex-row mt-5">
        {" "}
        <div className="p-4 w-full">
          {" "}
          <TextField
            id="title"
            label="Title"
            multiline
            maxRows={4}
            variant="standard"
            value={course.title}
            onChange={handleInputChange}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="bg-white w-10/12 flex flex-row mt-5">
        {" "}
        <div className="p-4 w-full">
          {" "}
          <TextField
            id="description"
            label="Description"
            multiline
            maxRows={4}
            variant="standard"
            value={course.description}
            onChange={handleInputChange}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      {course.words.map((word, index) => (
        <div className="flex justify-center mt-5 w-full">
          <div className="bg-white w-10/12 flex flex-row">
            <div className="p-4 w-full">
              {" "}
              <TextField
                id="term"
                label="Term"
                multiline
                maxRows={4}
                value={word.term}
                onChange={(e) => handleWordChange(index, e)}
                variant="standard"
                style={{ width: "100%" }}
              />
            </div>
            <div className="p-4 w-full">
              {" "}
              <TextField
                id="definition"
                label="Definition"
                multiline
                maxRows={4}
                variant="standard"
                value={word.definition}
                onChange={(e) => handleWordChange(index, e)}
                style={{ width: "100%" }}
              />
            </div>
            <div className="p-2 mt-7">
              {" "}
              <IconButton>
                <DeleteIcon style={{ color: "red" }} onClick={()=>handleDelete(word)}></DeleteIcon>
              </IconButton>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-5" onClick={addWord}>
        <Tooltip title="Add more words">
          <IconButton>
            <AddIcon></AddIcon>
          </IconButton>
        </Tooltip>
      </div>

      <div className="w-10/12 mt-5 flex justify-end items-end ">
      <Button variant="contained" onClick={async () =>{await handleEdit()}}>Edit</Button>

      </div>


    </div>
  );
}
