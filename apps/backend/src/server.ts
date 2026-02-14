import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log(`Backend running on :${env.PORT}`);
  });
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
