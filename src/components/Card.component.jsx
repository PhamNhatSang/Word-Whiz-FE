import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ItemText from "./ItemText.component";
import { Link } from "react-router-dom";
import { Star } from "@mui/icons-material";
export default function CardItem({ course }) {
  const Header = () => {
    return (
      <div className="flex flex-row items-center justify-between">
        <div style={{maxWidth:"90%"}} className=" break-all">{course.title}</div>
        {course?.avg_rate>0 && (
          <div className="flex flex-row items-center">
            <div className=" text-lg text-gray-500 mr-1">{course.avg_rate}</div>
           
              <Star style={{ color: "yellow" }}></Star>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Link to={`/library/course/${course.course_id}`}>
        <Card
          className="drop-shadow-md w-full "
          sx={{ maxWidth: 380, borderRadius: "1rem" }}
        >
          <CardActionArea>
            <div>
              <CardHeader title={<Header></Header>}></CardHeader>
            </div>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <ItemText text={course.terms + " terms"} />
              </Typography>
              <Typography
                class="flex flex-row items-center"
                variant="body2"
                color="text.secondary"
              >
                <Avatar alt="Remy Sharp" src={course.owner_avatar} />
                <div className="p-2">{course.owner_name}</div>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
}
