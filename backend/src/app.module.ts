import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { SubjectModule } from './subject/subject.module';
import { VariantModule } from './variant/variant.module';
import { TaskModule } from './task/task.module';

@Module({
	imports: [ConfigModule.forRoot(), UserModule, AuthModule, SubjectModule, VariantModule, TaskModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
