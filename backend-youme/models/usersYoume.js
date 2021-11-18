/**
   * @swagger
   *  components:
   *    schemas:
   *      Schedule:
   *        type: object
   *        properties:
   *          id:
   *            type: integer
   *          title:
   *            type: string
   *          color:
   *            type: string
   *          start:
   *            type: date
   *          end:
   *            type: date
   *          allDay:
   *            type: boolean
   *          UserId:
   *            type: integer
   */
 module.exports = (sequelize, DataTypes) => {
    const UsersYoume = sequelize.define('UsersYoume', {
      connectedYoume: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      YoumeId: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      connectedSpeaker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      SpeakerId: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      familiarity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0,
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  
    UsersYoume.associate = (db) => {
      db.UsersYoume.belongsTo(db.User)
      db.UsersYoume.hasMany(db.TurtlebotPoint)
    }
  
    return UsersYoume
  }