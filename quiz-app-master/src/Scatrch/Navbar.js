import { Link } from "react-router-dom";
import { useState } from "react";

function Nav({ brandText, menuItems }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item); // Toggle the selected item
    if (item.onClick) {
      item.onClick(); // Call the onClick function if provided
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-light navbar-expand-md"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0)", // Adjust transparency as needed
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "20px",
          position: "fixed",
          paddingTop: "20px",
          paddingBottom: "20px",
          top: "10px",
          left: "20px",
          right: "20px",
          zIndex: 1000,
          fontSize: "1.2rem",
          fontFamily: "sans-serif", // Adjusted font size for better visibility
          padding: "10px 20px", // Adjust padding as needed
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{
              color: "rgba(255, 255, 255, 255)", // Adjust text color as needed
              textDecoration: "none",
              marginRight: "20px",
              // Adjust space between brand text and menu items
            }}
          >
            {brandText}
          </Link>
          <div className="navbar-nav">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`nav-link ${
                  selectedItem === item ? "bg-darkBlue text-black" : ""
                }`}
                style={{
                  textDecoration: "none",
                  color: "rgba(255, 255, 255, 255)", // Adjust text color as needed
                  marginRight: "20px", // Adjust space between menu items
                }}
                onClick={() => handleMenuItemClick(item)}
                onMouseEnter={() => setSelectedItem(item)}
                onMouseLeave={() => setSelectedItem(null)}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
