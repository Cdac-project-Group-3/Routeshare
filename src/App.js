import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import ProtectedRoute from "./components/Common/ProtectedRoute";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import AvailPool from "./pages/AvailPool";

import OfferDetails from "./pages/OfferDetails";

import OfferPool from "./pages/OfferPool";

import OfferToday from "./pages/OfferToday";

import MyOffers from "./pages/MyOffers";

import MyBookings from "./pages/MyBookings";

import Profile from "./pages/Profile";

import Help from "./pages/Help";

import About from "./pages/About";

import NotFound from "./pages/NotFound";

import "./App.css";

 

function App() {

  return (

    <Routes>

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

 

      <Route

        element={

          <ProtectedRoute>

            <Layout />

          </ProtectedRoute>

        }

      >

        <Route index element={<Navigate to="/avail" replace />} />

        <Route path="/avail" element={<AvailPool />} />

        <Route path="/avail/:id" element={<OfferDetails />} />

        <Route path="/offer" element={<OfferPool />} />

        <Route path="/offer-today" element={<OfferToday />} />

        <Route path="/my-offers" element={<MyOffers />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/help" element={<Help />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<NotFound />} />

      </Route>

    </Routes>

  );

}

 

export default App;

 

