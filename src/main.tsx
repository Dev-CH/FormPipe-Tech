import ReactDOM from 'react-dom/client'

import '@mantine/core/styles.css'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { Router } from '@components'
import { UserManagerProvider } from '@context/UserManager'
import { ApiClientProvider } from '@context/ApiClient'
import { routeConfig } from './routes'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider theme={theme}>
    <ApiClientProvider>
      <UserManagerProvider>
        <Router config={routeConfig} />
      </UserManagerProvider>
    </ApiClientProvider>
  </MantineProvider>
)
