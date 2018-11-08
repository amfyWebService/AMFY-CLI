import { Tools } from './../../utils/utilsclass/Tools';
import * as fs from 'fs';
import { IEntity } from "./IEntity";
import FilesUtils from "../../utils/FilesUtils";
import * as changeCase from "change-case";
import path from 'path';

export class EntityGenerator {
    static async generate(entity: IEntity) {
        entity.entityName = changeCase.pascalCase(entity.entityName);

        for(let index in entity.properties){
            if(entity.properties[index].name === 'id'){
                entity.properties.splice(Number.parseInt(index), 1);
            }
        }

        const templateSrc = await Tools.getTemplate('model', (await this.getOrm()));
        const fileDest = path.join((await this.getModelPath()), entity.entityName + '.ts');

        FilesUtils.createFileFromTemplate(templateSrc, fileDest, entity);
    }

    private static async getModelPath() {
        const rootPath = await Tools.getAppRootPath();
        const modelPath = '/src/models';

        return rootPath + modelPath;
    }

    public static async getOrm(): Promise<string> {
        const appRootPath = await Tools.getAppRootPath();
        const configPath = '/config/default.json';

        if (fs.existsSync(appRootPath + configPath)) {
            const config = require(appRootPath + configPath);

            if (config.orm) {
                if (config.orm.ormType) {
                    return config.orm.ormType;
                }
            }
        }

        return 'base_model';
    }
}