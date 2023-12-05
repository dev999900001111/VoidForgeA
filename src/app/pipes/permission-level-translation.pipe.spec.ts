import { PermissionLevelTranslationPipe } from './permission-level-translation.pipe';

describe('PermissionLevelTranslationPipe', () => {
  it('create an instance', () => {
    const pipe = new PermissionLevelTranslationPipe();
    expect(pipe).toBeTruthy();
  });
});
