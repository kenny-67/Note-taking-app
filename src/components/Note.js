import React from "react";

const Note = (props) => {
  return (
    <div className="container">
      <div className="pull-right">
        <button
          className="btn btn-success btn-sm space"
          onClick={(e) => {
            props.handleEdit(props.note);
          }}
        >
          edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            props.delete(props.note);
          }}
        >
          delete
        </button>
        <p className="inline">
          createdOn: {props.createdAt} At {props.time}
        </p>
      </div>

      <div className="note">
        <p>{props.note}</p>
      </div>
    </div>
  );
};

export default Note;
