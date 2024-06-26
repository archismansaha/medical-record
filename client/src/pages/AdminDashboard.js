import admin_profile from "../assets/img/dashboard/admin_profile.png";

import search from "../assets/img/dashboard/search2.png";
import Footer from "../components/landingPage/Footer";
import PatientList from "../components/adminDashboard/PatientList";
import Dashboard from "../components/adminDashboard/DashBoard";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
const apiUrl = 'https://medical-record-rxyo.onrender.com'


const AdminDashboard = (props) => {
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdmin() {
      let data = null;
      try{
        
        data=await axios.get(`${apiUrl}/getadmin`, {
        withCredentials: true,
        credentials: "include",
      });
      console.log(data)
      }
      catch (e){
        console.log("ERROR",e)
      } 
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      }
      setAdminEmail(data.data.admin.email);
    }
    fetchAdmin();
  }, []);

  return (
    <div className="full-body col-span-10">
      <div className="body-without-footer  h-screen max-h-min bg-bgprimary ">
        <div className="main  m-2  ">
          {/* dashboard today start */}
          <div className="">
            <div className="flex  h-12 m-2 bg-bgprimary rounded ml-6 ">
              <Link to="/admin/dashboard">
                <div>
                  <h1 className="text-2xl font-poppins font-bold p-2 ">
                    Admin Dashboard
                  </h1>
                </div>
              </Link>

              <div className="flex ml-20  h-10   ">
                <input
                  placeholder="Search"
                  className="w-96 rounded ml-4 text-xl   pl-4 border focus:outline-none "
                ></input>
                <div className="bg-white pl-2 rounded ">
                  <img
                    src={search}
                    className=" h-6 mt-2  cursor-pointer"
                    alt="search"
                  ></img>
                </div>
              </div>

              <div className="flex bg-white rounded shadow   px-4  ml-60 h-14 ">
                <img
                  src={admin_profile}
                  className="h-12 my-1  p-1 rounded-2xl"
                  alt="profile"
                ></img>
                <div className="flex items-center ml-4  font-bold font-poppins">
                  <h1>{adminEmail} </h1>
                </div>
              </div>
            </div>

            {/* Just After the navbar */}
            <div className="border">
            <Dashboard/>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AdminDashboard;
