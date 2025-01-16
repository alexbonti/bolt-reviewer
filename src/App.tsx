import React from 'react';
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    import { Layout } from './components/Layout';
    import { Reviews } from './pages/Reviews';
    import { Upload } from './pages/Upload';
    import { PaperDetail } from './components/PaperDetail';
    import { Login } from './pages/Login';
    import { AuthProvider } from './contexts/AuthContext';
    import { ProtectedRoute } from './components/ProtectedRoute';

    function App() {
      return (
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/reviews" replace />} />
                <Route
                  path="reviews"
                  element={
                    <ProtectedRoute>
                      <Reviews />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="upload"
                  element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="paper/:id"
                  element={
                    <ProtectedRoute>
                      <PaperDetail />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      );
    }

    export default App;
