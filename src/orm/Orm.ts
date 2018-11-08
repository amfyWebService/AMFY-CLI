import { CommanderStatic } from "commander";
import inquirer from 'inquirer';
import { IEntity, IEntityPropertiesType, IEntityProperties } from "./utils/IEntity";
import { EntityGenerator } from "./utils/EntityGenerator";
export class Orm {
    constructor(private commander: CommanderStatic) {
        this.addEntity()
    }

    public addEntity() {
        this.commander
            .command('orm-add [entityName]')
            .description('Entity generator')
            .action(async (entityName) => {
            
                if (!entityName) {
                    
                    const obj: any = await inquirer.prompt([
                        {
                            message : 'Enter a entity name',
                            type    : 'input',
                            name    : 'entityName',
                            validate: this.validateInput,

                        }]);

                    entityName = obj.entityName;
                }

                let entity    : IEntity;
                let properties: IEntityProperties[] = [];

                while (true) {
                    const answer: any = await inquirer.prompt([{
                        message: 'Enter a column name',
                        type   : 'input',
                        name   : 'name',
                    }]);

                    if (!answer.name) {
                        break;
                    }

                    const answerType = await inquirer.prompt([
                        {
                            message: 'Enter a type',
                            type   : 'list',
                            name   : 'type',
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
                            type   : 'input',
                            name   : 'length',
                            when   : (answers: any) => {
                                return answers.type === IEntityPropertiesType.STRING;
                            }
                        }
                    ]);

                    properties.push(<IEntityProperties> {...answer, ...answerType});
                }
                entity = {
                    entityName,
                    properties
                }
                
                EntityGenerator.generate(entity);
            });

    }
    private validateInput(input: string): boolean {
        return input !== ''
    }
}