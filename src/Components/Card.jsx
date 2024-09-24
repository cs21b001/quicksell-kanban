import React from "react";
import "./Card.css";
import greyDot from "../Assets/gray dot.png";
import Todo from "../Assets/To-do.svg";
import inProgress from "../Assets/in-progress.svg";
import done from "../Assets/Done.svg";
import canceled from "../Assets/Cancelled.svg";
import backlog from '../Assets/Backlog.svg'
import NP from '../Assets/No-priority.svg'
import LP from '../Assets/Img - Low Priority.svg'
import MP from '../Assets/Img - Medium Priority.svg'
import HP from '../Assets/Img - High Priority.svg'
import UP from '../Assets/SVG - Urgent Priority grey.svg'

const card = (cardData) => {
  const { id, title, tag, userId, status, priority} = cardData;
  var statusLogo;
  var priorityLogo;
  switch (status) {
    case 'Todo':
      statusLogo = Todo;
      break;
    case 'In progress':
      statusLogo = inProgress;
      break;
    case 'Done':
      statusLogo = done;
      break;
    case 'Cancelled':
      statusLogo = canceled;
      break;
    case 'Backlog':
      statusLogo = backlog;
      break;

    default:
      break;
  }
  switch (priority) {
    case 0:
      priorityLogo = NP;
      break;
    case 1:
      priorityLogo = LP;
        
      break;
    case 2:
      priorityLogo = MP;
      break;
    case 3:
      priorityLogo = HP;  
      break;
    case 4:
      priorityLogo = UP;         
      break;
    default:
      break;
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <img src={userId} alt="U" className="user-avatar" />
      </div>
      <div className="card-body">
        <img src={statusLogo} alt="SL" className="status-icon" />
        <h2 className="card-title">{title}</h2>
      </div>
      {}
      <div className="card-tag">
        {console.log(priority)}
        <img src={priorityLogo} alt="PL" className="priority-icon" />
      { tag.length > 0 && (
          tag.map((t, index) => (
            <div className="tag-body" key={index}>
              <img src={greyDot} alt="" className="tag-icon" />
              <span className="tag-text">{t}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default card;
