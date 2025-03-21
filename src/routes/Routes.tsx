import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';
import Header from '../components/layout/Header';
import Home from '../pages/home';
import NotFound from '../pages/NotFound';
 
export function AppRoutes() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </Router>
    )
}