import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { selectItems } from '../slices/basketSlice'
import { selectUser } from '../slices/userSlice'
import Currency from "react-currency-formatter"

function basket() {

    const user = useSelector(selectUser)
    const basket = useSelector(selectItems)

    const totalPrice = basket.map(({price}) => 
        price
    )
    .reduce((a,b) => a + b, 0)

    return (
        <div className="bg-gray-100 h-screen">
            <Header />

            <div className="grid grid-flow-row-dense lg:grid-cols-3">
                <div className="bg-white shadow-2xl p-8 lg:col-span-2 m-4">
                    <h1 className="text-2xl mb-5">Shopping Basket</h1>
                    <hr />
                    {
                        basket.map(({title, price, image}) => 
                            <div className="py-4 flex">
                                <img className="h-36 w-24 object-contain" src={image} />
                                <div className="flex-1 px-6">
                                    <p className="line-clamp-1 text-blue-500 font-semibold link">{title}</p>
                                    <p>3 Stars</p>
                                    <Currency quantity={price} currency="GBP" />
                                </div>
                                {/* <div>
                                    Qty: 1
                                </div> */}
                            </div>
                        )
                    }
                </div>
                <div className="h-36 bg-white shadow-2xl p-8 md:col-span-1 m-4">
                    <p className="mb-4 text-center font-semibold text-lg">Total price: <Currency quantity={totalPrice} currency="GBP" /></p>
                    <button className="button w-full" disabled={user.user?false:true}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default basket
