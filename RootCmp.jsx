const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
// import { teamsService } from './services/teams.service.js'
import { HomePage } from './pages/HomePage.jsx'
import { MemberDetails } from './cmps/MemberDetails.jsx'
import { store } from './store/store.js'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    {/* <AppHeader /> */}
                    <main className='page-view'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<MemberDetails />} path="/team/details/:teamId/:memberId" />
                            {/* <Route element={<CarIndex />} path="/car" /> */}
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>
    )
}