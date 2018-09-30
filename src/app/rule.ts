export class Rule {
  readonly match: Array<RegExp>;
  readonly suggest: string;

  constructor({match, suggest}) {
    this.match = match.map(function(pattern) {
      try {
        return new RegExp(pattern, 'g');
      } catch(e) {
        return null;
      }
    });
    this.suggest = suggest;
  }

  apply(target: string): string {
    var result = target;
    for (let pattern of this.match) {
      if (pattern) {
        result = result.replace(pattern, this.suggest);
      }
    }
    return result;
  }
}
