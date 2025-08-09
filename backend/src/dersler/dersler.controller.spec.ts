import { Test, TestingModule } from '@nestjs/testing';
import { DerslerController } from './dersler.controller';

describe('DerslerController', () => {
  let controller: DerslerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DerslerController],
    }).compile();

    controller = module.get<DerslerController>(DerslerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
