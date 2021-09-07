import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const pageSize=12;
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

  const [mode, setMode] = useState('light');  //  mode check
  const [alert, setAlert] = useState(null);

  const showAlert = (message)=>{
    setAlert({
      msg: message,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1580);
  }

  const toggleMode = ()=>{
    if (mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor='#1a1a1a';
      showAlert("Dark Mode has been Enabled")
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
      showAlert("Light Mode has been Enabled")
    }
  }
    return (
      <Router>
        <div>
          <Navbar mode={mode} toggleMode={toggleMode}/>
          <LoadingBar color='rgb(13,110,253)' progress={progress} />
          <Switch>
            <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" mode={mode} /></Route>
            <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" mode={mode} /></Route>
            <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" mode={mode} /></Route>
            <Route exact path="/general"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" mode={mode} /></Route>
            <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" mode={mode} /></Route>
            <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" mode={mode} /></Route>
            <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" mode={mode} /></Route>
            <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" mode={mode} /></Route>
          </Switch>

        </div>
      </Router>
    )
}

export default App;