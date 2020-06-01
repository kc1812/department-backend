const router = require('express')['Router']();
const userController = require('./controller');
const auth = require('../../middlewares/auth');

router.get('/', auth.authorizeToken, userController.getAllUserDetails);
router.get('/:id', auth.authorizeToken, userController.getUserDetails);
router.post('/', userController.createUser);
router.patch('/:id', auth.authorizeToken, userController.updateUser);
router.delete('/:id', auth.authorizeToken, userController.removeUser);

module.exports = router;