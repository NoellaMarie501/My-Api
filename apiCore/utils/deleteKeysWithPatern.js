const redis = require('redis');
const redisClient = redis.createClient();

// Function to delete keys with a specified prefix
module.exports = function deleteKeysWithPrefix(prefix) {
    let cursor = '0';
  
    // Start scanning
    const scanKeys = () => {
        redisClient.scan(cursor, 'MATCH', prefix + '*', 'COUNT', 100, (err, result) => {
        if (err) throw err;
  
        const [newCursor, keys] = result;
  
        // Delete keys
        for (const key of keys) {
            redisClient.del(key);
        }
  
        // If the new cursor is '0', we've finished scanning
        if (newCursor === '0') {
          console.log('Deletion complete.');
        } else {
          // Continue scanning
          cursor = newCursor;
          scanKeys();
        }
      });
    };
  
    // Start the initial scan
    scanKeys();
  }