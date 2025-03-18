import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';
import Header from '../components/layout/Header';
 
export function AppRoutes() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={ <h1 className='container'>Olá mundo!</h1> } />
                {/* <Route path='/' element={ <Home /> } />
                <Route path="*" element={ <NotFound /> } /> */}
            </Routes>
        </Router>
    )
}