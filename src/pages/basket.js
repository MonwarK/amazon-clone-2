import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { selectItems } from '../slices/basketSlice'
import { selectUser } from '../slices/userSlice'
import Currency from "react-currency-formatter"
import Footer from '../components/Footer'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromise = loadStripe("pk_test_51ItwrSDwKvK3YNUPaPffoXaCmEawM3UtTF0b52V22sPt9DpwxLkdEReAbdHe3k8Y2IRGljdODGgQ1p6EfhvmVj4Q00niXo3tla");

function basket() {

    const user = useSelector(selectUser)
    const basket = useSelector(selectItems)

    const totalPrice = basket.map(({price}) => 
        price
    )
    .reduce((a,b) => a + b, 0)

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        // Call the backend to create a checkout session...
        const checkoutSession = 
        await axios.post("/api/create-checkout-session", {
            items: basket,
            email: user.user.email
        })

        // Redirect to Stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        })

        if(result.error) alert(result.error.message)
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
            <Header />

            <div className="grid grid-flow-row-dense lg:grid-cols-3 flex-1">
                <div className="bg-white shadow-2xl p-8 lg:col-span-2 m-4">
                    <h1 className="text-2xl mb-5">Shopping Basket</h1>
                    <hr />
                    {
                        basket.map(({title, price, image}) => 
                            <div className="p-4 flex shadow-lg my-2 border-solid border-2 ">
                                <img className="h-36 w-24 object-contain" src={image} />
                                <div className="flex-1 px-6">
                                    <p className="line-clamp-1 text-blue-500 font-semibold link">{title}</p>
                                    <p>3 Stars</p>
                                    <Currency quantity={price} currency="GBP" />
                                </div>
                            </div>
                        )
                    }
                </div>
                    {console.log(basket)}
                <div className="h-36 bg-white shadow-2xl p-8 md:col-span-1 m-4">
                    <p className="mb-4 text-center font-semibold text-lg">Total price: <Currency quantity={totalPrice} currency="GBP" /></p>
                    <button 
                        className="button w-full" 
                        disabled={user.user?basket?true:false:true}
                        role="link"
                        onClick={createCheckoutSession}
                    >Proceed to Checkout</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default basket
