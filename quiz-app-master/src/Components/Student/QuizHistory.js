import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function UserInfo() {
  const [userData, setUserData] = useState(null);
  let { studentId } = useParams();
  console.log(studentId);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${studentId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [studentId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">Quiz History</h2>
      <p>Email: {userData.email}</p>
      <p>Quizzes Taken: {userData.password}</p>
      <p>Total Score: {userData.username}</p>
    </div>
  );
}

export default UserInfo;
