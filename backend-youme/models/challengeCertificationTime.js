/**
 * @swagger
 *  components:
 *    schemas:
 *      ChallengeCertificationTime:
 *        description: 챌린지 인증 가능 요일
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          certification_available_start_time:
 *            type: time
 *            description: 24시간일 경우 00:00
 *          certification_available_end_time:
 *            type: time
 *            description: 24시간일 경우 24:00
 *          ChallengeId:
 *            type: integer
 */
module.exports = (sequelize, DataTypes) => {
  const ChallengeCertificationTime = sequelize.define('ChallengeCertificationTime', {
    certification_available_start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    certification_available_end_time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  })

  ChallengeCertificationTime.associate = (db) => {
    db.ChallengeCertificationTime.belongsTo(db.Challenge)
  }

  return ChallengeCertificationTime
}