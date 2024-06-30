import { useState } from "react";
import axiosInstance from "../api/axios";
export default function TestItem({ testItem, index, length }) {
  const [selectedOption, setSelectedOption] = useState(testItem?.user_answer);

  const handleSelection = async (option) => {
    let old = selectedOption;
    try {
      if (option === selectedOption) {
        setSelectedOption("");

        await axiosInstance.put(`/api/learning/testItem`, {testItemId:testItem.id,userAnswer:""});
        
      } else {
        setSelectedOption(option);

        await axiosInstance.put(`/api/learning/testItem`, {testItemId:testItem.id,userAnswer:option});
      }
    } catch (e) {
      setSelectedOption(old);
      console.log(e);
    }
  };

  return (
    <div className="card w-2/5 bg-white h-96 drop-shadow-lg mt-7 mb-7 ">
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold">{testItem?.definition}</h1>
          <p className="text-lg">{index + 1 + "/" + length}</p>
        </div>
        <div className="py-3 break-words">{testItem?.question}</div>
        <div className="answer flex flex-row  justify-between flex-wrap py-24">
        {[testItem?.option_1, testItem?.option_2, testItem?.option_3, testItem?.option_4].map((option, idx) => (
          option!="" &&

          <div
            className="w-1/2 h-20 cursor-pointer"
            onClick={ async () =>(await handleSelection(option))}
          >
            <div
              style={{ maxWidth: "95%", maxHeight: "90%" }}
              className={` flex flex-col  justify-center w-full h-full  border-2 rounded-lg	${selectedOption == option ? "border-blue-800 bg-blue-50" : " border-gray-300 hover:border-gray-800"}`}
            >
              <div className="break-words p-2">{option}</div>
            </div>
          </div>
          ))}

          {/* <div
            className="w-1/2 h-20 cursor-pointer"
            onClick={async () =>(await handleSelection(testItem?.option_2))}
          >
            <div
              style={{ maxWidth: "95%", maxHeight: "90%" }}
              className={`flex flex-col  justify-center  w-full h-full break-words  border-2 rounded-lg	${selectedOption == testItem?.option_2 ? "border-blue-800 bg-blue-50" : " border-gray-300 hover:border-gray-800"}`}
            >
              <div className="break-words p-2">{testItem?.option_2}</div>
            </div>
          </div>

          <div
            className="w-1/2 h-20 cursor-pointer"
            onClick={async () =>(await handleSelection(testItem?.option_3))}
          >
            <div
              style={{ maxWidth: "95%", maxHeight: "90%" }}
              className={`flex flex-col  justify-center  w-full h-full break-words  border-2 rounded-lg	${selectedOption == testItem?.option_3 ? "border-blue-800 bg-blue-50" : " border-gray-300 hover:border-gray-800"}`}
            >
              <div className=" break-words p-2">{testItem?.option_3}</div>
            </div>
          </div>

          <div
            className="w-1/2 h-20 cursor-pointer"
            onClick={async () =>(await handleSelection(testItem?.option_4))}
          >
            <div
              style={{ maxWidth: "95%", maxHeight: "90%" }}
              className={`flex flex-col  justify-center  w-full h-full break-words  border-2 rounded-lg	${selectedOption == testItem?.option_4 ? "border-blue-800 bg-blue-50" : " border-gray-300 hover:border-gray-800"}`}
            >
              <div className="break-words p-2">{testItem?.option_4}</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
