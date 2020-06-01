const router = require('express')['Router']();
const formController = require('./controller');
const auth = require('../../middlewares/auth');

router.get('/', auth.authorizeToken, formController.getAllDepartmentFormsDetails);
router.get('/requested', auth.authorizeToken, formController.getAllRequestedDetails);
router.get('/assigned', auth.authorizeToken, formController.getAllAssignedDetails);
// router.get('/pending', auth.authorizeToken, formController.getAllPendingFormsDetails);
// router.get('/rejected', auth.authorizeToken, formController.getAllRejectedFormsDetails);
router.get('/:id', auth.authorizeToken, formController.getFormDetails);
router.post('/', auth.authorizeToken, formController.createForm);
router.patch('/:id', auth.authorizeToken, formController.updateForm);
router.delete('/:id', auth.authorizeToken, formController.removeForm);

module.exports = router;