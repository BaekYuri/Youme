const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.User = require('./user')(sequelize, Sequelize)
db.Habit = require('./habit')(sequelize, Sequelize)
db.Routine = require('./routine')(sequelize, Sequelize)
db.RoutineActiveDay = require('./routineActiveDay')(sequelize, Sequelize)
db.RoutinizedHabit = require('./routinizedHabit')(sequelize, Sequelize)
db.Challenge = require('./challenge')(sequelize, Sequelize)
db.DailyCertifyChallenge = require('./dailyCertifyChallenge')(sequelize, Sequelize)
db.DailyAchieveHabit = require('./dailyAchieveHabit')(sequelize, Sequelize)
db.DailyAchieveRoutine = require('./dailyAchieveRoutine')(sequelize, Sequelize)
db.Comment = require('./comment')(sequelize, Sequelize)
db.ChallengeParticipation = require('./challengeParticipation')(sequelize, Sequelize)
db.ChallengeCertificationDay = require('./challengeCertificationDay')(sequelize, Sequelize)
db.ChallengeCertificationTime = require('./challengeCertificationTime')(sequelize, Sequelize)
db.Schedule = require('./schedule')(sequelize,Sequelize)
db.UsersYoume = require('./usersYoume')(sequelize,Sequelize)
db.TurtlebotPoint = require('./turtlebotPoint')(sequelize,Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
