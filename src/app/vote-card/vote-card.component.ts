import {Component, Input, NgZone, OnInit} from '@angular/core';
import {faBalanceScaleRight, faFire, faFireExtinguisher} from '@fortawesome/free-solid-svg-icons';
import {Pokemon} from 'pokenode-ts';
import {DataService} from '../services/data.service';
import {Verdict} from '../data/verdict';
import {VoteCardData} from '../data/vote-card-data';

@Component({
  selector: 'app-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.sass']
})
export class VoteCardComponent implements OnInit {
  public images: string[] = [];
  public index: number = 0;

  public faTypes = faFire
  public faAbilities = faFireExtinguisher
  public faWeight = faBalanceScaleRight

  @Input()
  public cardData!: VoteCardData;

  private timeoutId: NodeJS.Timeout | null = null;

  get pokemon(): Pokemon {
    return this.cardData.pokemon
  }

  get imageCount(): number {
    return this.images.length;
  }

  get pTypes(): string {
    return this.pokemon.types.map(t => t.type.name).join('-');
  }

  get pAbilities(): string {
    return this.pokemon.abilities.map(a => a.ability.name).join(', ');
  }

  get verdict(): Verdict | null {
    // TODO: replace this with a proper listener
    let verdict = this.cardData.verdict;
    if (verdict !== null)
      this.debouncedDelete();
    return verdict;
  }

  get zIndex(): number {
    return DataService.totalPokemon - this.cardData.cardId;
  }

  constructor(private zone: NgZone, private dataService: DataService) {
  }

  ngOnInit(): void {
    let localImages: any[] = [];
    localImages.push(this.pokemon.sprites.other['official-artwork'].front_default);
    localImages.push(this.pokemon.sprites.other['dream_world'].front_default);

    if (null !== this.pokemon.sprites.other.home.front_female)
      localImages.push(this.pokemon.sprites.other.home.front_female);
    else
      localImages.push(this.pokemon.sprites.other.home.front_default);

    localImages.forEach(p => {
      if (null !== p) this.images.push(p)
    });
  }

  private debouncedDelete(): void {
    if (null !== this.timeoutId)
      return;

    this.timeoutId = setTimeout(() => {
      this.cardData.onDeleted();
    }, 500);
  }

  public moveImages(amount: number) {
    this.zone.run(() => {
      this.index = (this.index + amount) % this.imageCount;
      if (this.index < 0)
        this.index = this.imageCount - (Math.abs(this.index) % this.imageCount);
    });
  }
}
