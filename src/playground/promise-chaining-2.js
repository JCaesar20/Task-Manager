require('../db/mongoose');
const task = require('../models/task');

/* task.findByIdAndDelete('5e302b2fe9bfef95e800d62e').then((tasks) =>{
    console.log(tasks);
  return  task.countDocuments({completed: false})
}).then((count)=>{
    console.log(count)
}).catch((e) =>{
    console.log(e)
})
 */

const DeleteandCount = async (id) =>{
    const deletetask = await task.findByIdAndDelete(id);
    const countuncompleteddocs = await task.countDocuments({completed: false})
    return countuncompleteddocs;
}

DeleteandCount('5e302b2fe9bfef95e800d62e').then((count)=>{
    console.log(count)
}).catch((e) =>{
    console.log(e)
})