import {Pokemon} from "pokenode-ts";
import {Verdict} from "./verdict";

export interface VoteCardData {
  cardId: number,
  pokemon: Pokemon,
  verdict: Verdict | null,
  onDeleted: () => {}
}
