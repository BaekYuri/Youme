/**
 * @swagger
 *  components:
 *    schemas:
 *      RoutineActiveDay:
 *        description: 루틴 활성화 요일+시간
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          day_of_week:
 *            type: integer
 *            description: 월 0 / 화 1 / 수 2 / 목 3 / 금 4 / 토 5 / 일 6
 *          start_time:
 *            type: time
 *          active:
 *            type: boolean
 *          RoutineId:
 *            type: integer
 */
module.exports = (sequelize, DataTypes) => {
  const RoutineActiveDay = sequelize.define('RoutineActiveDay', {
    day_of_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  })

  RoutineActiveDay.associate = (db) => {
    db.RoutineActiveDay.belongsTo(db.Routine)
  }

  return RoutineActiveDay
}