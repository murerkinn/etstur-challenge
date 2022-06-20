import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/styles/index.scss'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import store from '@/app/store'
import Footer from '@/components/footer'
import Header from '@/components/header'
import SearchBar from '@/modules/search/components/search-bar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <SearchBar />
      <main className="container">
        <Component {...pageProps} />
      </main>
      <Footer />
    </Provider>
  )
}
export default MyApp
