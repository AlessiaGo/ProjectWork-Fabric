"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalContract = void 0;



const fabric_contract_api_1 = require("fabric-contract-api");
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
let AnimalContract = class AnimalContract extends fabric_contract_api_1.Contract {
    async InitLedger(ctx) {
    }
    async CreateAnimal(ctx, id, name, type, bread, birthDate, description, peedigree) {
        const exist = await this.AnimalExist(ctx, id);
        if (exist) {
            throw new Error(`The animal ${id} exists`);
        }
        const animal = {
            id: id,
            name: name,
            type: type,
            bread: bread,
            birthDate: birthDate,
            description: description,
            peedigree: peedigree,
        };
        await ctx.stub.putState(id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(animal))));
    }
    async UpdateAnimalName(ctx, id, newName) {
        const exists = await this.AnimalExist(ctx, id);
        if (!exists) {
            throw new Error(`The animal ${id} doesn't exist`);
        }
        const animalString = await this.ReadAnimal(ctx, id);
        const animal = JSON.parse(animalString);
        animal.name = newName;
        return ctx.stub.putState(id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(animal))));
    }
    async ReadAnimal(ctx, id) {
        const animalJSON = await ctx.stub.getState(id);
        if (!animalJSON || animalJSON.length === 0) {
            throw new Error(`The animal ${id} doesn't exist`);
        }
        return animalJSON.toString();
    }
    async AnimalExist(ctx, id) {
        const animalJSON = await ctx.stub.getState(id);
        return animalJSON && animalJSON.length > 0;
    }
    async UpdateAnimal(ctx, id, name, type, bread, birthDate, description, peedigree) {
        const exists = await this.AnimalExist(ctx, id);
        if (!exists) {
            throw new Error(`The animal ${id} doesn't exist`);
        }
        const updatedAnimal = {
            id: id,
            name: name,
            type: type,
            bread: bread,
            birthDate: birthDate,
            description: description,
            peedigree: peedigree,
        };
        return ctx.stub.putState(id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(updatedAnimal))));
    }
    async DeleteAnimal(ctx, id) {
        const exists = await this.AnimalExist(ctx, id);
        if (!exists) {
            throw new Error(`The animal ${id} doesn't exist`);
        }
        return ctx.stub.deleteState(id);
    }
    async GetAllAnimals(ctx) {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange("", "");
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString("utf8");
            let record;
            try {
                record = JSON.parse(strValue);
            }
            catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
    async GetAnimalHistory(ctx, id) {
        let resultsIterator = await ctx.stub.getHistoryForKey(id);
        let results = await this._GetAllResults(resultsIterator, true);
        return JSON.stringify(results);
    }
    async _GetAllResults(iterator, isHistory) {
        let allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString("utf8"));
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.txId;
                    jsonRes.Timestamp = res.value.timestamp;
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString("utf8"));
                    }
                    catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString("utf8");
                    }
                }
                else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString("utf8"));
                    }
                    catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString("utf8");
                    }
                }
                allResults.push(jsonRes);
            }
            res = await iterator.next();
        }
        iterator.close();
        return allResults;
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], AnimalContract.prototype, "InitLedger", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AnimalContract.prototype, "CreateAnimal", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], AnimalContract.prototype, "UpdateAnimalName", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AnimalContract.prototype, "ReadAnimal", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)("boolean"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AnimalContract.prototype, "AnimalExist", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], AnimalContract.prototype, "UpdateAnimal", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AnimalContract.prototype, "DeleteAnimal", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)("string"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], AnimalContract.prototype, "GetAllAnimals", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AnimalContract.prototype, "GetAnimalHistory", null);
AnimalContract = __decorate([
    (0, fabric_contract_api_1.Info)({
        title: "AniamlTransfer",
        description: "For trading assets",
    })
], AnimalContract);
exports.AnimalContract = AnimalContract;
//# sourceMappingURL=animalTransfer.js.map