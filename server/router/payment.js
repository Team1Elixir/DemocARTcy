const router = require('express').Router();
const PaymentController = require('../controllers/paymentController.js');
const authentication = require("../middleware/authentication.js");

router.use(authentication);
router.post('/', PaymentController.payArtist);

module.exports = router;
