export class Comentario {
    private id: string; // Adicionado
    private conteudo: string;
    private data: Date;

    constructor(id: string, conteudo: string, data: Date) { // 'id' adicionado
        this.id = id;
        this.conteudo = conteudo;
        this.data = data;
    }

    public getId(): string { // Adicionado
        return this.id;
    }

    public getConteudo(): string {
        return this.conteudo;
    }

    public getData(): Date {
        return this.data;
    }
}