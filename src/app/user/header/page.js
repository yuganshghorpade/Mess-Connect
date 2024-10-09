'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const logoutUser = async()=> {
        try {
            const response = await axios.post("/api/auth/logout", {}, { withCredentials: true });
            router.replace("/login");
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
    
        if (searchTerm) { // Check if searchTerm is not empty
            try {
                // Send searchTerm to the backend
                const response = await axios.post("/api/mess/fetching-messes-locations", { searchTerm });
    
                if (response.data.success) {
                    const messes = response.data.messes;
                    
                    if (messes.length > 0) {
                        // If messes found, redirect to the first found mess
                        router.push(`/mess/${messes[0]._id}`);
                    } else {
                        alert("No mess found with the provided name.");
                    }
                } else {
                    alert("Error: " + response.data.message);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            alert("Please enter a search term.");
        }
    };
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full bg-gradient-to-r from-green-400 via-green-300 to-green-500 shadow-md">
            <div className="flex items-center justify-between h-16 px-4 md:px-10">
                <div className="flex items-center flex-1">
                    <div className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg mr-10">
                        Taste Buddies
                    </div>

                    <form onSubmit={handleSearch} className="flex-1 max-w-[600px]">
                        <div className="flex space-x-4 w-full">
                            <div className="flex items-center bg-white rounded-full border shadow-sm w-full md:w-auto">
                                <Input
                                    type="text"
                                    placeholder="Search Mess"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="h-10 px-4 py-2 rounded-l-full border-none outline-none text-gray-700 w-full transition-all focus:ring-2 focus:ring-green-400"
                                />
                            </div>
                            <Button type="submit" className="h-10 px-4 py-2 rounded-full bg-green-600 text-white">
                                Search
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    {isLoggedIn && userData ? (
                        <div className="flex items-center space-x-2">
                            <FaUserCircle size={30} className="text-white" />
                            <span className="text-white text-lg">{userData.name}</span>
                        </div>
                    ) : (
                        <>
                            <Link href="/user">
                                <span className="text-white text-lg hover:text-gray-200 cursor-pointer transition-colors duration-300 px-5">Home</span>
                            </Link>
                            <Link href="/user/menu">
                                <span className="text-white text-lg hover:text-gray-200 cursor-pointer transition-colors duration-300 px-5">Menu</span>
                            </Link>
                            <Link href="/user/profile">
                                <span className="text-white text-lg hover:text-gray-200 cursor-pointer transition-colors duration-300 px-5">Profile</span>
                            </Link>
                            <Button onClick={logoutUser} className="bg-white text-gray-800 hover:bg-white-300 rounded-xl px-4 py-2">
                                Logout
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {isMenuOpen && (
                <div className="flex flex-col items-center space-y-4 bg-gradient-to-r from-green-400 via-green-300 to-green-500 py-4 md:hidden">
                    <Link href="/user">
                        <span className="text-white text-lg hover:text-gray-200 cursor-pointer transition-colors duration-300">Home</span>
                    </Link>
                    <Link href="/user/menu">
                        <span className="text-white text-lg hover:text-gray-200 cursor-pointer transition-colors duration-300">Menu</span>
                    </Link>
                    <Link href="/user/profile">
                        <span className="text-white text-lg hover:text-gray-200 cursor-pointer transition-colors duration-300">Profile</span>
                    </Link>
                    <Button onClick={logoutUser} className="bg-white text-gray-800 hover:bg-white-300 rounded-xl px-4 py-2">
                                Logout
                            </Button>
                </div>
            )}
        </div>
    );
}
