const { Progress, User } = require('../models');

class ProgressController {
    static createProject (req, res, next){
        const { title, price } = req.body;
        const ArtistId = req.params.id;
        const ClientId = req.LoginId;

        Progress
            .create({
                title,
                price,
                ArtistId,
                ClientId
            })
            .then(progress => {
                res.status(201).json({
                    progress
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static showAllProgress (req, res, next){
        const ClientId = req.LoginId;

        Progress
            .findAll({
                include: [{
                    model: User,
                    as: 'client'
                }, {
                    model: User,
                    as: 'artist'
                }],
                where: {
                    ClientId
                }
            })
            .then(projects => {
                res.status(200).json({
                    projects
                })
            })
            .catch(err =>{
                next(err);
            })
    }

    static showAllActiveProjects (req, res, next){
        const ArtistId = req.LoginId;

        Progress
            .findAll({
                include: [{
                    model: User,
                    as: 'artist'
                }, {
                    model: User,
                    as: 'client'
                }],
                where: {
                    ArtistId
                }
            })
            .then(projects => {
                res.status(200).json({
                    projects
                })
            })
            .catch(err =>{
                next(err);
            })
    }

    static editStatus (req, res, next){
        const { id } = req.params;
        const { status } = req.body;

        Progress
            .update({
                status
            },{
                where: { id },
                returning: true
            })
            .then(data => {
                res.status(200).json({
                    progress: data[1][0]
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static deleteProject (req, res, next){
        const { id } = req.params;

        Progress
            .destroy({
                where: { id }
            })
            .then(() => {
                res.status(200).json({
                    message: `Success delete project with id ${id}`
                })
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = ProgressController;
