import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Branches from "./pages/Branches";
import BranchDetail from "./pages/BranchDetail";
import './App.css';
import {BankProvider} from "./contexts/BankContext";

function App() {

    return (
        <BankProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Branches}/>
                    <Route exact path="/:branchID" component={BranchDetail}/>
                </Switch>
            </BrowserRouter>
        </BankProvider>
    )
}

export default App;
