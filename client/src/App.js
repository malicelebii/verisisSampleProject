import { Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./components/EditUser/EditUser";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <div style={{ minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={AdminPanel} />
          <Route exact path="/adduser" component={AddUser} />
          <Route exact path="/:id" component={EditUser} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
