import { MyappRoutingModule } from './myapp-routing.module';

describe('MyappRoutingModule', () => {
  let myappRoutingModule: MyappRoutingModule;

  beforeEach(() => {
    myappRoutingModule = new MyappRoutingModule();
  });

  it('should create an instance', () => {
    expect(myappRoutingModule).toBeTruthy();
  });
});
