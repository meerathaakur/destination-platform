
// Set a value in Redis
redisClient.set("myKey", "Hello, Redis!", "EX", 3600); // Expires in 1 hour

// Get a value from Redis
redisClient.get("myKey", (err, value) => {
    if (err) console.error("Redis GET Error:", err);
    else console.log("Stored Value:", value);
});
