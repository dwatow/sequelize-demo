module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Code', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_type: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'co_ca_id'
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'code',
    classMethods: {
      findByType: function (type, attributes = ['id', 'name']) {
        return this.findAll({
          where: {
            co_ca_id: type
          },
          attributes
        })
      },
      associate: function (models) {
        Code.belongsTo(models.CodeCategory, {
          foreignKey: 'co_ca_id'
        })
        Code.belongsToMany(models.Code, {
          through: {
            model: models.CategoryTeamCategory
          },
          as: 'RevenueStatTeamCategory',
          foreignKey: 'categoryID',
          otherKey: 'teamCategoryID'
        })
        // For 鄉鎮市區 geolocation
        Code.hasOne(models.Code, {
          foreignKey: 'parent_id',
          as: 'childCategory'
        })
        Code.belongsTo(models.Code, {
          foreignKey: 'parent_id',
          as: 'parentCategory'
        })
        Code.hasOne(models.CodeGeoLocation, {
          foreignKey: 'location_category_id',
          as: 'coordinates'
        })
        Code.hasOne(models.CodeRewardPunishmentContent, {
          foreignKey: 'category_id',
          as: 'reward_punishment_content_result'
        })
      }
    }
  })
}
