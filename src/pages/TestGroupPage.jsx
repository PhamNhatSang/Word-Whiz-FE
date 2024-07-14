import TestItem from "../components/TestItem.component";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";
import TestResultDialog from "../components/TestResultDialog.component";
import TestResultItem from "../components/ResultItem.component";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
export default function TestGroupPage() {
  const nagative = useNavigate();
  const [visible, setVisible] = useState(false);

  const [result, setResult] = useState({
    courseName: "",
    overall: {
      numberOfCorrectAnswer: 0,
      numberOfWrong: 0,
      percentage: 0,
      score: 0,
    },
    listTestItems: [],
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [test, setTest] = useState({testName:'',isDone:false,listTestItem:[]});            

  const { testId,groupId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/learning/test/${testId}`);
        if(res.data.isDone){
            nagative(`/test/result/${testId}`);
        }
        setTest(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleTestSubmit = async () => {
    try {
      const resultData = await axiosInstance.put(
        `/api/learning/test/${testId}`
      );
      setResult(resultData.data);
      setIsSubmit(true);
      setVisible(true);
    } catch (e) {
      console.log(e);
    }
  };

 
  const handleBackToGroup = () => {
    nagative(`/group/${groupId}`);
  };

  return (
    <div className="flex flex-col w-full h-full items-center   justify-between">
      <TestResultDialog
        visible={visible}
        setVisible={setVisible}
        overall={result.overall}
      ></TestResultDialog>
      {!isSubmit ? (
        <div className="w-full flex flex-col items-center">
          {" "}
          <div className="text-2xl font-semibold">{test?.testName}</div>
          {test.listTestItem.map((item, index) => (
            <TestItem
              testItem={item}
              index={index}
              length={test.listTestItem.length}
            ></TestItem>
          ))}
          <div className="text-xl ">Submit your test</div>
          <div className="mb-10 mt-3">
            <Button
              variant="contained"
              onClick={async () => {
                await handleTestSubmit();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="text-2xl font-semibold">
            {test?.testName}
          </div>
          {result?.listTestItems.map((item, index) => (
            <TestResultItem
              testItem={item}
              index={index}
              length={result?.listTestItems.length}
            ></TestResultItem>
          ))}
          <div className="text-xl ">Reload the test or back to Course</div>
          <div className="mb-10 mt-3 flex flex-row">
            <IconButton onClick={handleBackToGroup}>
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
