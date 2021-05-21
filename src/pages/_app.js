import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store } from '../app/store'
import { auth } from '../Firebase'
import { signIn, signOut } from '../slices/userSlice'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
