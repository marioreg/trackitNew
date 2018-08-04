module.exports = function(sequelize, DataTypes) {
  var ShowTracks = sequelize.define("ShowTracks", {
    id: {
      type: DataTypes.INTEGER, 
      autoIncrement: true,
      primaryKey: true, 
      allowNull: true,
    },
    track: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    carrier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
{
  freezeTableName: true
});

ShowTracks.associate = function(models) {
  
  ShowTracks.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    }
  });
};


  return ShowTracks;
};

