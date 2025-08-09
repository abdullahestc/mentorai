import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { derslerConfig } from 'src/config/dersler.config';

@Injectable()
export class DerslerService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const progress = await this.prisma.globalProgress.findUnique({ where: { id: 1 } });
    if (!progress) {
      await this.prisma.globalProgress.create({ data: { id: 1 } });
    }
  }

  async getProgress() {
    const progressRecord = await this.prisma.globalProgress.findUnique({
      where: { id: 1 },
    });
    const checkedStates = (progressRecord?.checkedStates as Record<string, boolean>) || {};

    const derslerIlerlemeListesi = derslerConfig.map(ders => {
      let kazanilanPuan = 0;
      const toplamPuan = ders.konuSayisi * 3; 
      for (let i = 0; i < ders.konuSayisi; i++) {
        if (checkedStates[`${ders.id}-konu-${i}`]) kazanilanPuan++;
        if (checkedStates[`${ders.id}-tekrar-${i}-0`]) kazanilanPuan++;
        if (checkedStates[`${ders.id}-tekrar-${i}-1`]) kazanilanPuan++;
      }
      
      const progress = toplamPuan > 0 
        ? Math.round((kazanilanPuan / toplamPuan) * 100) 
        : 0;

      return {
        title: ders.title,
        icon: ders.icon,
        progress: progress,
        path: ders.path
      };
    });

    return derslerIlerlemeListesi;
  }

   async saveProgress(checkedStates: any) {
    return this.prisma.globalProgress.update({
      where: { id: 1 },
      data: { checkedStates: checkedStates },
    });
  }
}