import assert from 'power-assert';

import parse from '..';

describe('parse(str)', () => {
  let now;
    
  let assertSameDate = (actual, expected) => {
    assert.strictEqual(+actual, +expected);
  };

  beforeEach(() => { now = new Date(); });  

  describe('colon separated time', () => {
    it('11:05', () => {
      assertSameDate(
        parse('please call me at 11:05 ...'),
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 5, 0)
      );
    });

    it('11:5', () => {
      assertSameDate(
        parse('please call me at 11:5 ...'),
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 5, 0)
      );
    });

    it('12:02:15', () => {
      assertSameDate(
        parse('please call me at 12:02:15 ...'),
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 2, 15)
      );
    });

    it('12:02:15', () => {
      assertSameDate(
        parse('please call me at 12:02:15:15 ...'),
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 2, 15)
      );
    });    

    it('11: (invalid)', () => {
      assert.strictEqual(parse('please call me at 11: ...'), null);
    });

    it('11:60 (invalid)', () => {
      assert.strictEqual(parse('please call me at 11:60 ...'), null);
    });

    it('24:05 (invalid)', () => {
      let d = new Date();
      assert.strictEqual(parse('please call me at 24:05 ...'), null);
    });
  });

  describe('time with date', () => {    
    it('5/1 12:02:15', () => {
      assertSameDate(
        parse('please call me at 5/1 12:02:15 ...'),
        new Date(now.getFullYear(), 4, 1, 12, 2, 15)
      );
    });

    it('5/112:02:15', () => {
      assertSameDate(
        parse('please call me at 5/112:02:15 ...'),
        new Date(now.getFullYear(), 4, 11, 2, 2, 15)
      );
    });    

    it('2014/5/1 12:02:15', () => {
      assertSameDate(
        parse('please call me at 2014/5/1 12:02:15 ...'),
        new Date(2014, 4, 1, 12, 2, 15)
      );
    });
    
    it('15/1 12:02:15 (invalid date part should be ignored)', () => {
      assertSameDate(
        parse('please call me at 15/1 12:02:15 ...'),
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 2, 15)
      );
    });
  });
});
