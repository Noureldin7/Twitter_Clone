import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import "./components/Homepage/Styles/Homepage.css";
import ProfilePage from "./components/Profile/ProfilePage";
import SettingsPage from "./components/settings/SettingsPage";
import NextSignUp from "./components/login/NextSignUp";
import Modal from "./components/login/Modal";
import Report from "./components/Homepage/Report";
import axios from "axios";
import ReportAction from "./components/Homepage/ReportAction";
import AccountSettings from "./components/settings/AccountSettings";
import ReportsPage from "./components/Admin/ReportsPage";
import FollowingPage from "./components/Profile/FollowingPage";
import FollowersPage from "./components/Profile/FollowersPage";
function App() {
  // DUMMY VAR dark mode just to make useeffect work when clicked on changing mode
  const [DarkMode, setDarkMode] = useState(false);
  function handleChangeDisplayMode() {
    setDarkMode(!DarkMode);
  }

  //related to request to back end
  const userId = localStorage.getItem("userId");
  const [profileData, setProfileData] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    console.log(localStorage.getItem("accessToken"));
    axios
      .get(
        `http://localhost:4000/profile/${userId}/me`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.error) {
        } else {
          setProfileData(res.data);
          setReady(true);
        }
      });
  }, [DarkMode]);
  const [isAdmin, setisAdmin] = useState(false);
  function checkAdmin() {
    if (localStorage.getItem("adminToken") !== "") {
      setisAdmin(true);
      //console.log(isAdmin);
    }
  }
  return (
    <div>
      {/* Routing from Nav bar in login main screen*/}
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route path="/SignUp" element={<Signup />}></Route>
          </Routes>
        </div>
      </BrowserRouter>

      {/* Routing from Sidebar to all possible options */}
      <div
        className={profileData.darkMode === false ? "AppLight" : "AppDark"}
        onLoad={checkAdmin}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/Home"
              element={<Homepage isAdmin={isAdmin} />}
            ></Route>
            <Route
              path="/Settings"
              element={
                <SettingsPage
                  isDark={profileData.darkMode}
                  onDarkModeChange={handleChangeDisplayMode}
                  isAdmin={isAdmin}
                />
              }
            ></Route>
            <Route
              path="/Profile/:id"
              element={<ProfilePage isAdmin={isAdmin} />}
            ></Route>
            <Route
              path="/Profile/:id/with_replies"
              element={<ProfilePage isAdmin={isAdmin} />}
            ></Route>
            <Route
              path="/Profile/:id/media"
              element={<ProfilePage isAdmin={isAdmin} />}
            ></Route>
            <Route
              path="/Profile/:id/likes"
              element={<ProfilePage isAdmin={isAdmin} />}
            ></Route>
            <Route
              path="/Report/:reportType/:id"
              element={<Report isAdmin={isAdmin} />}
            ></Route>
            <Route
              path="/ReportAction"
              element={<ReportAction isAdmin={isAdmin} />}
            ></Route>
            <Route
              path="/Profile/:id/Following"
              element={<FollowingPage />}
            ></Route>
            <Route
              path="/Profile/:id/Followers"
              element={<FollowersPage />}
            ></Route>
            <Route path="/Logout" element={<Login />}></Route>
            <Route
              path="/ReportsPage"
              element={<ReportsPage isAdmin={isAdmin} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
      {/*  */}
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/NextStepSignup" element={<NextSignUp />}></Route>
            <Route path="/Verification" element={<Modal />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;
