import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from "./app.module";
import {UsersModule} from "./users/users.module";

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
