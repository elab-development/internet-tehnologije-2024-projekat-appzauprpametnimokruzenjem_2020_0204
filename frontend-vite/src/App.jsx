
import React, { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import axios from "./api/axios"; 

function App() {

  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await axios.get("/ping"); // ruta npr. /ping ili /status
        console.log("Backend response:", res.data);
      } catch (err) {
        console.error("Backend error:", err.message);
      }
    };
    testConnection();
  }, []);

  const [isRegister, setIsRegister] = useState(false);

  


  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#52565E] font-sans">
      {/* Header */}
      <header className="bg-[#64DED2] px-6 py-4 flex justify-between items-center rounded-xl">
        <nav className="flex gap-6">
          <a href="#" className="text-[#F5F5F5] hover:font-bold font-medium">Home</a>
          <a href="#" className="text-[#F5F5F5] hover:font-bold font-medium">About</a>
          <a href="#" className="text-[#F5F5F5] hover:font-bold font-medium">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#F5F5F5] hover:font-bold font-medium">Login</a>
          <div className="w-8 h-8 rounded-xl bg-[#F5F5F5] flex items-center justify-center text-[#64DED2] font-bold text-sm border border-[#64DED2]">
            A
          </div>
        </div>
      </header>

      <main className="p-8 space-y-16 max-w-4xl mx-auto">
        {/* Buttons */}
        <section>
          <h2 className="text-xl font-bold mb-4">Buttons</h2>
          <div className="flex gap-4">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-colored">Colored</button>
            <button className="btn btn-secondary">Secondary</button>
          </div>
        </section>

        {/* Login/Register Container */}
        <section>
          <h2 className="text-xl font-bold mb-4">
            {isRegister ? "Register Form" : "Login Form"}
          </h2>
          <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" placeholder="you@example.com" className="input" />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                {isRegister ? "Create Password" : "Password"}
              </label>
              <input type="password" placeholder="••••••••" className="input" />
            </div>
            {isRegister && (
              <div>
                <label className="block mb-1 font-medium">Confirm Password</label>
                <input type="password" placeholder="••••••••" className="input" />
              </div>
            )}
            <button className="btn btn-colored w-full">
              {isRegister ? "Register" : "Login"}
            </button>
            <p className="text-center text-sm">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-[#64DED2] hover:underline font-medium"
              >
                {isRegister ? "Login here" : "Register here"}
              </button>
            </p>
          </div>
        </section>

        {/* Device Grid */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Smart Devices by Room</h2>
            <span className="text-xl cursor-pointer">...</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                room: "Living Room", device: "Smart TV", type: "Entertainment", icon: "📺", status: "Online",
              },
              {
                room: "Kitchen", device: "Smart Fridge", type: "Appliance", icon: "🧊", status: "Online",
              },
              {
                room: "Bedroom", device: "Smart Light", type: "Lighting", icon: "💡", status: "Offline",
              },
              {
                room: "Garage", device: "Smart Door", type: "Security", icon: "🚪", status: "Online",
              },
              {
                room: "Bathroom", device: "Smart Mirror", type: "Utility", icon: "🪞", status: "Online",
              },
              {
                room: "Living Room", device: "Smart Speaker", type: "Audio", icon: "🔊", status: "Offline",
              }
            ].map(({ room, device, type, icon, status }, idx) => (
              <div key={idx} className="card">
                <div className="flex items-center justify-between">
                  <span className="text-lg">{icon}</span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    status === "Online"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {status}
                  </span>
                </div>
                <h3 className="text-md font-bold">{device}</h3>
                <p className="text-sm text-[#64DED2]">{type}</p>
                <p className="text-xs text-gray-400">Room: {room}</p>
                <div className="text-right text-lg text-gray-400 cursor-pointer">...</div>
              </div>
            ))}
          </div>
        </section>

        {/* Popups */}
        <section className="mt-16 space-y-12">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-bold text-center">Add New Room</h2>
            <input type="text" placeholder="Room name" className="input" />
            <button className="btn btn-colored w-full">Add Room</button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-bold text-center">Add New Device</h2>
            <input type="text" placeholder="Device name" className="input" />
            <select className="input">
              <option>Select device type</option>
              <option>Lighting</option>
              <option>Entertainment</option>
              <option>Security</option>
              <option>Appliance</option>
              <option>Audio</option>
              <option>Utility</option>
            </select>
            <select className="input">
              <option>Select room</option>
              <option>Living Room</option>
              <option>Kitchen</option>
              <option>Bedroom</option>
            </select>
            <button className="btn btn-colored w-full">Add Device</button>
          </div>
        </section>
      </main>
    </div>
  );
}


export default App;
