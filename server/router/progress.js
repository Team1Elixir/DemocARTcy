const router = require('express').Router();
const ProgressController = require('../controllers/progressController.js');
const authentication = require('../middleware/authentication.js');
const { progressAuthorization } = require('../middleware/authorization');

router.use(authentication);
router.post('/:id', ProgressController.createProject);
router.get('/', ProgressController.showAllProgress);
router.patch('/:id', progressAuthorization, ProgressController.editStatus);
router.delete('/:id', progressAuthorization, ProgressController.deleteProject);

module.exports = router;