module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      // set: function(val) {
        // hmac.update(val);
        // this.setDataValue('password', hmac.digest('hex'));
      // }
    },
    createAtTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    firstname: {
      type: DataTypes.STRING,
      field: 'first_name',
      validate: {
        len: {
          args: [2, 10],
          msg: "length of firstname is not allowed"
        }
      },
      get: function() {
        return this.getDataValue('firstname').toUpperCase();
      },
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    getterMethods: {
      fullName: function() {
        return this.firstname + ' ' + this.lastname
      }
    },
    setterMethods: {
      fullName: function(value) {
        var names = value.split(' ');
        this.setDataValue('firstname', names.slice(0, -1).join(' '));
        this.setDataValue('lastname', names.slice(-1).join(' '));
      },
    }
  });
}
