import React from "react";
import "../styles/Notes.css";

const displayStyles = {
  display: "block",
  color: "magenta",
};

const Notes = ({ note }) => {
  return (
    <div class="note-component" style={displayStyles}>
      {note}
    </div>
  );
};

export default Notes;
