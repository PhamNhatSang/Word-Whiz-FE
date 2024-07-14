import React from 'react'
export default function CourseItemInGroup({course}) {
    return (
        <div className="border-gray-300 w-full border rounded-lg mt-2  flex justify-between items-center hover:border-red-300">
        <div className="text-3xl p-4 font-semibold text-black" >{course?.title}</div>
      </div>
    )
}