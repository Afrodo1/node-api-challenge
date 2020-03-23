const express = require('express');

const Projects = require('../data/helpers/projectModel');


const router = express.Router();

router.use(express.json());

function validateProjectId(req, res, next) {
    console.log(req.params.id);
    const {id} = req.params.id;
    Projects.get(id).then(proj =>{
        if(!proj){
            return res.status(400).json({message:'no project found'});
        }else{
            next();
        }
    });
}

function validateProject(req, res, next) {
    const body = req.body;
  
	switch (true) {
        case !body.name:
            return res.status(400).json({message: 'No project name'});
		case !body.description:
			return res.status(400).json({ message: 'No project description' });
		default:
			return next();
}
}


router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Unable to retrieve projects'})
    })
})


router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to retrieve project'})
    })
})


router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to retrieve actions'})
    })
})


router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to create project'})
    })
})


router.put('/:id', validateProject, validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to update project'})
    })
})


router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to delete project'})
    })
})

module.exports = router, validateProject, validateProjectId;