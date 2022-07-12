const { response } = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        events
    });

}


const getEvent = async(req, res = response) => {

    const id = req.params.id;

    const event = await Event.findById(id)
        .populate('user', 'name');

    res.json({
        ok: true,
        event
    });

}


const createEvent = async (req, res = response) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const eventSaved = await event.save();

        res.json({
            ok: true,
            evento: eventSaved
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error creating event',
            err
        });
    }
}



const updateEvent = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(id);

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found with that id'
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized to update Event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, { new: true });

        res.json({
            ok: true,
            event: eventUpdated
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Get in contact with the administrator',
            error
        });
    }
}


const deleteEvent = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(id);

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found with that id'
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized to delete Event'
            });
        }

        await Event.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Event deleted'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Get in contact with the administrator',
            error
        });
    }
};

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}