import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes'
import { Fragment } from 'react';
import { Router } from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function App() {
  return (
    <BrowserRouter>

    <AuthContextProvider>
      <PrimeReactProvider>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.element;
              let Layout = Fragment;
              let ProtectedRoute = Fragment
              if (route.layout) {
                Layout = route.layout;
              }
              if (route.auth) {
                ProtectedRoute = route.auth;
              }


              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                   <Layout>
                    <ProtectedRoute/>
                    <Page />
                  </Layout>
                  
                  }
                />
              );

            })}
          </Routes>
      </PrimeReactProvider>
    </AuthContextProvider>
            </BrowserRouter>

  )
}