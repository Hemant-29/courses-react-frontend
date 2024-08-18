import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ListCourses from "./components/CoursesList";
import ListInstances from "./components/InstancesList";

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
  // Execute this effect on startup

  return (
    <>
      <Navbar></Navbar>
      <main>
        <ListCourses courses_data={courses_data}></ListCourses>
      </main>
    </>
  );
}

export default App;
