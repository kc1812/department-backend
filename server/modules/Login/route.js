const router = require('express')['Router']();
const loginController=require('./controller');

router.post('/',loginController.loginUser);

module.exports = router;