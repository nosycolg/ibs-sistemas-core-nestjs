import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const allowedOrigins = [process.env.FRONTEND_ORIGIN];

    const cors = {
        allowedOrigins: allowedOrigins,
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS', // Corrigido aqui
    };

    app.enableCors(cors);

    await app.listen(3000);
}
bootstrap();
