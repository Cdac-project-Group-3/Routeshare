import { createContext, useContext, useState } from "react";

import { initialPoolOffers } from "../data/poolData";

 

const PoolContext = createContext(null);

 

export function PoolProvider({ children }) {

  const [offers, setOffers] = useState(initialPoolOffers);

  const [bookings, setBookings] = useState([]);

 

  const addOffer = (offer) => {

    setOffers((prev) => [...prev, { ...offer, id: Date.now() }]);

  };

 

  const updateOffer = (id, updates) => {

    setOffers((prev) =>

      prev.map((o) => (o.id === id ? { ...o, ...updates } : o))

    );

  };

 

  const deleteOffer = (id) => {

    setOffers((prev) => prev.filter((o) => o.id !== id));

    setBookings((prev) => prev.filter((b) => b.offerId !== id));

  };

 

  const bookSeat = (offerId, passenger) => {

    setOffers((prev) =>

      prev.map((o) =>

        o.id === offerId && o.availableSeats > 0

          ? { ...o, availableSeats: o.availableSeats - 1 }

          : o

      )

    );

    setBookings((prev) => [

      ...prev,

      {

        id: Date.now(),

        offerId,

        ...passenger,

        status: "confirmed",

        bookedAt: new Date().toISOString(),

      },

    ]);

  };

 

  const cancelBooking = (bookingId) => {

    const booking = bookings.find((b) => b.id === bookingId);

    if (!booking) return;

    setBookings((prev) => prev.filter((b) => b.id !== bookingId));

    setOffers((prev) =>

      prev.map((o) =>

        o.id === booking.offerId

          ? { ...o, availableSeats: o.availableSeats + 1 }

          : o

      )

    );

  };

 

  const value = {

    offers,

    bookings,

    addOffer,

    updateOffer,

    deleteOffer,

    bookSeat,

    cancelBooking,

  };

 

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;

}

 

export function usePool() {

  const ctx = useContext(PoolContext);

  if (!ctx) {

    throw new Error("usePool must be used inside a PoolProvider");

  }

  return ctx;

}

 

