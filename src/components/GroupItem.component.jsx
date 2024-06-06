import { Card,CardActionArea,CardHeader,Divider,Avatar } from "@mui/material";
import image from "../assets/Web capture_2-5-2024_91421_www.logoai.com.jpeg";
import ItemText from "./ItemText.component";
import GroupIcon from '@mui/icons-material/Group';
export default function GroupItem({group}) {
    const Header = () => {
        return (
          <div class="flex flex-row ">
            <div >
                <div class="text-xl">{ group.numberofcourses+' courses'}</div>
            <div class="flex flex-row items-center">
            <GroupIcon />
                <div class="px-4 text-3xl">{group.numberofmembers+' students'}</div>
            </div>
            </div>
            <Divider sx={{ height: 28, m: 0.25 }} orientation="vertical" />
            <div class="px-2 text-xl" >{group.group_name}</div>
            <Divider sx={{ height: 28, m: 0.25 }} orientation="vertical" />
            
            <div class="px-2 flex flex-row"><Avatar  sx={{ width: 24, height: 24 }}  alt="Remy Sharp" src={group.owner_avatar} />
            <div class="px-2 text-xl" >{group.owner_name}</div>
            <div class="py-1"> <ItemText text="admin"></ItemText></div>
            </div>
          </div>
        );
      };
    return (
        <div >
        <Card class=" bg-white  w-full h-fit drop-shadow-md max-w-screen-xl mt-4" >
          <CardActionArea >
            <CardHeader title={<Header></Header>}></CardHeader>
          </CardActionArea>
        </Card>
        </div>
    );
}
