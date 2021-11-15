/**
 * @swagger
 *  components:
 *    schemas:
 *      RoutinizedHabit:
 *        description: 루틴에 등록된 습관들
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          order:
 *            type: integer
 *          RoutineId:
 *            type: integer
 *          HabitId:
 *            type: integer
 */
module.exports = (sequelize, DataTypes) => {
  const RoutinizedHabit = sequelize.define('RoutinizedHabit', {
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  RoutinizedHabit.associate = (db) => {
    db.RoutinizedHabit.belongsTo(db.Routine)
    db.RoutinizedHabit.belongsTo(db.Habit)
    db.RoutinizedHabit.hasMany(db.DailyAchieveHabit)
  }

  return RoutinizedHabit
}