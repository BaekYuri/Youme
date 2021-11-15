/**
 * @swagger
 *  components:
 *    schemas:
 *      DailyAchieveRoutine:
 *        description: 루틴 달성 관련 DB
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          authorized:
 *            type: boolean
 *          achieve_datetime:
 *            type: datetime
 *          RoutinieId:
 *            type: integer
 */
 module.exports = (sequelize, DataTypes) => {
    const DailyAchieveRoutine = sequelize.define('DailyAchieveRoutine', {
      authorized: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      achieve_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  
    DailyAchieveRoutine.associate = (db) => {
      db.DailyAchieveRoutine.belongsTo(db.Routine)
    }
  
    return DailyAchieveRoutine
  }
