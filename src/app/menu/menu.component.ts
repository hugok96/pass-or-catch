import {Component, OnInit} from '@angular/core';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  public matchesIcon = faHeart
  public matchesOpened: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public openMatches() {
    this.matchesOpened = !this.matchesOpened;
  }
}
