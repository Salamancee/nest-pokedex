import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto.js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity.js';
import { PokeResponse } from './interfaces/poke-response.interface.js';
import { AxiosAdapter } from '../common/adapters/axios.adapter.js';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) {

  }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=250');
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      const data: CreatePokemonDto = { name, no };
      pokemonToInsert.push(data);

    });
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }
}
