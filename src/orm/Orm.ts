import { exec } from 'child_process';
import { CommanderStatic } from "commander";
import inquirer from 'inquirer';
import { IEntity, IEntityPropertiesType, IEntityProperties } from "./utils/IEntity";
import { EntityGenerator } from "./utils/EntityGenerator";
import { Tools } from '../utils/utilsclass/Tools';
import FilesUtils from '../utils/FilesUtils';
import path from "path";
import fs from 'fs-extra';

export class Orm {
    constructor(private commander: CommanderStatic) {
        this.addEntity();
        this.setOrmType();
    }

    public addEntity() {
        this.commander
            .command('orm-add [entityName]')
            .description('Entity generator')
            .action(async (entityName) => {

                if (!entityName) {

                    const obj: any = await inquirer.prompt([
                        {
                            message: 'Enter a entity name',
                            type: 'input',
                            name: 'entityName',
                            validate: this.validateInput,

                        }]);

                    entityName = obj.entityName;
                }

                let entity: IEntity;
                let properties: IEntityProperties[] = [];

                while (true) {
                    const answer: any = await inquirer.prompt([{
                        message: 'Enter a column name',
                        type: 'input',
                        name: 'name',
                    }]);

                    if (!answer.name) {
                        break;
                    }

                    const answerType = await inquirer.prompt([
                        {
                            message: 'Enter a type',
                            type: 'list',
                            name: 'type',
                            choices: [
                                IEntityPropertiesType.BOOLEAN,
                                IEntityPropertiesType.DOUBLE,
                                IEntityPropertiesType.NUMBER,
                                IEntityPropertiesType.STRING,
                                IEntityPropertiesType.TEXT
                            ],
                            validate: this.validateInput,
                        }, {
                            message: 'Enter string length',
                            type: 'input',
                            name: 'length',
                            when: (answers: any) => {
                                return answers.type === IEntityPropertiesType.STRING;
                            }
                        }
                    ]);

                    properties.push(<IEntityProperties>{ ...answer, ...answerType });
                }
                entity = {
                    entityName,
                    properties
                }

                EntityGenerator.generate(entity);
            });

    }

    public setOrmType() {
        this.commander
            .command('orm-set <ormType>')
            .description('Set the orm type')
            .action((ormType) => {
                if (ormType !== 'typeorm') {
                    console.log('Orm not supported by amfy-cli');
                    return;
                }

                exec('npm install ' + ormType, async (err) => {
                    if (err)
                        throw new Error('Error on npm install ' + ormType);

                    const templateSrc = await Tools.getTemplate(ormType + '.index');
                    const fileDest = path.join(await Tools.getAppRootPath(), 'index.ts');

                    fs.unlinkSync(fileDest);

                    FilesUtils.createFileFromTemplate(templateSrc, fileDest);
                });

            });
    }

    private validateInput(input: string): boolean {
        return input !== ''
    }
}