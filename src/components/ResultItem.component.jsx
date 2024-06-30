import React from "react";
export default function TestResultItem({ testItem, index, length }) {
  const getOptionStyle = (option) => {
    if (option === testItem?.correct_answer) {
      return "border-green-800 bg-green-50";
    }
    if (option === testItem?.user_answer && option !== testItem?.correct_answer) {
      return "border-red-800 bg-red-50";
    }
    return "border-gray-300 hover:border-gray-800";
  };

 

  return (
    <div className="card w-2/5 bg-white h-96 drop-shadow-lg mt-7 mb-7">
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold">{testItem?.definition}</h1>
          <p className="text-lg">{index + 1 + "/" + length}</p>
        </div>
        <div className="py-3 break-words">{testItem?.question}</div>
        <div className="answer flex flex-row justify-between flex-wrap py-24">
          {[testItem?.option_1, testItem?.option_2, testItem?.option_3, testItem?.option_4].map((option, idx) => (
            option !== "" && (
              <div
                key={idx}
                className="w-1/2 h-20 cursor-pointer"
              >
                <div
                  style={{ maxWidth: "95%", maxHeight: "90%" }}
                  className={`flex flex-col justify-center w-full h-full border-2 rounded-lg ${getOptionStyle(option)}`}
                >
                  <div className="break-words p-2">{option}</div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
