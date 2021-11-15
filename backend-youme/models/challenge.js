/**
 * @swagger
 *  components:
 *    schemas:
 *      Challenge:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *          img_addr:
 *            type: string
 *          content:
 *            type: text
 *          start_date:
 *            type: date
 *          end_date:
 *            type: date
 *          period:
 *            type: integer
 *          certification_cycle:
 *            type: integer
 *            description: 매일 0 / 평일만 1 / 주말만 2 / 주6일 4 / 주5일 5 / 주4일 6 / 주3일 7 / 주2일 8 / 주1일 9 
 *          total_number_of_certification:
 *            type: integer
 *            description: 챌린지 100% 달성을 위해 필요한 총 인증 횟수
 *          UserId:
 *            type: integer
 *            description: 챌린지를 생성한 유저 아이디
 *          CategoryId:
 *            type: integer
 */
module.exports = (sequelize, DataTypes) => {
  const Challenge = sequelize.define('Challenge', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    img_addr: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    certification_cycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_number_of_certification: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category:{
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  Challenge.associate = (db) => {
    db.Challenge.belongsTo(db.User)
    db.Challenge.hasMany(db.Comment)
    db.Challenge.hasMany(db.ChallengeParticipation)
    db.Challenge.hasMany(db.ChallengeCertificationTime)
    db.Challenge.hasMany(db.ChallengeCertificationDay)
    db.Challenge.belongsToMany(db.User, {
      through: 'Like',
      as: 'Likers'  // 챌린지에 좋아요를 누른 사람들
    })
  }

  return Challenge
}