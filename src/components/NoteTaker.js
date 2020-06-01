import React from "react";
import Notes from "./Notes";

let formattedDate;
let formattedTime;

const TextArea = (props) => {
  return (
    <div className="container">
      <textarea
        className="form-control"
        value={props.state.note}
        placeholder="Enter your note here"
        onChange={props.handleChange}
      ></textarea>
      <button className="btn btn-primary" onClick={props.save}>
        Done
      </button>
    </div>
  );
};

const Reveal = (props) => {
  return (
    <TextArea
      save={props.save}
      handleChange={props.handleChange}
      state={props.state}
    />
  );
};

class NoteTaker extends React.Component {
  state = {
    notes: [],
    click: undefined,
    note: "",
    edit: undefined,
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("notes");
      const notes = JSON.parse(json);
      if (notes) {
        this.setState(() => ({ notes: notes }));
      }
    } catch (e) {}
  }

  componentDidUpdate(pervProps, prevState) {
    if (prevState.notes.length !== this.state.notes.length) {
      const json = JSON.stringify(
        this.state.notes.sort((a, b) => (a > b ? 1 : a < b ? 1 : 0))
      );
      localStorage.setItem("notes", json);
    }
  }

  handleDate = () => {
    const date = new Date();

    formattedDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

    let period;

    if (date.getHours() > 12) {
      period = "PM";
    } else {
      period = "AM";
    }

    formattedTime = `${date.getHours()}-${date.getMinutes()} ${period}`;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ click: undefined }));

    const note = this.state.note;
    this.handleDate();

    const noteObj = {
      createdAt: formattedDate,
      note: note,
      time: formattedTime,
    };
    if (note.trim(" ") !== "") {
      this.setState((prevState) => ({
        notes: prevState.notes.concat(noteObj),
      }));
      this.setState(() => ({ note: "" }));
    }
  };

  handleDelete = (noteToRemove) => {
    const value = this.state.notes.filter((note) => noteToRemove !== note.note);

    this.setState((prevState) => ({ notes: value }));
  };

  handleReveal = () => {
    this.setState(() => ({ click: true }));
  };

  handleEdit = (noteToEdit) => {
    this.handleReveal();

    this.setState(() => ({ edit: true }));
    this.setState(() => ({ note: noteToEdit }));
    this.handleDelete(noteToEdit);
  };

  handleChange = (e) => {
    let value = e.target.value;
    this.setState((prevState) => ({
      note: value,
    }));
  };

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1 className="page-header">Note Taker</h1>
          <h4>Built during the 7days 7 web app chalange</h4>
        </div>
        {this.state.click == true ? (
          <Reveal
            state={this.state}
            handleChange={this.handleChange}
            save={this.handleSubmit}
          />
        ) : (
          <button className="btn btn-primary" onClick={this.handleReveal}>
            Add Note
          </button>
        )}
        <br />
        <br />
        <Notes
          handleEdit={this.handleEdit}
          state={this.state.notes}
          handleDelete={this.handleDelete}
          handleIndex={this.handleIndex}
        />
      </div>
    );
  }
}

export default NoteTaker;
