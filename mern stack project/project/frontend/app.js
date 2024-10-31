import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import ChatPage from './pages/ChatPage';

function App() {
    return (
        <Router>
            <Header />
            <main className="flex-shrink-0">
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/submit-complaint" component={SubmitComplaint} />
                    <Route path="/my-complaints" component={MyComplaints} />
                    <Route path="/chat/:id" component={ChatPage} />
                </Switch>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
