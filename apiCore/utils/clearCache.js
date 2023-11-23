const redis = require('redis');
const redisClient = redis.createClient();

module.exports = function clearCache(){
    redisClient.flushall((err) => {
        if(err){
            throw err;
        }
        console.log('Cleared cache successfully');
    })
};