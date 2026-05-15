import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";



import EventDetails from "./pages/EventDetails";
import Booking from "./pages/Booking";

import BookingList from "./pages/BookingList";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import CategoryDetails from "./pages/CategoryDetails";
import Events from "./pages/Events";
import UserOrders from "./pages/UserOrders";
import PaymentSuccess from "./pages/PaymentSuccess";
import UsersList from "./pages/UsersList";
import "./App.css";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
       <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
 
        <Route path="/booking" element={<Booking />} />
        
        <Route path="/event-details" element={<EventDetails />} />
  
        
        <Route path="/eventdetails" element={<EventDetails />} />
        <Route path="/bookinglist" element={<BookingList />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />
 /      <Route path="/category/:category" element={<CategoryDetails />} />
         <Route path="/events" element={<Events />} />
            <Route path="/user-orders" element={<UserOrders />} />
           <Route path="/success"element={<PaymentSuccess />}
           />
        <Route path="/user-list"element={<UsersList />}/>



       </Routes>
    </Router>
  );
}

export default App;