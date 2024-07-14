import React,{useEffect,useState} from 'react';
import { Space, Table} from 'antd';
import axiosInstance from '../api/axios';
import { Link } from 'react-router-dom';
import { Tooltip,IconButton } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const columns = [
  {
    title: 'Test name',
    dataIndex: 'testName',
    key: 'testName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'Number correct answer',
    key: 'numberOfCorrectAnswer',
    dataIndex: 'numberOfCorrectAnswer',
  },
  {
    title: 'Number  wrong answer',
    key: 'numberOfWrong',
    dataIndex: 'numberOfWrong',
  },
  {
    title: 'Percentage',
    key: 'percentage',
    dataIndex: 'percentage',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
 <Link to={`/test/result/${record?.testId}`}> <div> <Tooltip title={<Title text={"View result detail"}></Title>}>
 <IconButton><RemoveRedEyeOutlinedIcon sx={{color:'yellow'}}></RemoveRedEyeOutlinedIcon></IconButton> </Tooltip></div>  </Link>        
      </Space>
    ),
  },
];
const Title = ({ text }) => {
  return <h1 className="text-sm">{text}</h1>;
};
export default function ListResultPage() {
  const [data, setData] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/api/learning/results/");
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }
  , []);

    return(<Table columns={columns} dataSource={data} />)
}