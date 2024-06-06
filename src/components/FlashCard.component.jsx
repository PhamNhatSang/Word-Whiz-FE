
import ReactCardFlip from "react-card-flip"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { Carousel } from "primereact/carousel";

import { useState } from "react";
export default function FlashCard({word ,height,wordClass}) {
    const [isFlipped, setIsFlipped] = useState(false);
   function handleClick(){
        setIsFlipped(!isFlipped);
    }
    
    return (
        <div className="h-full">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" class='text-wrap'>
            
        <div class='   bg-white flex items-center justify-center drop-shadow-lg cursor-pointer' style={{height:height}} onClick={handleClick}>
          <div className={wordClass}>{word?.term}</div>
        </div>
       
     
        <div class='  bg-white flex items-center justify-center drop-shadow-lg cursor-pointer flex-wrap' style={{height:height}} onClick={handleClick}>
          <div className={wordClass}>{word?.definition}</div>
        </div>
       
           </ReactCardFlip>
           </div>
        );
    
    
}
