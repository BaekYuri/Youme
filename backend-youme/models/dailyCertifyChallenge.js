/**
 * @swagger
 *  components:
 *    schemas:
 *      DailyCertifyChallenge:
 *        description: 챌린지 인증 날짜+시간 및 인증샷+인증내용
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          img_addr:
 *            type: string
 *            description: 인증샷 S3 주소
 *          content:
 *            type: text
 *          certification_datetime:
 *            type: datetime
 *          ChallengeParticipationId:
 *            type: integer
 */
module.exports = (sequelize, DataTypes) => {
  const DailyCertifyChallenge = sequelize.define('DailyCertifyChallenge', {
    img_addr: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    certification_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  })

  DailyCertifyChallenge.associate = (db) => {
    db.DailyCertifyChallenge.belongsTo(db.ChallengeParticipation)
  }

  return DailyCertifyChallenge
}