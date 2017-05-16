export interface IDomNode {
    tag?: string;
    attributes?: { [key: string]: string };
    content?: IDomNode[];
    text?: string;
}
