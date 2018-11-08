import { IEntity } from "./IEntity";

export abstract class IModelOrmGenerator {
    public generate(entity: IEntity): string {
        let content = '';

        content += this.generateHeader(entity);

        for(let prop of entity.properties) {
            content += '\n\n' + this.generateProperty(prop);
        }

        content += '\n}\n';
    }

    /**
     * @example <caption>
     * import { Table } from "my-orm"
     * 
     * @Table()
     * export class Model {
     * </caption>
     * 
     * @param entity the entity to generate
     */
    protected abstract generateHeader(entity: IEntity): string;

    /**
     * @example <caption>
     * \t@Column()
     * \tpropName: type;
     * </caption>
     * 
     * @param prop the property to generate
     */
    protected abstract generateProperty(prop: IEntityProperties): string;
}