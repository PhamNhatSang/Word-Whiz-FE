import React,{useEffect,useState} from 'react';
import { Space, Table, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import FeedBackDialog from '../components/FeedBackDialog.component';
const Title = ({ text }) => {
  return <h1 className="text-sm">{text}</h1>;
};




export default function TestResultsGroup() {

    const [data,setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [testName, setTestName] = useState('');
    const {testGroupId,groupId} = useParams();
    const handleFeadBack = () => {
      setVisible(true);
    }
    const columns = [
      {
        title: 'Test name',
        dataIndex: 'testName',
        key: 'testName',
        render: (text) => <div className=' text-xl'>{text}</div>,
      },
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        render: (text) => <div className=' text-xl'>{text}</div>,
    
      },
      {
        title: 'Student name',
        dataIndex: 'studentName',
        key: 'studentName',
        render: (text) => <div className=' text-xl'>{text}</div>,
    
      },
      {
        title: 'Student email',
        key: 'studentEmail',
        dataIndex: 'studentEmail',
        render: (text) => <div className=' text-xl'>{text}</div>,
    
      },
      {
        title: 'Number correct answer',
        key: 'numberOfCorrectAnswer',
        dataIndex: 'numberOfCorrectAnswer',
        render: (text) => <div className=' text-xl  text-green-700'>{text}</div>,
    
      },
      {
        title: 'Number  wrong answer',
        key: 'numberOfWrong',
        dataIndex: 'numberOfWrong',
        render: (text) => <div className=' text-xl  text-red-700'>{text}</div>,
    
      },
      {
        title: 'Percentage',
        key: 'percentage',
        dataIndex: 'percentage',
        render: (text) => <div className=' text-xl '>{text+" %"}</div>,
    
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
                <Link to={`/test/result/${record?.testId}`}> <div> <Tooltip title={<Title text={"View result detail"}></Title>}>
            <IconButton><RemoveRedEyeOutlinedIcon sx={{color:'yellow'}}></RemoveRedEyeOutlinedIcon></IconButton> </Tooltip></div>  </Link> 
            <div>
            <Tooltip title={<Title text={"Feedback"}></Title>}>
              <IconButton onClick={handleFeadBack}><ChatBubbleOutlineOutlinedIcon sx={{color:'blue'}}></ChatBubbleOutlineOutlinedIcon></IconButton>
              
              </Tooltip>
              
              </div>
              <FeedBackDialog visible={visible} setVisible={setVisible} header={"Comment to test"} testId={record?.testId} groupId={groupId}></FeedBackDialog>

          </Space>
        ),
      },
    ];
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axiosInstance.get(`/api/learning/test/group/results/${testGroupId}`);
            setData(res.data.tests);
            setTestName(res.data?.testName);
          } catch (e) {
            console.log(e);
          }
        };
        fetchData();
      }, []);

    return(
    <div className='flex flex-col items-center'>
      <div className='text-xl font-semibold mb-5'>{`List of results : ${testName} `}</div>
    <Table  columns={columns} dataSource={data} />
    
    </div>)
}