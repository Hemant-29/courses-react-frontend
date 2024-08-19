import { useState, useEffect } from "react";
import "./instances_list.css";

function ListInstances(props) {
  const [instancesData, setInstancesData] = useState([]);
  const [formData, setFormData] = useState({
    year: "",
    semester: "",
    course_id: "",
  });

  function handleFormChange(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function deleteInstance(year, semester, course_id) {
    const url = `http://127.0.0.1:8000/api/instances/${year}/${semester}/${course_id}/`;
    console.log("course deleted from url:", url);
    fetch(url, { method: "DELETE" }).then((res) => {
      if (res.status == 204) {
        console.log("Course Deleted!");
        fetchFromURL(
          `http://localhost:8000/api/instances/${formData.year}/${formData.semester}/${formData.course_id}`
        );
      } else {
        throw new Error("Course can't be deleted");
      }
    });
  }

  const submitForm = (event) => {
    event.preventDefault();
    console.log("submitted form data:", formData);
    let url = `http://localhost:8000/api/instances/${formData.year}/${formData.semester}/${formData.course_id}`;
    fetchFromURL(url);
  };

  function fetchFromURL(url) {
    console.log("fetching from url:", url);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInstancesData(data);
        console.log("Instance data:", data);
      });
  }

  return (
    <>
      <h2>List Instances: </h2>
      <div className="select_instances">
        <form onSubmit={submitForm} className="instance_form">
          <select
            name="course_id"
            id="course_select"
            onChange={handleFormChange}
          >
            <option value="">All</option>
            {props.coursesData.map((element, index) => (
              <>
                <option key={index} value={element.id}>
                  {element.title}
                </option>
              </>
            ))}
          </select>

          <input
            name="year"
            type="text"
            placeholder="Year"
            onChange={handleFormChange}
            value={formData.year}
            required
          />
          <input
            name="semester"
            type="text"
            placeholder="Semester"
            onChange={handleFormChange}
            value={formData.semester}
            required
          />
          <button>Search Instances</button>
        </form>
      </div>

      <div className="instances_table">
        <ul className="instances_table_heading">
          <li>Course Title</li>
          <li>Year - Sem</li>
          <li>Code</li>
          <li>Action</li>
        </ul>

        {instancesData.map((element, index) => (
          <ul className="instances_table_entries">
            <li>{element.course_title || "No title available"}</li>
            <li>
              {`${element.year} ${element.semester}` || "No Year available"}
            </li>
            <li>{element.course_code || "No code available"}</li>
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
                  deleteInstance(
                    element.year,
                    element.semester,
                    element.course
                  );
                }}
                id="delete_instance"
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

export default ListInstances;
