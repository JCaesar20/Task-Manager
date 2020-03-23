require('../db/mongoose');
const User = require('../models/user')


/* User.findByIdAndUpdate('5e302fa6f756e92db05672f8',{age:1}).then((user) =>{
    console.log(user);
    return User.countDocuments({age : 1})
}).then((count) =>{
    console.log(count)
}).catch((e) =>{
    console.log(e)
}) */

const findandupdateage = async (ID,ages) =>{
    const find = await User.findByIdAndUpdate(ID,{age:ages});
    const count = await User.countDocuments({age : ages});
    return count
}

findandupdateage('5e3030aa7d03938f6c9d186d',21).then((a) =>{
    console.log(a)
    
}).catch((e) =>{
    console.log(e)
})