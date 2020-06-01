// let count = 0;

// const addOne = () => {
//   count++;
//   console.log("Clicked");
//   renderApp();
// };

// const minusOne = () => {
//   count--;
//   console.log("minus One");
//   renderApp();
// };

// const reset = () => {
//   count = 0;
//   console.log("reset");
//   renderApp();
// };

// const renderApp = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={addOne}>+1</button>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={reset}>reset</button>
//     </div>
//   );

//   ReactDOM.render(templateTwo, appRoot);
// };

// renderApp();

/*                  Using Component State           */

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    //default state object
    this.state = {
      count: 0
    };
  }
  handleAddOne() {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  }

  componentDidMount() {
    console.log("fetching Data");
    const json = localStorage.getItem("number");
    const number = parseInt(json, 10);

    if (!isNaN(number)) {
      this.setState(() => ({ count: number }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("saving Data");
    if (prevState.count !== this.state.count) {
      localStorage.setItem("number", this.state.count);
    }
  }

  handleMinusOne() {
    this.setState(prevState => {
      return {
        count: prevState.count - 1
      };
    });
  }
  handleReset() {
    this.setState(prevState => {
      return {
        count: 0
      };
    });
  }
  render() {
    return (
      <div>
        <h1>Count : {this.state.count} </h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

// //using a default prop value

// Counter.defaultProps = {
//   count: 0
// };

const appRoot = document.getElementById("app");

ReactDOM.render(<Counter />, appRoot);
