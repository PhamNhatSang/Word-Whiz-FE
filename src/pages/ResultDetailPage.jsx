import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart } from "primereact/chart";
import axiosInstance from "../api/axios";
import TestResultItem from "../components/ResultItem.component";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ViewFeedBackDialog from "../components/ViewFeedBackDialog.component";
import { useAuth } from "../context/AuthContext";

export default function ResultDetailPage() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [visible, setVisible] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const { testId } = useParams();
  const { user } = useAuth();
  const Title = ({ text }) => {
    return <h1 className="text-sm">{text}</h1>;

  }

  const [result, setResult] = useState({
    testName: "",
    userId:null,
    groupId: null,
    overall: {
      numberOfCorrectAnswer: 0,
      numberOfWrong: 0,
      percentage: 0,
      score: 0,
    },
    listTestItems: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/learning/result/${testId}`);

        setResult(res.data);

        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
          labels: ["Correct", "Wrong"],
          datasets: [
            {
              data: [
                res.data?.overall?.numberOfCorrectAnswer,
                res.data?.overall?.numberOfWrong,
              ],
              backgroundColor: [
                documentStyle.getPropertyValue("--green-500"),
                documentStyle.getPropertyValue("--red-500"),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue("--green-400"),
                documentStyle.getPropertyValue("--red-400"),
              ],
            },
          ],
        };
        const options = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
              },
            },
          },
        };

        setChartData(data);
        setChartOptions(options);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleViewFeadBack = async () => {
    try{
      const res = await axiosInstance.get(`/api/learning/feedback/${testId}`);
      setFeedbacks(res.data);
      setVisible(true);
    }catch(e){
      console.log(e);
    }

  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-2xl font-semibold flex flex-row items-center">
        <div> {"Result detail of " + result?.testName}</div>
        <div>
          {result?.groupId && user?.id===result?.userId &&(
            <Tooltip title={<Title text={"View feedback"}></Title>}>
              <IconButton onClick={handleViewFeadBack}>
                <ChatBubbleOutlineOutlinedIcon
                  sx={{ color: "blue" }}
                ></ChatBubbleOutlineOutlinedIcon>
              </IconButton>
            </Tooltip>
          )}

          <ViewFeedBackDialog visible={visible} setVisible={setVisible} header={"List feedbacks"}  feedbacks={feedbacks}> </ViewFeedBackDialog>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-1/4">
          <div>
            {" "}
            <Chart
              type="pie"
              data={chartData}
              options={chartOptions}
              className="md:w-30rem"
            />
          </div>
        </div>

        <div className=" w-full flex flex-col justify-center items-center">
          {" "}
          {result?.listTestItems.map((item, index) => (
            <TestResultItem
              testItem={item}
              index={index}
              length={result?.listTestItems.length}
            ></TestResultItem>
          ))}
        </div>
      </div>
    </div>
  );
}
