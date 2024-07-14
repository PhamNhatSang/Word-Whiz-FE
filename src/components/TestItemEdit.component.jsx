import React,{useState} from 'react';
import TextField from '@mui/material/TextField';

export default function TestItemEdit({testItem,index}) {
    


    const handleChange = (index=index, e) => {
        const { id, value } = e.target;
        console.log(id, value);
    }
    
    return (
        <div className=' bg-white'>
        <div className='question p-4'> question</div>
            {/* <div className='p-4 flex flex-col'>
            <TextField value={option1} id="standard-basic" label="option 1" variant="standard" onChange={(e) => handleChange(index, e)}/>
            <TextField value={option2} id="standard-basic" label="option 2" variant="standard" onChange={(e) => handleChange(index, e)}/>
            <TextField value={option3} id="standard-basic" label="option 3" variant="standard" onChange={(e) => handleChange(index, e)}/>
            <TextField value={option4} id="standard-basic" label="option 4" variant="standard" onChange={(e) => handleChange(index, e)}/>
            </div> */}
        </div>
    );
}