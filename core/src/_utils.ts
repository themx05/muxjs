export function formatRegex(str: string) {
    let replace = [
        ["/", "\/"],
        [".", "\."],
        [",", "\,"],
        ["(", "\("],
        [")", "\)"],
        ["[", "\["],
        ["]", "\]"],
        ["**", ".*"],
    ];
    let cp = str;
    replace.forEach((t) => {
        cp = cp.replaceAll(t[0], t[1]);
    })

    cp = cp.replaceAll(/:(?<hold>[_a-zA-Z]{1,}[a-zA-Z0-9]*)/g,(_sub: string, ...args: any[]) => {
        let match = /:(?<hold>[_a-zA-Z]{1,}[a-zA-Z0-9]*)/g.exec(_sub);
        if(match && match.groups && match.groups?.hold) {
            let replacement = `(?<${match.groups?.hold}>.*)`
            return replacement;
        }
        return _sub;
    });
    
    return new RegExp(`^${cp}$`, "gm");
}