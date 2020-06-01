import React from "react";

class Input extends React.Component {
  render() {
    return (
      <div>
        <br />
        <div className="container">
          <form onSubmit={this.props.handleSubmit}>
            <div className="form-group">
              <label>Add your Notes</label>
              <textarea name="note" className="form-control"></textarea>
            </div>
            <button className="btn btn-primary">Done</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Input;
