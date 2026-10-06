import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module.js';

@Module({
  imports: [PokemonModule],
})
export class AppModule {}
