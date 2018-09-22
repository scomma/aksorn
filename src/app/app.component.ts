import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aksorn Proofreader';
  step(event: StepperSelectionEvent): void {
    if (event.previouslySelectedIndex == 0 && event.selectedIndex == 1) {
      this.result = this.raw;
    }
  }
}
