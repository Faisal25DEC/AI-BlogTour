import React, { useState } from "react";

const initialFormData = {
  name: "",
  password: "",
  email: "",
  phone: null,
};
const baseUrl = "http://localhost:7700";
const Signup = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFormFieldChange = (e) => {
    const [name, value] = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("");
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={handleFormFieldChange}
          type="text"
          placeholder="name"
          name="name"
        />
        <input
          onChange={handleFormFieldChange}
          type="text"
          placeholder="email"
          name="email"
        />
        <input
          onChange={handleFormFieldChange}
          type="text"
          placeholder="password"
          name="password"
        />
        <input
          onChange={handleFormFieldChange}
          type="number"
          placeholder="phone"
          name="phone"
        />
        <input type="submit" value="" />
      </form>
    </div>
  );
};

export default Signup;
