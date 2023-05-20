import { Object, Property } from "fabric-contract-api";

@Object()
export class Animal {
  @Property()
  public docType?: string;

  @Property()
  public id: string;

  @Property()
  public name: string;

  @Property()
  public type: string;

  @Property()
  public breed: string;

  @Property()
  public birthDate: string;

  @Property()
  public description: string;

  @Property()
  public peedigree: string;
}

@Object()
export class Owner {
  @Property()
  public docType?: string;

  @Property()
  public id: string;

  @Property()
  public name: string;

  @Property()
  public surname: string;
}