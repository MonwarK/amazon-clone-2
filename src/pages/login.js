import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { auth, signInWithGoogle } from "../Firebase";
import { selectUser, signIn, signOut, userSlice } from "../slices/userSlice";

export default function Home() {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const router = useRouter()

  if(user.user){
    router.replace("/")
  }

  useEffect(() => {
    auth.onAuthStateChanged(
      auth => {
        if(auth){
          dispatch(
            signIn({
              uid: auth.uid,
              email: auth.email,
              displayName: auth.displayName
            })
          )
        } 
        else{
          dispatch(
            signOut()
          )
        }
      }
    )
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const EmailAuth = () => {
    auth.signInWithEmailAndPassword(
      email,
      password
    )
    .then(res => alert("Successfully logged in"))
    .catch(err => alert(err))
  }


  return (
    <div className="bg-gray-100 dark:bg-gray-800 h-screen">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
        
      <Header />
      {
        user.user?
        null
        :
        <main className="max-w-screen-2xl h-[80vh] mx-auto grid place-items-center">

          <motion.div 
            className="bg-white shadow-2xl p-6 w-96"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { scale: 0 },
              visible: { scale: 1 },
            }}
          >
            <h3 className="font-semibold text-2xl mb-6">Sign-In</h3>

            <p className="font-semibold my-2" >Email</p>
            <input className="textbox" type="email" onChange={e => setEmail(e.target.value)}/>

            <p className="font-semibold my-2">Password</p>
            <input className="textbox" type="password" onChange={e => setPassword(e.target.value)}/>

            <button className="button mt-5 w-full" onClick={EmailAuth}>Sign in</button>
            <p className="link mt-4 text-center text-blue-400" onClick={() => router.push("/register")}>Create an account</p>

            <div className="text-center my-1">or</div>
            <button className="button mt-2 w-full" onClick={signInWithGoogle}>Sign in with Google</button>
          </motion.div>

        </main>
      }

      <Footer />
    </div>
   
  )
}