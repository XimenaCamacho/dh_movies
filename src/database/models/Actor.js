const { sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define('Actor', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "actors", //nombre de la tabla (es opcional si tienen los mismos nombres)
        timestamps: false  //si la tabla no tiene columnas de registro de creacion y actualizacion de registros, debe escribirse
    }); 
    Actor.associate = models => {
        Actor.belongsToMany(models.Movie, {
            as:"actor",
            through: 'actor_movie'
        });
    };
    
    return Actor;  
}