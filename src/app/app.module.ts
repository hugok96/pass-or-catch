import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {VoteCardComponent} from './vote-card/vote-card.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {VoteControlsComponent} from './vote-controls/vote-controls.component';
import {MenuComponent} from './menu/menu.component';
import {MatchesComponent} from './matches/matches.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteCardComponent,
    VoteControlsComponent,
    MenuComponent,
    MatchesComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
