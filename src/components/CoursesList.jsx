import { useState, useEffect } from "react";
import "./courses_list.css";

function ListCourses(props) {
  const [courses_data, set_courses_data] = useState([]);

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

  function openCourseDetail(courseID) {
    const url = `http://127.0.0.1:8000/api/courses/${courseID}/`;
    fetch(url, { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Can't Open Course Details");
        }
      })
      .then((data) => {
        props.stateFunc(
          {
            title: data.title,
            description: data.description,
            course_code: data.course_code,
          },
          courseID
        );
      });
  }

  function deleteCourse(course_id) {
    const url = `http://127.0.0.1:8000/api/courses/${course_id}/`;
    fetch(url, { method: "DELETE" }).then((res) => {
      if (res.status == 204) {
        console.log("Course Deleted!");
        fetchCourses();
      } else {
        throw new Error("Course can't be deleted");
      }
    });
  }

  useEffect(() => {
    fetchCourses();
  }, []);
  // Execute this effect on startup

  return (
    <>
      <h2>Available Courses:</h2>
      <div className="courses_table">
        <ul className="table_heading">
          <li>Course Title</li>
          <li>Course Code</li>
          <li>Action</li>
        </ul>
        {courses_data.map((element, index) => (
          <ul key={index} className="table_entries">
            <li>{element.title || "No title available"}</li>
            <li>{element.course_code || "No course code available"}</li>
            <li id="table_action">
              <button
                onClick={() => {
                  openCourseDetail(element.id);
                }}
                id="course_details"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-up-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                  />
                  <path
                    fillRule="evenodd"
                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  deleteCourse(element.id);
                }}
                id="delete_course"
                name={element.id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-file-earmark-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293z" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                </svg>
              </button>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default ListCourses;
