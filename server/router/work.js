const router = require('express').Router()
const WorkController = require('../controllers/workController')
const authentication = require('../middleware/authentication')
const {workAuthorization} = require('../middleware/authorization')


router.get('/:id',WorkController.select)
router.use(authentication)
router.get('/', WorkController.mylist)
router.post('/',WorkController.add)


router.put('/:id',workAuthorization,WorkController.edit)
router.delete('/:id',workAuthorization,WorkController.delete)

module.exports = router