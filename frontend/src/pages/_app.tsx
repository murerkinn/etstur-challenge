import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'react-spring-bottom-sheet/dist/style.css'
import '@/styles/index.scss'

import type { AppProps } from 'next/app'
import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'

import store, { useAppDispatch } from '@/app/store'
import Footer from '@/components/footer'
import Header from '@/components/header'
import LoginModal from '@/modules/auth/components/login-modal'
import RegisterModal from '@/modules/auth/components/register-modal'
import SearchBar from '@/modules/search/components/search-bar'
import SearchService from '@/modules/search/store/search-service'
import { setCategories } from '@/modules/search/store/search-slice'

const AppWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    SearchService.getCategories()
      .then(data => dispatch(setCategories(data)))
      .catch(console.error)
  }, [])

  return <>{children}</>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Header />
        <SearchBar />
        <Component {...pageProps} />
        <Footer />

        <LoginModal />
        <RegisterModal />
      </AppWrapper>
    </Provider>
  )
}
export default MyApp
