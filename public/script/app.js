"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appRoot = document.getElementById("app");

var IndecisionAPP = function (_React$Component) {
  _inherits(IndecisionAPP, _React$Component);

  function IndecisionAPP(props) {
    _classCallCheck(this, IndecisionAPP);

    var _this = _possibleConstructorReturn(this, (IndecisionAPP.__proto__ || Object.getPrototypeOf(IndecisionAPP)).call(this, props));

    _this.handleRemoveAll = _this.handleRemoveAll.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    _this.state = {
      options: []
    };
    return _this;
  }

  _createClass(IndecisionAPP, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      try {
        console.log("fetching Data");
        var json = localStorage.getItem("options");
        var options = JSON.parse(json);

        if (options) {
          this.setState(function () {
            return { options: options };
          });
        }
      } catch (e) {}
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      console.log("saving Data");
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem("options", json);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "handleRemoveAll",
    value: function handleRemoveAll() {
      this.setState(function () {
        return { options: [] };
      });
    }

    //takes argument passed up form option

  }, {
    key: "handleDeleteOption",
    value: function handleDeleteOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            //this return false thus the filter method removes it from the array
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: "handlePick",
    value: function handlePick() {
      var option = this.state.options;
      var random = Math.floor(Math.random() * option.length);

      alert(option[random]);
    }
  }, {
    key: "handleAddOption",
    value: function handleAddOption(option) {
      if (this.state.options.indexOf(option) > -1) {
        return "This option already exist";
      } else if (!option) {
        return "Enter a valid option";
      }

      this.setState(function (prevState) {
        return { options: prevState.options.concat(option) };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var title = "Indecision App";
      var subTitle = "put your life in the hand of a computer";
      return React.createElement(
        "div",
        null,
        React.createElement(Header, { title: title, subtitle: subTitle }),
        React.createElement(Action, {
          handlePick: this.handlePick,
          hasOptions: this.state.options.length > 0
        }),
        React.createElement(Options, {
          handleRemoveAll: this.handleRemoveAll,
          options: this.state.options,
          handleDeleteOption: this.handleDeleteOption
        }),
        React.createElement(AddOption, { handleAddOpt: this.handleAddOption })
      );
    }
  }]);

  return IndecisionAPP;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      props.title
    ),
    React.createElement(
      "h2",
      null,
      props.subtitle
    )
  );
};

var Action = function Action(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { disabled: !props.hasOptions, onClick: props.handlePick },
      "What should i Do"
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: "handleAddOption",
    value: function handleAddOption(e) {
      e.preventDefault();

      var option = e.target.elements.add.value.trim(" ");

      //this passes option to the function and fetches the return value of the handleAddopt function
      var error = this.props.handleAddOpt(option);

      if (!error) {
        e.target.elements.add.value = "";
      }

      this.setState(function () {
        return { error: error };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.state.error && React.createElement(
          "p",
          null,
          this.state.error
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleAddOption },
          React.createElement("input", { type: "text", name: "add" }),
          React.createElement(
            "button",
            null,
            "Add Option"
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

var Options = function Options(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: props.handleRemoveAll },
      "Remove All"
    ),
    props.options.length === 0 && React.createElement(
      "p",
      null,
      "Please Add An option to get started"
    ),
    props.options.map(function (option) {
      return React.createElement(Option, {
        key: option,
        optionText: option,
        handleDeleteOption: props.handleDeleteOption
      });
    })
  );
};

var Option = function Option(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "ul",
      null,
      props.optionText,
      React.createElement(
        "button",
        {
          onClick: function onClick(e) {
            // takes the list value text and passes it as an argument to hanleDeleteOption method
            props.handleDeleteOption(props.optionText);
          }
        },
        "remove"
      )
    )
  );
};

ReactDOM.render(React.createElement(IndecisionAPP, null), appRoot);
