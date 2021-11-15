module.exports = (sequelize, DataTypes) => {
    const TurtlebotPoint = sequelize.define('TurtlebotPoint', {
      initPosePositionX: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      initPosePositionY: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      initPosePositionZ: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      initPoseOrientationW: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      BedPositionX: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      BedPositionY: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      BedPositionZ: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      BedOrientationW: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      CoffeePositionX: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      CoffeePositionY: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      CoffeePositionZ: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      CoffeeOrientationW: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      MirrorPositionX: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      MirrorPositionY: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      MirrorPositionZ: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      MirrorOrientationW: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      WorkspacePositionX: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WorkspacePositionY: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WorkspacePositionZ: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      WorkspaceOrientationW: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  
    TurtlebotPoint.associate = (db) => {
      db.TurtlebotPoint.belongsTo(db.UsersYoume)
    }
  
    return TurtlebotPoint
  }