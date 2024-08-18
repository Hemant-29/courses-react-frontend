import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ListCourses from "./components/CoursesList";
import ListInstances from "./components/InstancesList";
import AddCourse from "./components/AddCourse";
import CourseDetail from "./components/CourseDetail";

function App() {
  const [courseDetails, setcourseDetails] = useState({
    id: null,
    opened: false,
    Details: { title: null, description: null, course_code: null },
  });

  function setDetails(newDetails, id = null) {
    // console.log("New Details:", newDetails);
    setcourseDetails((prevDetails) => {
      return {
        id: id,
        opened: prevDetails.id == id ? !prevDetails.opened : true,
        Details: newDetails,
      };
    });
  }

  return (
    <>
      <Navbar></Navbar>
      <main>
        <ListCourses stateFunc={setDetails}></ListCourses>
        {courseDetails.opened && (
          <CourseDetail details={courseDetails.Details}></CourseDetail>
        )}
        <AddCourse></AddCourse>
      </main>
    </>
  );
}

export default App;
