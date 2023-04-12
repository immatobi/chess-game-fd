import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import loader from './components/helpers/loader';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorUI from './components/layouts/globals/ErrorUI';

import DashboardLayout from './components/layouts/globals/Dashboard';

import ResourceState from './context/resource/resourceState';
import UserState from './context/user/userState';

const Login = React.lazy(() => import('./components/pages/auth/Login'));
const Register = React.lazy(() => import('./components/pages/auth/Register'));
const Home = React.lazy(() => import('./components/pages/Home'));
const Game = React.lazy(() => import('./components/pages/dashboard/rooms/Game'));


const App = () => {

  const errorHandler = (err, info) => {
    console.log(err, 'logged error');
    console.log(info, 'logged error info');
  }

  

  return(

    <Router>

        <UserState>

            <ResourceState>

                <Suspense fallback={loader.MainLoader()}>

                    <ErrorBoundary FallbackComponent={ErrorUI} onReset={() => { window.location.reload() }} onError={errorHandler}>

                        <Routes>

                            <Route path='/' element={<Login />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/dashboard' element={<Home />} />
                            <Route path='/dashboard/rooms/game' element={<Game />} />
                            
                            <Route path='*' element={<Login />} />
                            
                        </Routes>

                    </ErrorBoundary>

                </Suspense>

            </ResourceState>

        </UserState>

    </Router>

  )

}

export default App;