import React, { useState } from "react";

import "./DisplayDropdown.css";
import Display from "../../Assets/Display.svg";
import Down from "../../Assets/down.svg";

const DisplayDropdown = ({ onGroupChange, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className={`dropdown ${isOpen ? 'active' : ''}`}>
        <div className="display-container">
          <button className="display-button" onClick={toggleDropdown}>
            <img src={Display} alt="Display Icon" />
            <span>Display</span>
            <img src={Down} alt="Down Arrow" />
          </button>
        </div>
        <div className="dropdown-content">
          <div>
            <label>Grouping</label>
            <select onChange={(e) => onGroupChange(e.target.value)}>
              <option value="">Select</option>
              <option value="status">Status</option>
              <option value="userId">User ID</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <label>Sorting</label>
            <select onChange={(e) => onSortChange(e.target.value)}>
              <option value="">Select</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  
  export default DisplayDropdown;