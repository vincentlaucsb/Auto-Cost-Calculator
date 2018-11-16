export function range(lo: number, hi: number): Array<number> {
    let ret: number[] = [];

    for (let i: number = lo; i < hi; i++) {
        ret.push(i);
    }

    return ret;
}

export function money(dollars: number): string {
    // Given a number, format it with a dollar symbol
    return '$' + dollars.toFixed(2);
}