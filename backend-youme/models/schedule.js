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
    const Schedule = sequelize.define('Schedule', { // MySQL에는 users 테이블 생성
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      allDay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  
    Schedule.associate = (db) => {
      db.Schedule.belongsTo(db.User)
    }
  
    return Schedule
  }