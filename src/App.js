import React, {Component} from 'react'
import './App.scss'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import About from './About/About'
import Cars from './Cars/Cars'
import CarDetail from './CarDetail/CarDetail'

class App extends Component {

  state = {
    isLoggedIn: false
  }

  render() {

    return (
      <div>
        <nav className="nav" exact >
          <ul>
            <li>
              <NavLink to="/" exact activeClassName={'wfm-active'}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" exact
                       activeStyle={ {color: 'blue'} }
              >About</NavLink>
            </li>
            <li>
              <NavLink to={{         // Развёрнутое указание пути
                pathname: '/cars',  //  Сам путь, как и прежде
              }} exact>Cars</NavLink>
            </li>
          </ul>
        </nav>
        <hr/>
        <div style={{textAlign: 'center'}}>
          <h3>Is logged in {this.state.isLoggedIn ? 'TRUE' : 'FALSE'}</h3>
          <button onClick={()=> this.setState({isLoggedIn: true})}>Login</button>
        </div>

        <hr/>

        {/* localhost:3000 */}
        {/*exact - означает точное соответствие пути*/}
        {/*в качестве результата перехода по данному пути здесь просто выводится заголовок*/}
        <Switch>
          <Route path="/" exact render={() => <h1>Home Page</h1>} />
          { this.state.isLoggedIn ? <Route path="/about" component={About} /> : null}
          <Route path="/cars/:name" component={CarDetail} />{/*А так загружается суб-компонент*/}
          <Route path="/cars" component={Cars} />
          {/*<Route render={()=> <h1 style={{color: 'red', textAlign: 'center'} }>404 not found!!!</h1>} />*/}
          <Redirect to={'/'} />
        </Switch>'

      </div>
    );
  }
}

export default App
