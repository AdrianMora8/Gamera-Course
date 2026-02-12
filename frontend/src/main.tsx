import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'

import { AppRoutes } from './routes/AppRoutes'
import { store } from './store'
import "./styles/global.css"
import { SocketProvider } from './context/sockets'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocketProvider>
          <AppRoutes/>
        </SocketProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
