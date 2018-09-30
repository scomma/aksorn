import { Rule } from './rule';

export class Ruleset {
  readonly name: string;
  readonly rules: Array<Rule>;
  readonly source: string;

  constructor({name, rules, source}) {
    this.name = name;
    this.rules = rules.map(rule => new Rule(rule));
    this.source = source;
  }

  apply(target: string): string {
    var result = target;
    for (let rule of this.rules) {
      result = rule.apply(result);
    }
    return result;
  }
}
