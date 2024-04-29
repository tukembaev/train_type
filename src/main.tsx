import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from 'app/App'

import './app/styles/index.scss'

import { ThemeProvider } from 'app/providers/ThemeProvider'
import { Provider } from 'react-redux'
import { store } from 'app/providers/StoreProvider'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
)
