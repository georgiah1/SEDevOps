import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import PremiumContent from './PremiumContent';
import CRUD from './CRUD';
function App() {
  return (

    <div className="App">
     <BrowserRouter>
      <div className="header">
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink exact activeClassName="active" to="/register">Register</NavLink>
        <NavLink exact activeClassName="active" to="/login">Login</NavLink>
        <NavLink exact activeClassName="active" to="/premium-content">Premium Content</NavLink>
        <NavLink exact activeClassName="active" to="/CRUD">CRUD</NavLink>
      </div>
      <div className= "content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/premium-content" component={PremiumContent}/>
          <Route exact path="/CRUD" component={CRUD}/>
        </Switch>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
