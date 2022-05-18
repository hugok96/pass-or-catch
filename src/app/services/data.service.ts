import {Injectable, NgZone} from '@angular/core';
import {Pokemon, PokemonClient} from 'pokenode-ts';
import {StatsService} from './stats.service';
import {Verdict} from '../data/verdict';
import {VoteCardData} from '../data/vote-card-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public static totalPokemon: number = 898
  public static cachedCards: number = 10;

  private api: PokemonClient;
  private pokemonIdPool: number[] = [];
  private cardIndices: number = 0;
  public currentCards: VoteCardData[] = [];

  constructor(private zone: NgZone, private statsService: StatsService) {
    this.api = new PokemonClient();
    this.initialize()
  }

  private initialize(): void {
    this.pokemonIdPool = Array.apply(null, Array(DataService.totalPokemon - 1)).map((v, k) => k + 1).filter(v => -1 === this.statsService.judgedPokemon.indexOf(v));
  }

  get gameOver(): boolean {
    return this.pokemonIdPool.length === 0 && this.currentCards.filter(c => c.verdict === null).length === 0
  }

  get pokemonLeft(): number {
    return this.pokemonIdPool.length;
  }

  private removeCard(cardIndex: number): void {
    this.currentCards = this.currentCards.filter(c => c.cardId !== cardIndex);
  }

  public verdict(v: Verdict): void {
    let currentCard = this.currentCards.filter(c => c.verdict === null)[0];
    currentCard.verdict = v;
    this.statsService.addJudgedPokemon(currentCard.pokemon, v);
    this.generateCards();
  }

  public async generateCards(): Promise<void> {
    let cardsToGo = (DataService.cachedCards - this.currentCards.filter(c => c.verdict === null).length);

    for (let i = 0; i < cardsToGo; i++) {
      if (this.pokemonLeft === 0) {
        return;
      }
      let index = this.cardIndices++;
      this.currentCards.push({
        cardId: index,
        pokemon: await this.getNextPokemon(),
        onDeleted: () => this.removeCard(index),
        verdict: null
      } as VoteCardData)
    }
  }

  public async getPokemon(id: number): Promise<Pokemon> {
    return await this.api.getPokemonById(id);
  }

  public async getNextPokemon(): Promise<Pokemon> {
    let index = this.pokemonIdPool.splice(Math.floor(Math.random() * this.pokemonIdPool.length), 1)[0] ?? 0;
    return await this.getPokemon(index);
  }

  public reset(): void {
    this.statsService.reset();
    this.pokemonIdPool = Array.apply(null, Array(DataService.totalPokemon - 1)).map((v, k) => k + 1).filter(v => -1 === this.statsService.judgedPokemon.indexOf(v));
    this.generateCards();
  }
}
