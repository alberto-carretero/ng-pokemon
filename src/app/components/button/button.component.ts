import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // Button text and value
  @Input() name: string = '';

  // Button status
  @Input() disabled: boolean = false;

  // Pokemon selected
  @Output() pokemonSelected = new EventEmitter<string>();

  /**
   * Emits the value for the button selected
   * @param event Selected button event
   */
  public getSelection(event: any): void {
    this.pokemonSelected.emit(event.target.value);
  }
}
