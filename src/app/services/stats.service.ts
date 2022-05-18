import {Injectable} from '@angular/core';
import {Pokemon} from 'pokenode-ts';
import {Verdict} from '../data/verdict';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  public likedPokemon: number[] = [];
  public dislikedPokemon: number[] = [];

  // values stored are 0 -> average, 1 -> amount of values
  public averageWeight: number[] = [0, 0];
  public averageHeight: number[] = [0, 0];
  public primaryTypes: { [key: string]: number } = {};
  public secondaryTypes: { [key: string]: number } = {};

  get judgedPokemon(): number [] {
    return this.likedPokemon.concat(this.dislikedPokemon);
  }

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.likedPokemon = JSON.parse(localStorage.getItem('liked_pokemon') ?? "[]");
    this.dislikedPokemon = JSON.parse(localStorage.getItem('disliked_pokemon') ?? "[]");
    this.averageWeight = JSON.parse(localStorage.getItem('average_weight') ?? "[0,0]");
    this.averageHeight = JSON.parse(localStorage.getItem('average_height') ?? "[0,0]");
    this.primaryTypes = JSON.parse(localStorage.getItem('types_primary') ?? "{}");
    this.secondaryTypes = JSON.parse(localStorage.getItem('types_secondary') ?? "{}");
  }

  private saveData() {
    localStorage.setItem('liked_pokemon', JSON.stringify(this.likedPokemon));
    localStorage.setItem('disliked_pokemon', JSON.stringify(this.dislikedPokemon));
    localStorage.setItem('average_weight', JSON.stringify(this.averageWeight));
    localStorage.setItem('average_height', JSON.stringify(this.averageHeight));
    localStorage.setItem('types_primary', JSON.stringify(this.primaryTypes));
    localStorage.setItem('types_secondary', JSON.stringify(this.secondaryTypes));
  }

  private addToAverage(averagePair: number[], valueToAdd: number): number[] {
    if (averagePair[1] === 0) {
      averagePair[0] = valueToAdd;
      averagePair[1]++;
    } else {
      averagePair[0] = ((averagePair[0] * averagePair[1]) + valueToAdd) / (++averagePair[1]);
    }
    return averagePair;
  }

  public addJudgedPokemon(pokemon: Pokemon, verdict: Verdict) {
    if (verdict === Verdict.Liked) {
      this.likedPokemon.push(pokemon.id);
      this.addToAverage(this.averageWeight, pokemon.weight);
      this.addToAverage(this.averageHeight, pokemon.height);
      this.primaryTypes[pokemon.types[0].type.name] = this.primaryTypes[pokemon.types[0].type.name] === undefined ? 1 : this.primaryTypes[pokemon.types[0].type.name] + 1;
      if (pokemon.types[1] !== undefined)
        this.secondaryTypes[pokemon.types[0].type.name] = this.secondaryTypes[pokemon.types[1].type.name] === undefined ? 1 : this.secondaryTypes[pokemon.types[1].type.name] + 1;
    } else
      this.dislikedPokemon.push(pokemon.id);

    this.saveData();
  }

  public reset(): void {
    this.likedPokemon = JSON.parse("[]");
    this.dislikedPokemon = JSON.parse("[]");
    this.averageWeight = JSON.parse("[0,0]");
    this.averageHeight = JSON.parse("[0,0]");
    this.primaryTypes = JSON.parse("{}");
    this.secondaryTypes = JSON.parse("{}");
    this.saveData();
  }
}
