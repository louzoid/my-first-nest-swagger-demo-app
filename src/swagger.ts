import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerInit(app) {
    
    const options = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    
}