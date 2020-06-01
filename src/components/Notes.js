import React from "react";
import Note from "./Note";

const Notes = (props) => {
  return (
    <div>
      <div className="">
        {props.state
          .sort((a, b) => (a > b ? 1 : -1))
          .map((note, index) => {
            return (
              <div>
                <Note
                  key={index}
                  handleEdit={props.handleEdit}
                  createdAt={note.createdAt}
                  note={note.note}
                  delete={props.handleDelete}
                  time={note.time}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
