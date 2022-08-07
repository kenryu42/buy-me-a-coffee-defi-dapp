import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { Web3ContextProvider } from '../context'
import { FormContextProvider } from '../context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <FormContextProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer position="bottom-right" autoClose={2000} />
        </Layout>
      </FormContextProvider>
    </Web3ContextProvider>
  )
}

export default MyApp
