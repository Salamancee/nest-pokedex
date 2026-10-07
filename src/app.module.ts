import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module.js';

@Module({
  imports: [
    PokemonModule,
  
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
  
    CommonModule
  ],
})
export class AppModule {}
