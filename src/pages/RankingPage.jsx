import RankingCard from "../components/RankingCard.component";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axiosInstance from "../api/axios";
import { Avatar } from "@mui/material";
export default function RankingPage() {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/api/ranking/top");
      setListUser(res.data);
    };
    fetchData();
  }
  , []);
  
  const imageBodyTemplate = (rowData) => {
    return <Avatar src={rowData.avatar} />;
  }
  const imageBodyRank= (rowData) => {
    return <div className=" text-center w-full">{listUser.indexOf(rowData)+1}</div>
  }


  return (
    <div className="w-full flex flex-col items-center justify-center mt-10">
      <div className="flex flex-row w-full items-center justify-center">
        <RankingCard user={listUser[1]} ranking={"silver"} height={"30rem"}></RankingCard>
        <RankingCard user={listUser[0]} ranking={"gold"} height={"35rem"}></RankingCard>
        <RankingCard user={listUser[2]} height={"30rem"}></RankingCard>
      </div>

      <div className="mt-20 mb-20">
        <DataTable value={listUser} tableStyle={{ minWidth: "85rem" }}>
          <Column header="Rank" style={{ width: "5rem" }} body={imageBodyRank}></Column>
          <Column  header="Avatar" body={imageBodyTemplate}></Column>
          <Column field="name" header="Name"></Column>
          <Column field="courseLearned" header="Courses learned"></Column>
          <Column field="totalScore" header="Point"></Column>
        </DataTable>
      </div>
    </div>
  );
}
