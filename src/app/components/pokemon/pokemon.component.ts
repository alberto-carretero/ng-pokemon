import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PokemonI } from '../../interfaces/pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonComponent implements OnInit {
  // Pokemon data
  @Input() pokemon: PokemonI = {
    id: 0,
    name: '',
    sprites: {},
  };

  // Boolean to manage the state of the pokemon image filter property
  @Input() hasBeenSuccessful: boolean = false;

  // Path of the image to be displayed
  public image: string[] = [];

  /**
   * Gets path of the image to be displayed
   */
  ngOnInit(): void {
    const imageObject = Object.entries(this.pokemon.sprites).find((key, value) => key.includes('other') && value !== undefined);
    this.image = imageObject ? imageObject[1].dream_world.front_default : undefined;
  }
}
