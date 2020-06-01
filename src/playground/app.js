const appRoot = document.getElementById("app");

class IndecisionAPP extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    try {
      console.log("fetching Data");
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options: options }));
      }
    } catch (e) {}
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("saving Data");
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  componentWillUnmount() {}

  handleRemoveAll() {
    this.setState(() => ({ options: [] }));
  }

  //takes argument passed up form option
  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        //this return false thus the filter method removes it from the array
        return optionToRemove !== option;
      })
    }));
  }

  handlePick() {
    const option = this.state.options;
    const random = Math.floor(Math.random() * option.length);

    alert(option[random]);
  }

  handleAddOption(option) {
    if (this.state.options.indexOf(option) > -1) {
      return "This option already exist";
    } else if (!option) {
      return "Enter a valid option";
    }

    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  }

  render() {
    const title = "Indecision App";
    const subTitle = "put your life in the hand of a computer";
    return (
      <div>
        <Header title={title} subtitle={subTitle} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          handleRemoveAll={this.handleRemoveAll}
          options={this.state.options}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOpt={this.handleAddOption} />
      </div>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

const Action = props => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.handlePick}>
        What should i Do
      </button>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.add.value.trim(" ");

    //this passes option to the function and fetches the return value of the handleAddopt function
    const error = this.props.handleAddOpt(option);

    if (!error) {
      e.target.elements.add.value = "";
    }

    this.setState(() => ({ error }));
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="add" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

const Options = props => {
  return (
    <div>
      <button onClick={props.handleRemoveAll}>Remove All</button>
      {props.options.length === 0 && <p>Please Add An option to get started</p>}
      {/* loops through the options array and in each case return some html element */}
      {props.options.map(option => {
        return (
          <Option
            key={option}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
          />
        );
      })}
    </div>
  );
};

const Option = props => {
  return (
    <div>
      <ul>
        {props.optionText}
        <button
          onClick={e => {
            // takes the list value text and passes it as an argument to hanleDeleteOption method
            props.handleDeleteOption(props.optionText);
          }}
        >
          remove
        </button>
      </ul>
    </div>
  );
};

ReactDOM.render(<IndecisionAPP />, appRoot);
