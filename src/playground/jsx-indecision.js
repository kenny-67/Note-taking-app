console.log("app.js is running");
var appRoot = document.getElementById("app");

const app = {
  title: "Indecisiol App",
  subTitle: "someSubTitle",
  options: []
};

const onFormSubmit = e => {
  e.preventDefault();

  // starts from the button and gets all elementsif the form by name then select the value of the element that has option as name
  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);

    e.target.elements.option.value = "";
    renderApp();
  }
};

const remove = () => {
  app.options.length = 0;

  renderApp();
};

const onMakeDecesion = () => {
  const randomNo = Math.floor(Math.random() * app.options.length);

  const option = app.options(randomNo);

  alert(options);
};

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subTitle && <p>{app.subTitle}</p>}
      <p>{app.options.length > 0 ? "Here are your options" : "No Options"}</p>
      <button disabled={app.options.length === 0} onCLick={onMakeDecesion}>
        What Should I Do
      </button>
      <button onClick={remove}>Remove All</button>

      <ol>
        {app.options.map(str => {
          return <li key={str}>{str}</li>;
        })}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Options</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

renderApp();
