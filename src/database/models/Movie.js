const { sequelize, DataTypes } = require('sequelize');
const Genre = require('./Genre')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL,
        },
        release_date: {
            type: DataTypes.DATEONLY,
             get() {
                return moment(this.getDataValue('release_date')).add(3, 'hours').format('YYYY-MM-DD');
            },//para que se vea la fecha solamente
            allowNull: false 
        },
        awards: {
            type: DataTypes.INTEGER
        },
        length: {
            type: DataTypes.INTEGER
        },
        genre_id: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: "movies", //nombre de la tabla (es opcional si tienen los mismos nombres)
        timestamps: false  //si la tabla no tiene columnas de registro de creacion y actualizacion de registros, debe escribirse
    });
    Movie.associate = (models => {
        Movie.belongsTo(models.Genre);
        Movie.belongsToMany(models.Actor, {
            as: "actor",
            through: 'actor_movie'  
             
        });
    }); 
    return Movie;  
}