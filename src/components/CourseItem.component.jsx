import * as React from "react";
import Card from "@mui/material/Card";
import { CardActionArea, CardHeader ,Avatar,Divider} from "@mui/material";
import ItemText from "./ItemText.component";

import getColor from "../utils/getColor";
export default function CourseItem({course}) {
  const Header = () => {
    return (
      <div>
      <div class="flex flex-row items-center">
        <ItemText class="bg-white" text={course.terms +" terms"} />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <div class="px-2 flex flex-row items-center"><Avatar   sx={{ width: 30, height: 30 }}  alt="Remy Sharp" src={course.owner_avatar} />
        <div class="px-2 text-xl" >{course.owner_name}</div>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <ItemText text={course.language} color={getColor(course.language)} />
        </div>     
      </div>
      <div class="text-3xl">{course.title}</div>
      </div>
    );
  };

  return (
    <div >
    <Card class=" bg-white    h-fit drop-shadow-md  mt-4" >
      <CardActionArea >
        <CardHeader title={<Header></Header>}></CardHeader>
      </CardActionArea>
    </Card>
    </div>
  );
}
