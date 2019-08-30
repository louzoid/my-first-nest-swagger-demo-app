import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverless from 'aws-serverless-express';
import * as express from 'express';
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { swaggerInit } from './swagger';

let cachedServer: Server;

function bootstrapServer(): Promise<Server> {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    return NestFactory.create(AppModule, adapter)
        .then(app => app.enableCors())
        .then(app => {
            swaggerInit(app);
            return app;
        })
        .then(app => app.init())
        .then((app) => { return serverless.createServer(expressApp) });
}

export const handler: Handler = (event: any, context: Context) => {
    //major hack to get round slash stripping behaviour
    if (event.path === '/api') {
        event.path = '/api/';
    }
    if (!cachedServer) {
        bootstrapServer().then(server => {
            cachedServer = server;
            return serverless.proxy(server, event, context);
        });
    } else {
        return serverless.proxy(cachedServer, event, context);
    }
};