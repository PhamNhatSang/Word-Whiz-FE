import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import CourseItem from "../components/CourseItem.component";
import image from "../assets/Web capture_2-5-2024_91421_www.logoai.com.jpeg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Spin } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";

export default function LibraryPage() {
  const [choice, setChoice] = useState("all");
  const [open, setOpen] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [importCourses, setImportCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [search, setSearch] = useState(""); // State to track search input
  const { user, accessToken, logout } = useAuth();
  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/api/library");
        console.log(response.data);
        setMyCourses(response.data?.myCourses);
        setImportCourses(response.data?.importCourses);
      } catch (error) {
        if (error.response.status === 401) logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderCourses = () => {
    if (isLoading) {
      return (
        <div className="w-full flex justify-center">
          <Spin size="large" />
        </div>
      );
    }
    let filteredMyCourses = myCourses;
    let filteredImportCourses = importCourses;

    if (search !== "") {
      filteredMyCourses = myCourses.filter((course) => {
        return course.title.toLowerCase().includes(search.toLowerCase());
      });
      filteredImportCourses = importCourses.filter((course) => {
        return course.title.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (choice === "myCourses" && filteredMyCourses.length > 0) {
      return filteredMyCourses.map((course) => (
        <Link to={`/library/course/${course.course_id}`}>
          {" "}
          <CourseItem key={course.course_id} course={course} />
        </Link>
      ));
    }

    if (choice === "importCourses" && filteredImportCourses.length > 0) {
      return filteredImportCourses.map((course) => (
        <Link to={`/library/course/${course.course_id}`}>
          {" "}
          <CourseItem key={course.course_id} course={course} />
        </Link>
      ));
    }

    if (choice === "all") {
      const allCourses = [...filteredMyCourses, ...filteredImportCourses];
      return allCourses.map((course) => (
        <Link to={`/library/course/${course.course_id}`}>
          {" "}
          <CourseItem key={course.course_id} course={course} />
        </Link>
      ));
    }

    return <div>No courses available</div>;
  };
  return (
    <div className="px-60">
      <div class="flex flex-row items-center py-4">
        <Avatar sx={{ height: 70, width: 70 }} alt="Remy Sharp" src={image} />
        <div class="px-4 text-4xl">Name</div>
      </div>
      <div class="py-10 flex justify-between " style={{ width: "70%" }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={choice}
            label="Status"
            onChange={handleChange}
            class="bg-white"
          >
            <MenuItem value={"all"}>All Course</MenuItem>
            <MenuItem value={"myCourses"}>My Courses</MenuItem>
            <MenuItem value={"importCourses"}>Imported courses</MenuItem>
          </Select>
        </FormControl>
        <Paper
          class="bg-transparent border-b border-black"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search your course"
            inputProps={{ "aria-label": "search google maps" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon />
        </Paper>{" "}
      </div>

      <div style={{ maxWidth: "70%" }}>{renderCourses()}</div>
    </div>
  );
}
