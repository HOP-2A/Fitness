const Greeting = () => {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "";
  let style = {};

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning 🌅";
    style = { color: "#FFB347" };
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon ☀️";
    style = { color: "#FF7F50" };
  } else {
    greeting = "Good Evening 🌙";
    style = { color: "#6A5ACD" };
  }

  return <h1 style={style}>{greeting}</h1>;
};

export default Greeting;
