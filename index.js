var fs = require('fs');
var util = require("util")
var db = require('./models')

// db.material.belongsTo(db.user, {as: 'user_id'})
// db.user.belongsTo(db.material)
// var material = new db.material();
// var user = new db.user();
// db.material.belongsTo(db.user)
// console.log(db.material);
db.material.destroy({ where: {
  name: 'JavaScript'
}}).then(() => {
  db.user.destroy({ where: {
    firstname: 'John'
  }})
}).then(() => {
  db.user.create({
    account: 'admin',
    password: '12345678',
    firstname: 'John',
    lastname: 'Hancock'
  }).then((john) => {
    db.material.belongsTo(db.user)
    db.material.create({
      name: 'JavaScript',
      userId: john.id
    })
  })
})





// console.log(john);

console.log('end');

// User.sync({force: true}).then(function () {
//   // Table created
//   return
// });

// db.user.hasOne(db.material, { foreignKey: 'tool_id' })
// const user = db.user.findAll({
//   where: {
//     account: 'boss'
//   }
// }).then(user => {
//   var userJSON = util.inspect(user.shift(),{depth:null})
//   // console.log(userJSON);
//   db.material.findById(1).then(material => {
//     var materialJSON = util.inspect(material,{depth:null})
//     console.log(materialJSON);
//   });
// })
