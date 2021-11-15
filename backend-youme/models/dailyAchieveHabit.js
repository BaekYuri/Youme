/**
 * @swagger
 *  components:
 *    schemas:
 *      DailyAchieveHabit:
 *        description: 루틴 내 습관 항목 달성 체크
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          authorized:
 *            type: boolean
 *          achieve_datetime:
 *            type: datetime
 *          RoutinizedHabitId:
 *            type: integer
 */
module.exports = (sequelize, DataTypes) => {
  const DailyAchieveHabit = sequelize.define('DailyAchieveHabit', {
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

  DailyAchieveHabit.associate = (db) => {
    db.DailyAchieveHabit.belongsTo(db.RoutinizedHabit)
  }

  return DailyAchieveHabit
}