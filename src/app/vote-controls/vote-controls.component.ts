import {Component, OnInit} from '@angular/core';
import {faHeart, faTimes} from '@fortawesome/free-solid-svg-icons';
import {DataService} from '../services/data.service';
import {Verdict} from '../data/verdict';

@Component({
  selector: 'app-vote-controls',
  templateUrl: './vote-controls.component.html',
  styleUrls: ['./vote-controls.component.sass']
})
export class VoteControlsComponent implements OnInit {
  public faLike = faHeart
  public faDislike = faTimes

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  public like(): void {
    this.dataService.verdict(Verdict.Liked)
  }

  public dislike(): void {
    this.dataService.verdict(Verdict.Disliked)
  }

  public restart(): void {
    this.dataService.reset();
  }

  get gameOver(): boolean {
    return this.dataService.gameOver;
  }

}
