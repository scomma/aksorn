import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import { Ruleset } from '../ruleset';
import { RuleService } from '../rule.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})

export class WizardComponent implements OnInit {
  rulesets: Ruleset[];
  suggestAll: boolean = false;
  raw: string;
  segments;
  result: string;

  constructor(private ruleService: RuleService) { }

  ngOnInit() {
    this.ruleService.init();
  }

  step(event: StepperSelectionEvent): void {
    if (event.previouslySelectedIndex == 0 && event.selectedIndex == 1) {
      this.segments = this.ruleService.partition(this.raw);
    } else if (event.previouslySelectedIndex == 1 && event.selectedIndex == 2) {
      this.result = this.ruleService.applyAll(this.raw);
    }
  }

  example(): void {
    this.raw = "ไม่อนุญาติให้เข้าสังเกตุการณ์การผัดกระเพราที่จตุรัสกลางเมืองฝรั่งเศษนะค่ะ";
  }

  reset(stepper: MatStepper): void {
    this.raw = this.result = "";
    this.suggestAll = false;
    stepper.reset();
  }

  restore(segment): void {
    if (segment.original) {
      segment.text = segment.original;
      delete segment.original;
    }
  }

  suggest(segment): void {
    if (segment.suggest) {
      segment.original = segment.text;
      segment.text = segment.suggest;
    }
  }

  toggle(segment): void {
    if (segment.original) this.restore(segment);
    else if (segment.suggest) this.suggest(segment);
  }

  toggleAll(event): void {
    if (event.checked) {
      this.segments.map(this.suggest);
    } else {
      this.segments.map(this.restore);
    }
  }
}
