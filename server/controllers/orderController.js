import Stripe from "stripe";
import Order from "../models/Order.js"
import product from "../models/product.js"
import { request, response } from "express";
import user from "../models/user.js";


// place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body
        console.log({ items });

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "invalid data" })
        }
        //calculate amount using items
        let amount = await items.reduce(async (acc, item) => {
            console.log("item :::", item);

            const Product = await product.findById({ _id: item?.product });
            return (await acc) + Product.offerPrice * item.quantity;
        }, 0)
        //add tax charge (2%)
        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        })
        res.json({ success: true, message: "order place successfully" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


//place order stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "invalid data" })
        }

        let productData = [];

        //calculate amount using items
        let amount = await items.reduce(async (acc, item) => {
            console.log("item :::", item);
            const Product = await product.findById({ _id: item?.product });
            productData.push({
                name: Product.name,
                price: Product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + Product.offerPrice * item.quantity;
        }, 0)

        //add tax charge (2%)
        amount += Math.floor(amount * 0.02)

        let order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online"
        })

        console.log("Stripe key:", process.env.STRIPE_SECRET_KEY);
        //stripe gateway initialize
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe

        const line_items = productData.map((item) => {
            console.log("item price::", Math.round(item.price * 1.02 * 100));

            const amount = Math.round(item.price * 1.02 * 100)
            console.log("refined amount:", amount);


            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: amount,
                },
                quantity: item.quantity,
            };
        });

        console.log("creating session");
        let session;
        try {
            session = await stripeInstance.checkout.sessions.create({
                line_items,
                mode: "payment",
                success_url: `${origin}/loader?next=my-order`,
                cancel_url: `${origin}/cart`,
                metadata: {
                    orderId: order._id.toString(),
                    userId,
                }
            });
        } catch (error) {
            console.log("session creating error::", error)
            throw new Error(error.message)
        }
        //create session
        console.log(session);


        res.json({ success: true, url: session.url });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//STRIPE WEBHOOKS TO VERIFY PAYMENT ACTION : /stripe
export const stripeWebHooks = async () => {
    //stripe gateway initialze
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        response.status(400).send(`webhooks error:${error.message}`)
    }

    //Handle this event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId, userId } = session.data[0].metadata;
            //mark payment as paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true })
            //clear user cart
            await user.findByIdAndUpdate(userId, { cartItems: {} })
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId } = session.data[0].metadata;
            await Order.findByIdAndDeleted(orderId);
            break;
        }

        default:
            console.error(`unhandle event type ${event.type}`);
            break;
    }
    response.json({ received: true })
}

//get orders by user id : /api/order/user
export const getUserOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product").sort({ createdAt: -1 });
        res.json({ success: true, order: orders })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// get all Orders (for seller / admin): /api/orders/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, order: orders })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}