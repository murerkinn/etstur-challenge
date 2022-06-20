import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/styles/index.scss'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import store from '@/app/store'
import Footer from '@/components/footer'
import Header from '@/components/header'
import LoginModal from '@/modules/auth/components/login-modal'
import RegisterModal from '@/modules/auth/components/register-modal'
import SearchBar from '@/modules/search/components/search-bar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <SearchBar />
      <Component {...pageProps} />
      <Footer />

      <LoginModal />
      <RegisterModal />
    </Provider>
  )
}
export default MyApp
