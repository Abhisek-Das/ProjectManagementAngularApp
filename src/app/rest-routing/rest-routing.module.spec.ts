import { RestRoutingModule } from './rest-routing.module';

describe('RestRoutingModule', () => {
  let restRoutingModule: RestRoutingModule;

  beforeEach(() => {
    restRoutingModule = new RestRoutingModule();
  });

  it('should create an instance', () => {
    expect(restRoutingModule).toBeTruthy();
  });
});
