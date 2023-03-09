import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Timer } from "../components";

const Read = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [date, setDate] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/sessions")
      .then((res) => {
        if (res.data.length > 0) {
          setBooks(res.data.map((book) => book.title));
          setTitle(res.data[0].title);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*Event handlers */

  function onSubmit() {
    console.log("submitted");
  }

  return (
    <>
      <Timer />
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <select className="form-control" value={title}></select>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Reading Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </>
  );
};
export default Read;
