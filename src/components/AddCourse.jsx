import { useState, useEffect } from "react";
import "./add_course.css";

function AddCourse(props) {
  const [formData, setFormData] = useState({
    title: "",
    course_code: "",
    description: "",
  });

  const [course_status, set_Course_status] = useState(null);
  const handleFormChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(formData);

    const url = "http://localhost:8000/api/courses/";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status == 201) set_Course_status(true);
        else set_Course_status(false);
        return response.json();
      })
      .then(() => {
        console.log("form data: ", formData);
        props.fetchCourses();
      });
  };

  return (
    <>
      <h2>Add Course: </h2>
      <form onSubmit={submitForm} className="course_form">
        <input
          type="text"
          name="title"
          onChange={handleFormChange}
          placeholder="Course Title"
          value={formData.title}
        />
        <input
          type="text"
          name="course_code"
          onChange={handleFormChange}
          placeholder="Course Code"
          value={formData.code}
        />
        <input
          type="text"
          name="description"
          onChange={handleFormChange}
          placeholder="Course Description"
          value={formData.description}
        />
        <button>Add Course</button>
        <div className="course_add_status">
          <p>
            {course_status != null &&
              (course_status == true
                ? "Course Added Sucessfully"
                : "Error Adding Course")}
          </p>
        </div>
      </form>
    </>
  );
}

export default AddCourse;
