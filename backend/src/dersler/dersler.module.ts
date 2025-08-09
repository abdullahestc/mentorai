import { Module } from '@nestjs/common';
import { DerslerController } from './dersler.controller';
import { DerslerService } from './dersler.service';

@Module({
  controllers: [DerslerController],
  providers: [DerslerService]
})
export class DerslerModule {}
