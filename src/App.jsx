import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ListCourses from "./components/ListCourses";
import ListInstances from "./components/ListInstances";
import AddCourse from "./components/AddCourse";
import AddInstance from "./components/AddInstance";

function App() {
  const [courses_data, set_courses_data] = useState([]);
  const [current_tab, set_current_tab] = useState("course");

  useEffect(() => {
    fetchCourses();
  }, []);
  // Execute this effect on startup

  function fetchCourses() {
    const url = "http://127.0.0.1:8000/api/courses/";
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
        set_courses_data(data);
      });
  }
  function fetchInstances(params) {}

  function switch_tab(tab) {
    set_current_tab(tab);
    console.log(tab);
  }

  return (
    <>
      <Navbar switchTab={switch_tab}></Navbar>
      {current_tab == "course" ? (
        <main>
          <ListCourses
            fetchCourses={fetchCourses}
            coursesData={courses_data}
          ></ListCourses>
          <AddCourse fetchCourses={fetchCourses}></AddCourse>
        </main>
      ) : (
        <main>
          <ListInstances
            fetchInstances={fetchInstances}
            coursesData={courses_data}
          ></ListInstances>
          <AddInstance coursesData={courses_data}></AddInstance>
        </main>
      )}
    </>
  );
}

export default App;
