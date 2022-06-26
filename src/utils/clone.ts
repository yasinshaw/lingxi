export function clone(source: any, target: any) {
    for (var attribut in source) {
        if (typeof source[attribut] === "object") {
            clone(source[attribut], target[attribut]);
        } else {
            target[attribut] = source[attribut];
        }
    }
}