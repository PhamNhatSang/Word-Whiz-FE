import FlashCard from "../components/FlashCard.component";
import { Carousel } from "primereact/carousel";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";
export default function FlashCardLearningPage() {
  const { courseId } = useParams();

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

  const [flashCardLearn, setFlashCardLearn] = useState({
    id: "",
    userId: "",
    courseId: "",
    words: [],
    lastWordIndex: 0,
    courseName: "",
    isDone: false,
  });
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(
        `/api/learning/flashcard/${courseId}`
      );
      setFlashCardLearn(res.data);
      setPage(res.data.lastWordIndex);
    };
    fetchData();
  }, []);
  const FlashCardItem = (word) => {
    return (
      <FlashCard
        word={word}
        height={"40rem"}
        wordClass={"max-w-2xl break-words text-4xl"}
      />
    );
  };

  const handleTransitionEnd = async (e) => {
    try {
      setPage(e.page);

      await axiosInstance.put(`/api/learning/flashcard/${flashCardLearn.id}`, {
        learnId: flashCardLearn.id,
        lastWordIndex: e.page,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" flex flex-col justify-center items-center h-full">
      <div className="text-3xl">{flashCardLearn?.courseName}</div>
      <div className="">{(page +1)+ "/" + flashCardLearn.words.length}</div>

      <div className="w-1/2 ">
        {" "}
        <Carousel
          value={flashCardLearn.words}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={FlashCardItem}
          page={page}
          onPageChange={async (e)=>{await handleTransitionEnd(e)}}
        />
      </div>
    </div>
  );
}
