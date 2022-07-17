import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  const pageSize=12;
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

  //  mode & alert state check
  const [mode, setMode] = useState('light'); 
  const [alert, setAlert] = useState(null);

  const showAlert = (message)=>{
    setAlert({
      msg: message,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1580);
  }

  // switching in between themes
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
          {/* progress bar that seems to load content */}
          <LoadingBar color='rgb(13,110,253)' progress={progress} height={4} />
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
