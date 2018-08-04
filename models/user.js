module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('User', {
		id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
		firstname: { type: DataTypes.STRING,notEmpty: true},
		lastname: { type: DataTypes.STRING,notEmpty: true},
		email: { type:DataTypes.STRING, validate: {isEmail:true} },
		password: {type: DataTypes.STRING,allowNull: false },
		last_login: {type: DataTypes.DATE},
        status: {type: DataTypes.ENUM('active','inactive'),defaultValue:'active' }

},
{
	freezeTableName: true
});



User.associate = function(models) {
	
	User.hasMany(models.ShowTracks, {
	  onDelete: "cascade"
	});
  };
	return User;

};
