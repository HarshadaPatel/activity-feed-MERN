import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; dotenv.config(); 
(async () => {
  await mongoose.connect(process.env.MONGO_URI, { maxPoolSize: 50 });
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening');
  });
})();
