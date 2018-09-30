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

  constructor(private http: HttpClient) { }

  getRulesets(): Observable<Ruleset[]> {
    return this.http.get<Ruleset[]>(this.rulesetsUrl).pipe(
      map(data => data.map(ruleset => new Ruleset(ruleset)))
    );
  }
}
