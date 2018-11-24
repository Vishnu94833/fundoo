import { LazymoduleModule } from './lazymodule.module';

describe('LazymoduleModule', () => {
  let lazymoduleModule: LazymoduleModule;

  beforeEach(() => {
    lazymoduleModule = new LazymoduleModule();
  });

  it('should create an instance', () => {
    expect(lazymoduleModule).toBeTruthy();
  });
});
