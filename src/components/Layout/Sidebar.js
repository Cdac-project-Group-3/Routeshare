import { NavLink } from "react-router-dom";

import "./Sidebar.css";

 

const navSections = [

  {

    title: "Find a ride",

    items: [

      {

        to: "/avail",

        label: "Avail Pool / Lift",

        icon: "🎫",

        description: "Browse rides from colleagues",

      },

    ],

  },

  {

    title: "Provide a ride",

    items: [

      {

        to: "/offer",

        label: "Offer Pool / Lift",

        icon: "🚗",

        description: "Publish a recurring ride",

      },

      {

        to: "/offer-today",

        label: "Offer for Today",

        icon: "⚡",

        description: "Quick one-day offer",

      },

    ],

  },

  {

    title: "My activity",

    items: [

      {

        to: "/my-offers",

        label: "My Offers",

        icon: "📋",

        description: "Rides I am driving",

      },

      {

        to: "/my-bookings",

        label: "My Bookings",

        icon: "🎟️",

        description: "Rides I have booked",

      },

    ],

  },

  {

    title: "Account",

    items: [

      {

        to: "/profile",

        label: "Profile",

        icon: "👤",

        description: "My details and preferences",

      },

      {

        to: "/help",

        label: "Help & FAQ",

        icon: "❓",

        description: "How to use the app",

      },

      {

        to: "/about",

        label: "About",

        icon: "ℹ️",

        description: "Project info and version",

      },

    ],

  },

];

 

function Sidebar() {

  return (

    <aside className="app-sidebar">

      {navSections.map((section) => (

        <div className="app-sidebar-section" key={section.title}>

          <p className="app-sidebar-section-title">{section.title}</p>

          <nav className="app-sidebar-nav">

            {section.items.map((item) => (

              <NavLink

                key={item.to}

                to={item.to}

                className={({ isActive }) =>

                  `app-sidebar-link${isActive ? " active" : ""}`

                }

              >

                <span className="app-sidebar-link-icon">{item.icon}</span>

                <span className="app-sidebar-link-text">

                  <span className="app-sidebar-link-label">{item.label}</span>

                  <span className="app-sidebar-link-description">

                    {item.description}

                  </span>

                </span>

              </NavLink>

            ))}

          </nav>

        </div>

      ))}

    </aside>

  );

}

 

export default Sidebar;

 

