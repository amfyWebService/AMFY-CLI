export interface IEntity {
    /**
     * The entity name
     */
    entityName: string;

    /**
     * Array of entity's property
     */
    properties: IEntityProperties[];
}

export interface IEntityProperties {
    /**
     * the property name
     */
    name: string;

    /**
     * The type of the property
     */
    type: IEntityPropertiesType;

    /**
     * The lenght of varchar if string type is selected
     */
    length?: number;
}

export enum IEntityPropertiesType {
    NUMBER = 'number',
    DOUBLE = 'double',
    STRING = 'string',
    TEXT = 'text',
    BOOLEAN = 'boolean'
}