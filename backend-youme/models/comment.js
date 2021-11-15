/**
 * @swagger
 *  components:
 *    schemas:
 *      Comment:
 *        type: object
 *        properties:
 *          content:
 *            type: text
 *          UserId:
 *            type: integer
 *          ChallengeId:
 *            type: integer
 */
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  })

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User)
    db.Comment.belongsTo(db.Challenge)
  }

  return Comment
}