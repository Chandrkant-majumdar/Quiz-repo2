import React from "react";
import { HiUserCircle } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { AiOutlineIdcard } from "react-icons/ai";
import { RiUserStarLine } from "react-icons/ri";
import { FaBuilding, FaGraduationCap } from "react-icons/fa";

function TeacherInfo({ userData }) {
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-hidden mb-8 rounded-lg shadow-md">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
      <div className="relative z-10 p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Teacher Information</h2>
        <div className="text-lg text-gray-800">
          <p className="flex items-center mb-4">
            <HiUserCircle className="mr-3 text-3xl text-blue-500" />
            <span className="font-semibold text-lg">Username:</span>{" "}
            {userData.username}
          </p>
          <p className="flex items-center mb-4">
            <MdEmail className="mr-3 text-3xl text-blue-500" />
            <span className="font-semibold text-lg">Email:</span>{" "}
            {userData.email}
          </p>
          <p className="flex items-center mb-4">
            <AiOutlineIdcard className="mr-3 text-3xl text-blue-500" />
            <span className="font-semibold text-lg">User ID:</span>{" "}
            {userData.userId}
          </p>
          <p className="flex items-center mb-4">
            <RiUserStarLine className="mr-3 text-3xl text-blue-500" />
            <span className="font-semibold text-lg">Full Name:</span>{" "}
            {userData.fullName}
          </p>
          <p className="flex items-center mb-4">
            <FaBuilding className="mr-3 text-3xl text-blue-500" />
            <span className="font-semibold text-lg">Department:</span>{" "}
            {userData.department}
          </p>
          <p className="flex items-center">
            <FaGraduationCap className="mr-3 text-3xl text-blue-500" />
            <span className="font-semibold text-lg">Course:</span>{" "}
            {userData.course}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfo;
