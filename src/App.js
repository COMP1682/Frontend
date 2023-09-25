import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'Theme';
import Home from 'Scenes/Home/Home';
import Login from 'Scenes/Login/Login';
import Profile from 'Scenes/Profile/Profile';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              path='/home'
              // element={isAuth ? <Home /> : <Navigate to='/'
              element={<Home />}
            />
            <Route
              path='/profile/:userId'
              // element={isAuth ? <Profile /> : <Navigate to='/' />}
              element={<Profile />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
