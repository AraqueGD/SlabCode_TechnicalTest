// SASS
import "./App.scss";

// Components
import Calendar from "./components/Calendar";
import CreateEvent from "./components/CreateEvent";

// React Router DOM
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import FrameWork Bootsrap
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Calendar} />
        <Route
          path="/create"
          render={(props) => <CreateEvent {...props} isCreate={true} />}
        />
        <Route
          path="/edit/:id"
          render={(props) => <CreateEvent {...props} isCreate={false} />}
        />
      </div>
    </Router>
  );
}

export default App;
