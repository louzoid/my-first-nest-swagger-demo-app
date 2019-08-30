import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerInit(app) {
    
    const options = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    //stuck again. All working locally but deploying to serverless via the optimize
    //plugin causes the templates to be in an unexpected place. Bah!
}