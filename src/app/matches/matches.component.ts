import {Component, OnInit} from '@angular/core';
import {Pokemon} from 'pokenode-ts';
import {DataService} from '../services/data.service';
import {StatsService} from '../services/stats.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.sass']
})
export class MatchesComponent implements OnInit {
  public matchedPokemon: Pokemon[] = [];

  constructor(private statsService: StatsService, private dataService: DataService) {
  }

  async ngOnInit(): Promise<void> {
    this.statsService.likedPokemon.forEach(async (id) => this.matchedPokemon.push(await this.dataService.getPokemon(id)))
  }
}
