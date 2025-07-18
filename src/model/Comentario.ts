export class Comentario {
    private id: string; 
    private autor: string;
    private conteudo: string;
    private data: Date;

    constructor(id: string, autor: string, conteudo: string, data: Date) {
        this.id = id;
        this.conteudo = conteudo;
        this.data = data;
        this.autor = autor;
    }

    public getAutor(): string {
        return this.autor;
    }

    public getId(): string {
        return this.id;
    }

    public getConteudo(): string {
        return this.conteudo;
    }

    public getData(): Date {
        return this.data;
    }
}