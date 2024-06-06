
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import image from '../assets/Web capture_2-5-2024_91421_www.logoai.com.jpeg';
import CardItem from './Card.component';
import { Link } from 'react-router-dom';
import ReviewItem from './ReviewItem.component';
import axiosInstance from '../api/axios';
export default function CarouselItem({courses,courseType}) {
   const [visible, setVisible] = useState(false);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    
    const courseTemplate = (course) => {
        return (
            <div className=" py-5 px-3">
                <CardItem course={course}></CardItem>
            </div>
        );
    };

    return (
        <div className="py-5 card">
            <div className=" px-11  font-semibold text-xl">{courseType}</div>
            <Carousel value={courses}  numScroll={1} numVisible={3} circular responsiveOptions={responsiveOptions} itemTemplate={courseTemplate} />
        </div>
    )
}
        