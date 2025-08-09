import { Controller, Get, Post, Body } from '@nestjs/common';
import { DerslerService } from './dersler.service';

@Controller('dersler')
export class DerslerController {
  constructor(private readonly derslerService: DerslerService) {}

  @Get()
  getProgress() {
    return this.derslerService.getProgress();
  }

  @Post()
  saveProgress(@Body() checkedStates: any) {
    return this.derslerService.saveProgress(checkedStates);
  }
}