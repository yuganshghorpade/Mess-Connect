'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import Header from "../header/page";
import Footer from "@/components/ui/footer";


export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie('accessToken');

<<<<<<< HEAD
        const response = await axios.get("/api/user/fetching-user-details", {
          withCredentials: true, // Ensure cookies are included if required
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        console.log("Response from server:", response);

=======
        // Make a request to the backend, including the token in the Authorization header
        const response = await axios.get("/api/user/fetching-user-details",{
          withCredentials:true
        })
        console.log(response)
>>>>>>> d2d790df47a788e47307aceab490205afe4dab4c
        // Check if response data contains user information
        if (response.data.success) {
          setUserData(response.data.response);
        } else {
          setError(response.data.message || "Failed to load user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
          {userData ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{userData.name}</h2>
              <p><strong>Email:</strong> {userData.email}</p>
              {userData.type === "mess" && (
                <>
                  <p><strong>Mess Name:</strong> {userData.messName}</p>
                  <p><strong>Address:</strong> {userData.address}</p>
                </>
              )}
              <p><strong>Account Type:</strong> {userData.type}</p>
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}