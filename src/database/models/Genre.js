const { sequelize, DataTypes } = require('sequelize');
const Movie = require('./Movie')

module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ranking: {
            type: DataTypes.INTEGER
        },
        active: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: "genres", //nombre de la tabla (es opcional si tienen los mismos nombres)
        timestamps: false  //si la tabla no tiene columnas de registro de creacion y actualizacion de registros, debe escribirse
    });
    Genre.associate = models => {
        Genre.hasMany(models.Movie)
    };
    
    return Genre;  
}