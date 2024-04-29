import { memo } from 'react'
import { Layout } from 'widgets/Layout'
import { AppRouter } from './providers/router'

function App() {
    return (
        <div className="app">
            <Layout>
                <AppRouter />
            </Layout>
        </div>
    )
}

export default memo(App)
