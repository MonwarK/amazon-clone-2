const stripe = require("stripe")("sk_test_51ItwrSDwKvK3YNUPo1lgmlmkLTwLvPdIVuFgL7SAcjwQ4k0Le4aZlDmOrsFNxpyflICN8HAhZN6g0mpo15DGP5na00f6yKDTdJ")

export default async (req, res) => {

    const {items, email} = req.body;

    const transformedItems = items.map((item) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: "gbp",
            unit_amount: item.price * 100,
            product_data : {
                name: item.title,
                images: [item.image]
            },
        }
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1Ity8ZDwKvK3YNUPWbGT6Twz"],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA'],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/basket",
        metadata: {
            email, 
            images: JSON.stringify(items.map(item => item.image)),
        }
    })

    res.status(200).json({id: session.id})
}