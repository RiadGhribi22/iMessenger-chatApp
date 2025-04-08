const mongoose = require('mongoose');

const databaseConnect = () => {
     mongoose.connect(process.env.DATABASE_URL).then(()=>{
          console.log('Hello Database Connected')
     }).catch(error=>{
          console.log(error)
     })
}
module.exports = databaseConnect;