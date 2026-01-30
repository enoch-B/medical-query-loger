import crypto from 'crypto';

try {
    
    const jwtSecret = crypto.randomBytes(64).toString('base64');

    console.log("Your secure JWT secret key:");
    console.log(jwtSecret);
} catch (err) {
    console.error("Error generating JWT secret:", err.message);
}