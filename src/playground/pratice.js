const user = {
  name: "kenny",
  age: 50,
  location: "Lagos"
};

//if Statement
const getLocation = location => {
  if (location) {
    //returns location only if it exist
    return <p>Location : {location}</p>;
  }
};

const templateTwo = (
  <div>
    <h1>{user.name ? user.name : "Anonymous"} </h1>
    {/* shows the age pagagraph if age is greater than 18 and age exist */}
    {user.age >= 18 && user.age && <p>Age: {user.age}</p>}
    {getLocation(user.location)}
  </div>
);

var appRoot = document.getElementById("app");

ReactDOM.render(templateTwo, approot);
