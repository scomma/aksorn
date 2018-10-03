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

  check(target: string): string[] {
    return [].concat(...this.rules.map(rule => rule.check(target)));
  }

  apply(target: string): string {
    return this.rules.reduce((text, rule) => rule.apply(text), target);
  }
}
