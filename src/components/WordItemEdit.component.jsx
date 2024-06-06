export default function WordItemEdit({ word, setWords, words }) {
  const [title, setTitle] = useState(word.title);
  const [definition, setDefinition] = useState(word.definition);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    const data = {
      title,
      definition,
    };
    try {
      const response = await axios.put(`/words/${word._id}`, data);
      const newWords = words.map((w) => {
        if (w._id === word._id) {
          return response.data;
        }
        return w;
      });
      setWords(newWords);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-5 w-full">
        <div className="bg-white w-10/12 flex flex-row">
          <div className="p-4 w-full">
            {" "}
            <TextField
              id="standard-multiline-flexible"
              label="Term"
              multiline
              maxRows={4}
              variant="standard"
              style={{ width: "100%" }}
            />
          </div>
          <div className="p-4 w-full">
            {" "}
            <TextField
              id="standard-multiline-flexible"
              label="Definition"
              multiline
              maxRows={4}
              variant="standard"
              style={{ width: "100%" }}
            />
          </div>
          <div className="p-2 mt-7"> <IconButton><DeleteIcon style={{color:'red'}}></DeleteIcon></IconButton></div>
        </div>
      </div>
  );
}