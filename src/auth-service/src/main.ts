import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../auth.proto'),
        package: 'auth',
        url: '0.0.0.0:5001',
      },
    },  
  );
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
  await app.listen();
}
bootstrap();
