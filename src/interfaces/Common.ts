export interface Dictionary {
    [key: string]: object | string | boolean | Dictionary;
}