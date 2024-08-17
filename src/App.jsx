import { useState, useEffect } from "react";
import "./App.css";

const url = "http://127.0.0.1:8000/api/courses/";

function App() {
  const [courses_data, set_courses_data] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          console.log("response ok!");
          return res.json();
        } else {
          throw new Error("response was not ok.");
        }
      })
      .then((data) => {
        const fetched_data = data;
        set_courses_data(fetched_data);
        console.log("fetched data:", fetched_data);
      });
  }, []);
  // Empty dependency array

  // Log courses_data in useEffect to see when it updates
  useEffect(() => {
    console.log("Courses data:", courses_data);
  }, [courses_data]);

  return (
    <>
      <h1>Hello World from React!</h1>
      <h2>Accessing API from backend:</h2>
      <div>
        {courses_data.map((element, index) => (
          <ul key={index}>
            <li>{element.title || "No title available"}</li>
            <li>{element.course_code || "No course code available"}</li>
            <li>{element.description || "No description available"}</li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default App;
