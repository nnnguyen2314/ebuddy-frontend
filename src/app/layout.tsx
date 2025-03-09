'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistedStore } from '@/shared/store';
import theme from '@/shared/theme';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import Header from '@/shared/components/Layout/Header';
import './globals.css';
import SnackbarNotification from '@/shared/components/Layout/SnackbarNotification';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SnackbarNotification />
              <Header />
              <Container maxWidth="md">
                <Box sx={{ marginTop: 4 }}>{children}</Box>
              </Container>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
