export class Comentario {
    private id: string; // Adicionado
    private autor: string; // Adicionado, se necessário
    private conteudo: string;
    private data: Date;

    constructor(id: string, conteudo: string, autor: string, data: Date) { // 'id' adicionado
        this.id = id;
        this.conteudo = conteudo;
        this.data = data;
        this.autor = autor;
    }

    public getAutor(): string { // Adicionado
        return this.autor;
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