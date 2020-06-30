const stripe = require('stripe')(process.env.STRIPE_KEY);
const { Progress } = require('../models');

class PaymentController {
    static payArtist(req, res, next) {
        const { token, amount, id } = req.body;
        const currency = 'idr';

        const paymentBody = {
            source: token.id,
            amount: amount * 100,
            currency
        }

        stripe.charges.create(paymentBody, (stripeErr, stripeRes) => {
            if(stripeErr) {
                next(stripeErr);
            } else {
                Progress.destroy({
                    where: {
                        id
                    }
                })
                res.status(200).json({
                    success: `Successfully made a payment transaction with amount of ${stripeRes.amount/100}`
                })
            }
        })
    }
}

module.exports = PaymentController;
