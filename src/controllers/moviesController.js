const fs = require('fs');
const path = require('path');
const moment = require ('moment');
const { Movie, Genre, Actor} = require('../database/models');
const {Op} = require("sequelize");

module.exports = {
    list: async (req, res) => {
        try {
            let allMovies = await Movie.findAll();
            res.render('./movies/movies', {allMovies});
        } catch (error) {
            console.log(error);
        }
    },
    //logica detalle de pelicula
    detail: async (req, res) => {
        try {
            let detail = await Movie.findByPk(req.params.id, {include: { all:true}})
            detail = detail.dataValues;
            detail.release_date = moment(detail.release_date).format('DD-MM-YYYY')
            res.render('./movies/movieDetail', {detail})
        } catch (error) {
            console.log(error);
        }       
    },
    new: async (req, res) => {
        try {
            let premiere = await Movie.findAll({
                order: [
                    ['release_date', 'DESC']
                ],
                limit: 5,
            });
                 res.render('./movies/moviesNew', {premiere}) 
        } catch (error) {
            console.log(error);
        }
    },
    recommended: async (req, res) => {
        try {
            let popular = await Movie.findAll({
                where: {
                    rating: {[Op.gt]:8}
               },
               order: [
                ['rating', 'DESC']
            ]
            })
            res.render('./movies/moviesRecommended', {popular})
        } catch (error) {
            console.log(error); 
        }
    },
    result: async (req, res) => {
        let contenido = 0;
        if (req.body.search) {
            contenido = 0;
        } else {
            contenido = 1;
        }
        try {
            const resultSearch = await Movie.findAll( {
                where: {
                    title: {[Op.like]: req.body.search + "%" }
                },
                order : [
                    ['title', 'ASC']
                ]
            });
            console.log(contenido + "lo que llega en el body")
            console.log(algo)
            console.log(test + ' muestra de lo que hay dentro del value de resultSearch')
            res.render('./movies/moviesSearch', {resultSearch, contenido});
         } catch (error) {
             console.log(error);
         }
    },
    create: async (req, res) => {
        try {
            const allGenres = await Genre.findAll();
            const allActors = await Actor.findAll();
            res.render('./movies/createMovie', {allGenres, allActors});
        } catch (error) {
            console.log(error);
        }
    },
    storageNew: async (req, res) => {
        try {
            const NewMovie = await Movie.create(req.body) 
                await NewMovie.addActor(req.body.actor);
            res.redirect('/movies/list')
        } catch (error) {
           console.log(error); 
        }
        console.log(req.body)
    },
    edit: async (req, res) => {
        try {
            let idMovie = req.params.id;
            const editMovie = await Movie.findByPk (idMovie, {include:{ all:true}});
            console.log(editMovie);
            const allGenres = await Genre.findAll();
            const allActors = await Actor.findAll();
            res.render('./movies/editMovie', {editMovie, allGenres, allActors})
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            let idMovie = req.params.id;
            const updateMovie = await Movie.findByPk(idMovie, { include:{ all:true}});
            await updateMovie.removeActor(idMovie.actor);
            await updateMovie.addActor(req.body.actor);
            await updateMovie.update(req.body);
            res.redirect('/movies/list')
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            let idMovie = req.params.id;
            const deleteMovie = await Movie.findByPk(idMovie, {include:['Genre', 'actor']});
            await deleteMovie.removeActor(deleteMovie.actor);
            await deleteMovie.destroy();
            res.redirect('/movies/list');
        } catch (error) {
            console.log(error);
        }
    }
}
