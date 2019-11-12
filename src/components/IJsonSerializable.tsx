// Represents any object that can be serialized and deserialized as JSON
export interface IJsonSerializable {
    load(data: object);
    dump() : object;
}