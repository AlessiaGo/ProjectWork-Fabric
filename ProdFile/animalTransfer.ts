import { Context, Contract } from "fabric-contract-api";
export declare class AnimalContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    CreateAnimal(ctx: Context, id: string, name: string, type: string, bread: string, birthDate: string, description: string, peedigree: string): Promise<void>;
    UpdateAnimalName(ctx: Context, id: string, newName: string): Promise<void>;
    ReadAnimal(ctx: Context, id: string): Promise<string>;
    AnimalExist(ctx: Context, id: string): Promise<boolean>;
    UpdateAnimal(ctx: Context, id: string, name: string, type: string, bread: string, birthDate: string, description: string, peedigree: boolean): Promise<void>;
    DeleteAnimal(ctx: Context, id: string): Promise<void>;
    GetAllAnimals(ctx: Context): Promise<string>;
    GetAnimalHistory(ctx: Context, id: string): Promise<string>;
    _GetAllResults(iterator: any, isHistory: any): Promise<any[]>;
}
