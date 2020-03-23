const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

function validateAction(req, res, next) {
    const body = req.body;
  
	switch (true) {
        case !body.project_id:
            return res.status(400).json({message: 'No projec id'});
		case !body.description:
            return res.status(400).json({ message: 'No action description' });
        case !body.notes:
            return res.status(400).json({message: 'No action notes'});
		default:
			return next();
}
}

function validateActionId(req, res, next) {
    if (req.params.id) {
        next()
    } else {
        res.status(400).json({message: "Invalid action id"})
    }
}


router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to retrieve actions'})
    })
})


router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to retrieve action with that id'})
    })
})


router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to add action'})
    })
})


router.put('/:id', validateAction, validateActionId, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to update action'})
    })
})


router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to delete action'})
    })
})

module.exports = router;