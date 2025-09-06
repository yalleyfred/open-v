import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, node_env } from './config';
import { Routes } from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { generalLimiter } from './middlewares/rateLimiter.middleware';
import sanitizeMiddleware from './middlewares/sanitize.middleware';
import { logger, stream } from './utils/logger';
import path from 'path';
// import bodyParser from 'body-parser';
// import formidable from 'express-formidable'

// import { Routes } from './interfaces/routes.interface';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env =  node_env || 'production';
    this.port =  9001;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
      
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(generalLimiter); // Apply rate limiting to all requests
    this.app.use(hpp());
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      }
    }));
    this.app.use(compression());
    this.app.use(express.json({ limit: '10mb' })); // Limit request body size
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(mongoSanitize()); // Sanitize against NoSQL injection
    this.app.use(sanitizeMiddleware); // Sanitize against XSS
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'client')));
    this.app.use('css', express.static(path.join(__dirname + 'client/css')));
    this.app.use('img', express.static(path.join(__dirname + 'client/img')));
    this.app.use('js', express.static(path.join(`${__dirname}client/js`)));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

//   private initializeSwagger() {
//     const options = {
//       swaggerDefinition: {
//         info: {
//           title: 'REST API',
//           version: '1.0.0',
//           description: 'Example docs',
//         },
//       },
//       apis: ['swagger.yaml'],
//     };

//     const specs = swaggerJSDoc(options);
//     this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//   }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
