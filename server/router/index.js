const router = require('express').Router()
const work = require('./work')
const commissions = require('./commission')
const user = require('./user')
const progress = require('./progress')

router.use('/users', user)
router.use('/works', work)
router.use('/commissions', commissions)
router.use('/progresses', progress)

module.exports = router
