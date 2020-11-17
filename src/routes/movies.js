const express = require('express');
const router = express.Router();

const moviesController = require ('../controllers/moviesController')

/*listado de peliculas */
router.get('/list', moviesController.list);

/*detalle de peliculas */
router.get('/detail/:id', moviesController.detail);

/*las últimas 5 películas ordenadas según su fecha de estreno */
router.get('/new', moviesController.new);

/* muestra las películas cuyo rating es mayor o igual a 8*/
router.get('/recommended', moviesController.recommended);

/*busqueda de peliculas */
router.post('/search', moviesController.result);

/*creacion de pelicula */
router.get('/create', moviesController.create);
router.post('/create', moviesController.storageNew)

/*edicion de una pelicula */
router.get('/edit/:id', moviesController.edit)
router.put('/edit/:id', moviesController.update)

/*eliminar una pelicula */
router.delete('/delete/:id', moviesController.delete)

module.exports = router;