import asCurrency from '/src/filters/asCurrency';

describe('asCurrency', () => {

  it('adds .00 to integers', () => {
    expect(asCurrency(2)).toBe("$2.00");
  });

  it('rounds to 2 decimals', () => {
    expect(asCurrency(2.123)).toBe("$2.12");
  });

  it('works with string numbers', () => {
    expect(asCurrency("4")).toBe("$4.00");
  });

  it('doesn`t work with strings', () => {
    expect(asCurrency("abc")).toBe("$NaN");
  });

});