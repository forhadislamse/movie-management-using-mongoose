import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
// import dotenv from "dotenv";
// dotenv.config();

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`server is listening at ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
