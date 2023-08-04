import React, { Suspense, lazy } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { AuthProvider } from './context/AuthProvider'
import PrivateRoute from './pages/PrivateRoute'
import { DataProvider } from './context/DataProvider'
import './index.scss'
import { Workspace } from './components/Workspace'
import ErrorBoundary from './ErrorBoundary'

const Main = lazy(() => import('./pages/Main'))
const Login = lazy(() => import('./pages/Login'))
const Error = lazy(() => import('./pages/Error'))


const App: React.FC = () => {
    return (
        <ErrorBoundary >
            <DataProvider>
                <AuthProvider>
                    <Router>
                        <Routes>
                            <Route>
                                <Route path={'/'} element={<PrivateRoute><Suspense><Main /></Suspense></PrivateRoute>} >
                                    <Route path={'/:id'} element={<Workspace />}  />
                                </Route>
                                <Route path='*' element={<Suspense><Error /></Suspense>} />
                                <Route path='login' element={<Suspense><Login /></Suspense>} />
                            </Route>
                        </Routes>
                    </Router>
                </AuthProvider>
            </DataProvider>
        </ErrorBoundary>
    )
}

export default App