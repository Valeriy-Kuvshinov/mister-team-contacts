const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

// import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
import { teamsService } from './services/teams.service.js'
import { HomePage } from './pages/HomePage.jsx'
import { TodoDetails } from './cmps/TodoDetails.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'
// import { CarIndex } from './pages/CarIndex.jsx'
import { store } from './store/store.js'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    {/* <AppHeader /> */}
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<TodoDetails />} path="/todo/details/:todoId" />
                            <Route element={<TodoDetails />} path="/todo/details" />
                            {/* <Route element={<CarIndex />} path="/car" /> */}
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>
    )
}


