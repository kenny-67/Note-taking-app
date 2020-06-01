const appRoot = document.getElementById("app");

// let value = 0;

// const show = () => {
//   if (value == 0) {
//     value++;
//   } else {
//     value--;
//   }
//   render();
// };

// const render = () => {
//   const template = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={show}>
//         {value == 0 ? "Show Details" : "Hide Details"}
//       </button>
//       {value == 1 && <p>Some random details is displayed on the screen</p>}
//     </div>
//   );
//   ReactDOM.render(template, appRoot);
// };

// render();

/*   Using  React Component State   */

class Visibility extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);

    this.state = {
      visibility: false
    };
  }
  handleToggleVisibility() {
    this.setState(prevState => {
      return {
        visibility: !prevState.visibility
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleVisibility}>
          {this.state.visibility ? "Hide Details" : "show Details"}
        </button>
        {this.state.visibility && <p>Some random paragraph to be displayed</p>}
      </div>
    );
  }
}

ReactDOM.render(<Visibility />, appRoot);
