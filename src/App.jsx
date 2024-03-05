import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false); // Track form submission state

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Simulate sending data to Google Sheets (remove this in real implementation)
    setSubmitting(true);
    try {
      await axios.post(
        "https://sheet.best/api/sheets/0e6679b1-6357-45b0-ae3d-ce9adfbe989a",
        formData
      );
      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form data:", error);
      toast.error("Failed to submit form. Please try again later.");
    } finally {
      setSubmitting(false);
    } // Simulating a delay for submission
  };

  return (
    <>
      <div className="container w-full h-screen bg-zinc-500 flex justify-center">
        <div className="main-content md:w-1/2 h-auto bg-yellow-100 m-auto ">
          <h1 className="text-center m-5 text-purple-300 text-bold bg-red-700 p-5 text-3xl">
            Contact Us
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center flex-col p-3"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="m-2 h-12 p-5 border border-solid  border-5 rounded-lg border-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="m-2 h-12 p-5 border border-solid  border-5 rounded-lg border-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Contact Number"
              className="m-2 h-12 p-5 border border-solid  border-5 rounded-lg border-black"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              cols="30"
              rows="5"
              placeholder="Enter your Message...."
              className="m-2  p-5 border border-solid  border-5 rounded-lg border-black"
            ></textarea>
            <button
              type="submit"
              className="border-5 rounded-lg bg-blue-500 w-1/4 h-10 m-auto"
              disabled={submitting} // Disable the button while submitting
            >
              {submitting ? "Submitting..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
