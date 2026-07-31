
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import "./MyBookings.css";

function MyBookings() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);


  const loadBookings = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7278/api/Bookings/user/${user.id}`
      );

      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await axios.delete(
        `https://localhost:7278/api/Bookings/${bookingId}`
      );

      alert("Booking cancelled successfully");

      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Unable to cancel booking.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadBookings();
    }
  }, [user]);

  return (
    <div className="page">
      <div className="page-header">
        <h2>My Bookings</h2>
        <p className="page-subtitle">
          Rides you have booked as a passenger.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p className="empty-text">
            You have not booked any ride yet.
          </p>

          <Link to="/avail" className="btn btn-primary">
            Find a Ride
          </Link>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Route</th>
                <th>Start Point</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Status</th>
                <th>Booked At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.driverName}</td>
                  <td>{booking.route}</td>
                  <td>{booking.startPoint}</td>
                  <td>{booking.destination}</td>
                  <td>{booking.departureTime}</td>
                  <td>
                    <span className="status-badge status-confirmed">
                      {booking.status}
                    </span>
                  </td>
                  <td>{booking.bookedAt}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyBookings;