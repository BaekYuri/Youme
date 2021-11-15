/**
 * @swagger
 *  components:
 *    schemas:
 *      ChallengeCertificationDay:
 *        description: 챌린지 인증 가능 요일
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          active_day_of_week:
 *            type: integer
 *            description: 월 0 / 화 1 / 수 2 / 목 3 / 금 4 / 토 5 / 일 6
 *          certification_available:
 *            type: boolean
 *            description: 해당 요일에 인증을 할 수 있는지 없는지 표시
 *          ChallengeId:
 *            type: integer
 */
module.exports = (sequelize, DataTypes) => {
  const ChallengeCertificationDay = sequelize.define('ChallengeCertificationDay', {
    active_day_of_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    certification_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  })

  ChallengeCertificationDay.associate = (db) => {
    db.ChallengeCertificationDay.belongsTo(db.Challenge)
  }

  return ChallengeCertificationDay
}