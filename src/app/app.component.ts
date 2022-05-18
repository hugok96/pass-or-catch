import {Component} from '@angular/core';
import {DataService} from './services/data.service';
import {StatsService} from './services/stats.service';
import {VoteCardData} from './data/vote-card-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Pokémon Pass or Catch';

  constructor(private dataService: DataService, private statsService: StatsService) {
  }

  get voteCards(): VoteCardData[] {
    return this.dataService.currentCards;
  }

  get gameOver(): boolean {
    return this.dataService.gameOver;
  }

  get likes(): number {
    return this.statsService.likedPokemon.length;
  }

  get dislikes(): number {
    return this.statsService.dislikedPokemon.length;
  }

  get weight(): number {
    return this.statsService.averageWeight[0];
  }

  get height(): number {
    return this.statsService.averageHeight[0];
  }

  get primaryType(): string {
    let type: string = '';
    let count: number = 0;
    for (let i in this.statsService.primaryTypes) {
      if (this.statsService.primaryTypes[i] > count) {
        type = i;
        count = this.statsService.primaryTypes[i];
      }
    }
    return `${type} (${count} pokémon)`;
  }

  get secondaryType(): string {
    let type: string = '';
    let count: number = 0;
    for (let i in this.statsService.secondaryTypes) {
      if (this.statsService.secondaryTypes[i] > count) {
        type = i;
        count = this.statsService.secondaryTypes[i];
      }
    }
    return `${type} (${count} pokémon)`;
  }

  ngOnInit(): void {
    this.dataService.generateCards();
  }
}
