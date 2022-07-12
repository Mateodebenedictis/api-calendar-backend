/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { createEvent, updateEvent, getEvents, getEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');


const router = Router();

router.use( validateJWT );

//Obtain events
router.get('/', getEvents);

//Obtain event
router.get('/:id', getEvent);

//Create event
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        fieldValidator
    ],
    createEvent
);

//Update event
router.put(
    '/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').not().isEmpty(),
        check('end', 'La fecha de fin es obligatoria').not().isEmpty(),
        fieldValidator
    ],
    updateEvent
);

//delete event
router.delete(
    '/:id', 
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        fieldValidator
    ],
    deleteEvent
);


module.exports = router;