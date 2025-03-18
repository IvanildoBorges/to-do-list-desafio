import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';
 
export function AppRoutes() {
    return (
        <Router>
            {/* <Header /> */}
            <Routes>
                <Route path='/' element={ <h1>Olá mundo!</h1> } />
                {/* <Route path='/' element={ <Home /> } />
                <Route path="*" element={ <NotFound /> } /> */}
            </Routes>
        </Router>
    )
}