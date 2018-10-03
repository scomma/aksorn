import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ruleset } from './ruleset';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class RuleService {
  private rulesetsUrl = 'assets/rulesets.json';
  rulesets: Ruleset[];

  constructor(private http: HttpClient) { }

  init(): void {
    this.getRulesets().subscribe(rulesets => this.rulesets = rulesets);
  }

  getRulesets(): Observable<Ruleset[]> {
    return this.http.get<Ruleset[]>(this.rulesetsUrl).pipe(
      map(data => data.map(ruleset => new Ruleset(ruleset)))
    );
  }

  checkAll(raw: string): string[] {
    return [].concat(...this.rulesets.map(ruleset => ruleset.check(raw)));
  }

  applyAll(raw: string): string {
    return this.rulesets.reduce((text, ruleset) => ruleset.apply(text), raw);
  }

  partition(raw: string): object[] {
    var marks = this.checkAll(raw).sort((m1, m2) => {
      if (m1.index > m2.index)      return 1;
      else if (m1.index < m2.index) return -1;
      else                          return 0;
    });
    var segments: object[] = [];
    var head = 0;
    var m;

    while (m = marks.shift()) {
      if (m.index > head) {
        segments.push({index: head, text: raw.substring(head, m.index)});
      } else if (m.index < head) {
        continue;
      }
      segments.push(m);
      head = m.index + m.text.length;
    }

    if (head < raw.length) {
      segments.push({index: head, text: raw.substring(head, raw.length)});
    }

    return segments;
  }
}
