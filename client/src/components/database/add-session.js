import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateSession = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [date, setDate] = useState("");
  const [serverURL, setServerURL] = useState("http://localhost:8888/sessions");
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
  }, ["http://localhost:8888/sessions"]);

  /*Event handlers */
  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function onChangeDuration(e) {
    setDuration(e.target.value);
  }

  function onChangePagesRead(e) {
    setPagesRead(e.target.value);
  }

  function onChangeDate(date) {
    setDate(date);
  }

  function onSubmit(e) {
    //e.preventDefault();

    const session = {
      title: title,
      duration: duration,
      pagesRead: pagesRead,
      date: date,
    };

    console.log(session);

    axios
      .post("http://localhost:8888/sessions/add", session)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit()}>
        <div className="form-group">
          <label>Title: </label>
          <select
            ref="userInput"
            required
            className="form-control"
            value={title}
            onChange={onChangeTitle()}
          >
            {books.map(function (book) {
              return (
                <option key={book} value={book}>
                  {book}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Duration (in seconds): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration()}
          />
        </div>
        <div className="form-group">
          <label>Page Count: </label>
          <input
            type="number"
            required
            className="form-control"
            value={pagesRead}
            onChange={onChangePagesRead()}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate()} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Reading Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
export default CreateSession;
