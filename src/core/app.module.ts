import { Module } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../modules/auth/auth.module';
import { InfraModule } from '../infra/infra.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { JwtStrategy } from '../common/strategies';
import { FileModule } from '../modules/file/file.module';
import { TranscribeModule } from '../modules/transcribe/transcribe.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
      includeStacktraceInErrorResponses: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    FileModule,
    TranscribeModule,
    InfraModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
