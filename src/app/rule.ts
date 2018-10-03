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

  check(target: string): string[] {
    var marks: string[] = [];
    for (let pattern of this.match) {
      var m;
      if (!pattern) continue;
      while (m = pattern.exec(target)) {
        marks.push({index: m.index, text: m[0], suggest: this.suggest});
      }
    }
    return marks;
  }

  apply(target: string): string {
    return this.match.reduce((text, pattern) =>
      pattern ? text.replace(pattern, this.suggest) : text,
    target);
  }
}
