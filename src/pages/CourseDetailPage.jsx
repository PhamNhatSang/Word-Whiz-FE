import { Carousel } from "primereact/carousel";
import { useParams } from "react-router-dom";
import FlashCard from "../components/FlashCard.component";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import WordList from "../components/WordList.component";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [course, setCourse] = useState({});
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [page, setPage] = useState(0);
  const { user } = useAuth();
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/api/course/${courseId}`);
    
      setCourse(res.data);
      setWords(res.data?.words);
      setSelectedWord(res.data?.words[0]);
    };
    fetchData();
  }, []);

  const FlashCardD = () => {
    return (
      <FlashCard
        word={selectedWord}
        height={"20rem"}
        wordClass={"max-w-sm break-words"}
      ></FlashCard>
    );
  };

  const handleTransitionEnd = (e) => {
    setPage(e.page);
    setSelectedWord(words[e.page]);
    console.log(e.page);
  };
  return (
    <div>
      <div className="py-4 px-64  flex flex-row  items-center">
        <div className=" text-4xl mr-4">{course?.title}</div>{user?.id === course?.owner_id &&(<Link to={`/library/course/edit/${course.id}`}>
          <IconButton>
            <ModeEditIcon></ModeEditIcon>
          </IconButton>
        </Link>)}
      </div>

      <div className=" py-10 flex flex-row ">
        {words.length > 0?( <div className="w-1/2 h-fit flex flex-col items-center justify-center">
          <div className="w-1/2  content-center">
            <div className=" card">
              {words.length > 0? ( <Carousel
                value={words}
                numVisible={1}
                numScroll={1}
                responsiveOptions={responsiveOptions}
                page={page}
                itemTemplate={FlashCardD}
                onPageChange={handleTransitionEnd}
              />):(<div>There is no word in this course</div>)}
              
            </div>
          </div>
          <div>{page + 1 + "/" + words.length}</div>
        </div>):( <div className="w-1/2 h-fit flex flex-col px-64">There is no word in this course</div>)}
       
        <div className="w-full" style={{ maxWidth: "50%" }}>
          <WordList
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
            setPage={setPage}
            words={words}
            courseId={courseId}
            inLibrary={course?.isInLibrary}
          ></WordList>
        </div>
      </div>
    </div>
  );
}
