import React,{useEffect,useState} from "react";
import TestItemEdit from "../components/TestItemEdit.component";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
export default function EditListTestItemPage() {
  const [testItem, setTestItem] = useState([]);
  const [testName, setTestName] = useState('');
  const nagative = useNavigate();
const {courseId,groupId} = useParams();

const handleChange = (index, e) => {
  const { value } = e.target;
  const newItems = [...testItem];
  newItems[index] = {
    ...newItems[index],
    [e.target.id]: value,
  };
  setTestItem(newItems);
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.post(`/api/learning/testItem/${courseId}`);
        setTestItem(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);



  const handleCreateTest = async () => {
    try {
       await axiosInstance.post(`/api/learning/test-create/edting`, {
        courseId: courseId,
        groupId: groupId,
        testName: testName,
        testItems: testItem,
      });
      nagative(`/group/${groupId}`);
    }catch(e){
      console.log(e);
    }
  }

  const handleBackToGroup = () => {
    nagative(`/group/${groupId}`);
  }
  return (
    <div className="flex items-center flex-col justify-center">
      <div className=" text-xl font-semibold"> Edit test</div>
      <div className="w-10/12">      
      <TextField  value={testName} className="w-full" id="standard-basic" label="Test Name" variant="standard" onChange={(e)=>setTestName(e.target.value)}/>
      </div>

      <div className="w-10/12">

     { testItem.map((item, index) => (
        <div key={index} className="w-full mt-5">
          <div className="bg-white">
            <div className="question p-4">{item?.word?.term}</div>
            <div className="p-4 flex flex-col">
              <TextField
                value={item?.option_1}
                id="option_1"
                label="Option 1"
                variant="standard"
                onChange={(e) => handleChange(index, e)}
                disabled={item?.option_1 === item?.word?.definition}
              />
              <TextField
                value={item?.option_2}
                id="option_2"
                label="Option 2"
                variant="standard"
                onChange={(e) => handleChange(index, e)}
                disabled={item?.option_2 === item?.word?.definition}
              />
              <TextField
                value={item?.option_3}
                id="option_3"
                label="Option 3"
                variant="standard"
                onChange={(e) => handleChange(index, e)}
                disabled={item?.option_3 === item?.word?.definition}
              />
              <TextField
                value={item?.option_4}
                id="option_4"
                label="Option 4"
                variant="standard"
                onChange={(e) => handleChange(index, e)}
                disabled={item?.option_4 === item?.word?.definition}
              />
            </div>
          </div>
        </div>
      ))}
      
        <div className="w-full flex justify-end mt-5">
          <div className=" mr-3">
            <Button onClick={async ()=>{await handleCreateTest()}} variant="contained">Save</Button>
          </div>
          <div className=" ml-3">
            <Button variant="contained" color="error" onClick={handleBackToGroup}>
              Cancle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
