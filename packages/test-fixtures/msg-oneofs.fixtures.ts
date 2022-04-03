import type {Fixture} from "./index";
import {MessageType} from "@protobuf-ts/runtime";


const f: Fixture[] = [];
export default f;

f.push({
    typeName: 'spec.OneofScalarMemberMessage',
    fields: [
        {no: 1, name: "int", oneof: "result", kind: "scalar", T: 5 /*int32*/},
        {no: 2, name: "error", oneof: "result", kind: "scalar", T: 9 /*string*/}
    ],
    messages: {
        'default': {
            result: {kind: undefined}
        },
        'err': {
            result: {kind: 'error', value: 'hello'}
        },
    },
    json: {
        'default': {},
        'err': {error: 'hello'},
        'null reads to ""': {error: null},
    },
});

f.push({
    typeName: 'spec.OneofMessageMemberMessage',
    fields: [
        {no: 1, name: "a", oneof: "objects", kind: "message", T: () => OneofMessageMemberMessage_TestMessageA},
        {no: 2, name: "b", oneof: "objects", kind: "message", T: () => OneofMessageMemberMessage_TestMessageB}
    ],
    messages: {
        'default': {
            objects: {kind: undefined}
        },
        'a': {
            objects: {kind: 'a', value: {name: 'A'}}
        },
    },
    json: {
        'default': {},
        'a': {a: {name: 'A'}}
    },
});


export const OneofMessageMemberMessage_TestMessageA = new MessageType<any>("spec.OneofMessageMemberMessage.TestMessageA", [
    {no: 1, name: "name", kind: "scalar", T: 9 /*string*/}
]);
export const OneofMessageMemberMessage_TestMessageB = new MessageType<any>("spec.OneofMessageMemberMessage.TestMessageB", [
    {no: 1, name: "name", kind: "scalar", T: 9 /*string*/}
]);
