import { StarIcon } from '@heroicons/react/solid'
import React from 'react'
import Currency from "react-currency-formatter"
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, selectItems } from '../slices/basketSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QuickView({id, title, price, close, rating, description, category, image}) {

    const dispatch = useDispatch()
    const basket = useSelector(selectItems)

    return (
        <div className="absolute z-50">
            {/* Fade Background */}
            <div className="bg-black opacity-50 w-full h-full fixed top-0 left-0 z-[90000]" />

            <div className="grid items-center fixed top-0 left-0 h-screen w-full z-[100000]">
                <div className="bg-white rounded-lg mx-auto grid grid-flow-row-dense md:grid-cols-2 w-5/6 p-8 md:p-0 max-w-4xl">

                    {/* Image */}
                    <div className="p-14 flex items-center" >
                        <img src={image} />
                    </div>

                    {/* Description */}
                    <div className="py-8 pr-5 flex flex-col">
                        <h1 className="text-2xl text-yellow-500">{title}</h1>
                        <p className="text-gray-400 my-2 link">{category}</p>
                        <div className="text-yellow-300 flex items-center mb-2">
                            <p className="font-semibold text-md text-black">Rating: </p>
                            {
                                Array(rating)
                                .fill()
                                .map((_, i) => 
                                    <StarIcon className="h-5" />
                                )
                            } 
                        </div>
                        <p className="flex-1">{description}</p>
                        <p className="text-2xl">
                            <Currency currency="GBP" quantity={price} />
                        </p>
                        <button 
                            className="button mt-5 w-full"
                            onClick={() => {
                                dispatch(addToBasket({
                                    id: id,
                                    title : title, 
                                    price : price, 
                                    description : description, 
                                    category : category, 
                                    image : image
                                }))

                                toast("Add to basket")
                            }}
                        >Add to Basket</button>
                        <button className="button mt-3 w-full" onClick={close}>Close</button>
                    </div>
                </div>
                
            <ToastContainer />
            </div>
        </div>
        
    )
}

export default QuickView
