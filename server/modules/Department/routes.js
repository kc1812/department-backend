const router = require('express')['Router']();
const departmentContoller = require('./controller');
const auth = require('../../middlewares/auth');

router.get('/', departmentContoller.getAllDepartmentDetails);
router.get('/:id', departmentContoller.getDepartmentDetails);
router.post('/', departmentContoller.createDepartment);
router.patch('/:id', departmentContoller.updateDepartment);
router.delete('/:id', departmentContoller.removeDepartment);

module.exports = router;