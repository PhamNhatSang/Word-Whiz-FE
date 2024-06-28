import GroupItem from "../components/GroupItem.component";
import { Avatar } from "@mui/material";
import image from "../assets/Web capture_2-5-2024_91421_www.logoai.com.jpeg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import { Spin } from "antd";
import { useAuth } from "../context/AuthContext";
export default function GroupPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/group");
        setGroups(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="px-60">
      <div class="flex flex-row items-center py-4">
        <Avatar sx={{ height: 70, width: 70 }} alt="Remy Sharp" src={user?.avatar} />
        <div class="px-4 text-4xl">{user?.name}</div>
      </div>
      <div>List Groups</div>
      {loading ? (
        <div className="w-full flex justify-center">
        
          <Spin size="large" />
        </div>
      ) : (
        groups.map((group) => (
          <Link to={`/group/${group.group_id}`}>
            <GroupItem group={group} />
          </Link>
        ))
      )}
    </div>
  );
}
