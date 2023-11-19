import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createInstructors } from "../../api/instructors/createInstructors";
import { updateInstructor } from "../../api/instructors/updateInstructor";


function InstructorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    departmentId: null,
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch instructor data if editing
    if (id) {
      async function fetchInstructorData() {
        try {
          const response = await fetch(`http://localhost:4955/instructors/${id}`);
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error("Error loading instructor data", error);
        }
      }
      fetchInstructorData();
    }

    // Fetch departments
    async function fetchDepartments() {
      try {
        const response = await fetch("http://localhost:4954/departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error loading departments", error);
      }
    }
    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // If there's an id, it's an update
        await updateInstructor(id, formData);
      } else {
        // If no id, it's a new instructor
        await createInstructors(formData);
      }
      navigate("/instructors");
    } catch (error) {
      console.error("Error saving instructor", error);
    }
  };


  return (
    <div>
      <h2>{id ? "Edit Instructor" : "Create Instructor"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {/* Assuming you have a department dropdown */}
        <div className="mb-3">
          <label htmlFor="departmentId" className="form-label">
            Department:
          </label>
          <select
            className="form-select"
            id="departmentId"
            name="departmentId"
            value={formData.departmentId || ""}
            onChange={handleChange}
          >
            <option value="">Select a department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default InstructorForm;

