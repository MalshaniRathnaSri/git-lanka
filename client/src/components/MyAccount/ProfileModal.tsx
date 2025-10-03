import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

const ProfileModal = ({ isOpen, closeModal, user, token }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.fname || "",
        lname: user.lname || "",
        email: user.email || "",
        contact: user.contact || "",
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://127.0.0.1:8000/api/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      alert("Profile updated successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5 ${
        isOpen ? "block z-99999" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
          {/* Close button */}
          <button
            onClick={closeModal}
            aria-label="button for close modal"
            className="absolute top-0 right-0 sm:top-3 sm:right-3 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
          >
            ✕
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
              <div className="w-full">
                <label htmlFor="fname" className="block mb-2.5">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                />
              </div>

              <div className="w-full">
                <label htmlFor="lname" className="block mb-2.5">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
              <div className="w-full">
                <label htmlFor="email" className="block mb-2.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                />
              </div>

              <div className="w-full">
                <label htmlFor="contact" className="block mb-2.5">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block mb-2.5">
                New Password (optional)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
              />
            </div>

            <Button type="submit" variant="contained" className="submitButton">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
