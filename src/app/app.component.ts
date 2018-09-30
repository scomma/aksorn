import { Component, enableProdMode } from '@angular/core';
import { MatStepper } from '@angular/material';

import { Ruleset } from './ruleset';
import { RuleService } from './rule.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  rulesets: Ruleset[];

  constructor(private ruleService: RuleService) { }

  ngOnInit() {
    this.ruleService.getRulesets().subscribe(rulesets => this.rulesets = rulesets);
  }

  step(event: StepperSelectionEvent): void {
    if (event.previouslySelectedIndex == 0 && event.selectedIndex == 1) {
      this.result = this.raw;
      for (let ruleset: Ruleset of this.rulesets) {
        this.result = ruleset.apply(this.result);
      }
    }
  }

  example(): void {
    this.raw = "ไม่อนุญาติให้เข้าสังเกตุการณ์การผัดกระเพราที่จตุรัสกลางเมืองฝรั่งเศษนะค่ะ";
  }

  reset(stepper: MatStepper): void {
    this.raw = this.result = "";
    stepper.reset();
  }
}

enableProdMode();
