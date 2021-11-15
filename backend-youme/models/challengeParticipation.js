/**
 * @swagger
 *  components:
 *    schemas:
 *      ChallengeParticipation:
 *        description: 챌린지 참여 정보 User+Challenge
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          start_date:
 *            type: date
 *          end_date:
 *            type: date
 *          period:
 *            type: integer
 *          certification_count:
 *            type: integer
 *            description: 지금까지 인증한 일 수
 *          UserId:
 *            type: integer
 *          ChallengeId:
 *            type: integer
 */
module.exports = (sequelize, DataTypes) => {
  const ChallengeParticipation = sequelize.define('ChallengeParticipation', {
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    certification_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_number_of_certification: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  })

  ChallengeParticipation.associate = (db) => {
    db.ChallengeParticipation.hasMany(db.DailyCertifyChallenge)
    db.ChallengeParticipation.belongsTo(db.Challenge)
    db.ChallengeParticipation.belongsTo(db.User)
  }

  return ChallengeParticipation
}