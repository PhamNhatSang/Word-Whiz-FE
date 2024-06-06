import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { Chart } from "primereact/chart";
import passImage from "../assets/PASS+Logo+Horizontal+Full+Color+CROP.png";
import { Image } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function TestResultDialog({ visible, setVisible,overall}) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Correct", "Wrong"],
      datasets: [
        {
          data: [overall?.numberOfCorrectAnswer, overall?.numberOfWrong],
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
  }, [overall]);

  return (
    <div className="card flex justify-content-center">
      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Result"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="w-full flex flex-row items-center">
          <div className="w-1/2"> <Chart
            type="pie"
            data={chartData}
            options={chartOptions}
            className="md:w-30rem"
          /></div>
         
          <div className="ml-10">
          <div className=" text-3xl font-semibold">{overall?.numberOfCorrectAnswer+"/"+(overall?.numberOfCorrectAnswer+overall?.numberOfWrong)}</div>
          <div className=" text-3xl font-semibold mt-1">{"Score:"+overall?.score}</div>
          <div className=" text-3xl font-semibold mt-1">{overall?.percentage+"%"}</div>
          <div className="mt-5">

</div>
          </div>          
        </div>
      </Dialog>
    </div>
  );
}
