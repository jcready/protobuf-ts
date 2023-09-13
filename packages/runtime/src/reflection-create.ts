import {reflectionScalarDefault} from "./reflection-scalar-default";
import type {UnknownMessage, UnknownOneofGroup} from "./unknown-types";
import type {IMessageType} from './message-type-contract';
import {MESSAGE_TYPE} from './message-type-contract';

/**
 * Creates an instance of the generic message, using the field
 * information.
 */
export function reflectionCreate<T extends object>(type: IMessageType<T>): T {
    const msg: UnknownMessage = type.messagePrototype
        ? Object.create(type.messagePrototype)
        : Object.defineProperty({}, MESSAGE_TYPE, {value: type});
    for (let field of type.fields) {
        let name = field.localName;
        if (field.opt)
            continue;
        if (field.oneof)
            msg[field.oneof] = {oneofKind: undefined} as UnknownOneofGroup;
        else if (field.repeat)
            msg[name] = [];
        else
            switch (field.kind) {
                case "scalar":
                    msg[name] = reflectionScalarDefault(field.T, field.L);
                    break;
                case "enum":
                    // we require 0 to be default value for all enums
                    msg[name] = 0;
                    break;
                case "map":
                    msg[name] = {};
                    break;
            }
    }
    return msg as T;
}
