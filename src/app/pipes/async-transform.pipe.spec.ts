import { AsyncTransformPipe } from './async-transform.pipe';

describe('AsyncTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new AsyncTransformPipe();
    expect(pipe).toBeTruthy();
  });
});
