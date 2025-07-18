import { Postagem } from '../model/Postagem';
import { Comentario } from '../model/Comentario';
import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface do documento de comentario (Para o Mongoose)
interface IComentario extends Document {
    conteudo: string;
    data: Date;
}

// Definição do schema de comentario
const ComentarioSchema: Schema = new Schema({
    conteudo: { type: String, required: true },
    autor: { type: String, required: true },
    data: { type: Date, required: true, default: Date.now }
});

// Interface para a postagem (Para o Mongoose)
interface IPostagem extends Document {
    titulo: string;
    conteudo: string;
    data: Date;
    curtidas: number;
    comentarios: IComentario[];
}

const PostagemSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    conteudo: { type: String, required: true },
    data: { type: Date, required: true, default: Date.now },
    curtidas: { type: Number, default: 0 },
    comentarios: [ComentarioSchema]
});

// Criar o modelo do Mongoose para Postagem
const PostagemModel: Model<IPostagem> = mongoose.model<IPostagem>('Postagem', PostagemSchema);

export class RepositorioDePostagens {
    // Método para incluir uma nova postagem
    public async incluir(postagem: Postagem): Promise<IPostagem> {
        const novaPostagem = new PostagemModel({
            titulo: postagem.getTitulo(),
            conteudo: postagem.getConteudo(),
            data: postagem.getData(),
            curtidas: postagem.getCurtidas(),
            comentarios: postagem.getComentarios()
        });
        return await novaPostagem.save();
    }

    // Método para alterar uma postagem existente
    public async alterar(id: string, titulo: string, conteudo: string): Promise<IPostagem | null> {
        return await PostagemModel.findByIdAndUpdate(id, { titulo, conteudo }, { new: true });
    }

    // Método para consultar uma postagem pelo ID
    public async consultar(id: string): Promise<IPostagem | null> {
        return await PostagemModel.findById(id);
    }

    // Método para excluir uma postagem pelo ID
    public async excluir(id: string): Promise<IPostagem | null> {
        return await PostagemModel.findByIdAndDelete(id);
    }

    // Método para curtir uma postagem pelo ID
    public async curtir(id: string): Promise<IPostagem | null> {
        return await PostagemModel.findByIdAndUpdate(id, { $inc: { curtidas: 1 } }, { new: true });
    }

    // Método para adicionar um comentário a uma postagem
    public async adicionarComentario(id: string, comentario: Comentario): Promise<IPostagem | null> {
        const novoComentario = {
            _id: new mongoose.Types.ObjectId(), // Garante um novo ID
            autor: comentario.getAutor(),
            conteudo: comentario.getConteudo(),
            data: comentario.getData()
        };
        return await PostagemModel.findByIdAndUpdate(
            id,
            { $push: { comentarios: novoComentario } },
            { new: true }
        );
    }

    // método para excluir um comentário de uma postagem
    public async excluirComentario(postId: string, comentarioId: string): Promise<IPostagem | null> {
        return await PostagemModel.findByIdAndUpdate(
            postId,
            { $pull: { comentarios: { _id: comentarioId } } },
            { new: true }
        );
    }

    // Método para listar todas as postagens
    public async listar(): Promise<IPostagem[]> {
        return await PostagemModel.find().sort({ data: -1 });
    }

    // Corrigido: método gerarDataAleatoria não existe, então vamos criar uma função local para gerar datas aleatórias
    public async povoar(): Promise<void> {
        function gerarDataAleatoria(): Date {
            // Gera uma data aleatória nos últimos 365 dias
            const hoje = new Date();
            const diasAtras = Math.floor(Math.random() * 365);
            const dataAleatoria = new Date(hoje);
            dataAleatoria.setDate(hoje.getDate() - diasAtras);
            return dataAleatoria;
        }

        console.log('[POVOAMENTO] Limpando base de dados...');
        await PostagemModel.deleteMany({});

        console.log('[POVOAMENTO] Inserindo postagens iniciais...');
        
        // Criação de postagens iniciais com conteúdo variado
        const postagensIniciais: Postagem[] = [
            new Postagem(
                1,
                'A Importância da Educação',
                'A educação é a base para uma sociedade mais justa e equitativa. ' +
                'Ela promove o desenvolvimento individual e coletivo, ' +
                'permitindo que pessoas realizem seu potencial. ' +
                'Investir em educação é investir no futuro de todos nós.',
                gerarDataAleatoria(),
                10
            ),
            new Postagem(
                2,
                'Tecnologia e Inovação',
                'Vivemos em uma era onde a tecnologia avança a passos largos. ' +
                'Inovações constantes estão mudando a forma como vivemos, trabalhamos e nos comunicamos. ' +
                'É essencial acompanhar essas mudanças para não ficarmos para trás. ' +
                'A tecnologia tem o poder de transformar o mundo em que vivemos.',
                gerarDataAleatoria(),
                15
            ),
            new Postagem(
                3,
                'Sustentabilidade Ambiental',
                'Preservar o meio ambiente é crucial para o futuro das próximas gerações. ' +
                'Cada ação nossa tem um impacto, e precisamos ser conscientes das nossas escolhas. ' +
                'A sustentabilidade não é uma opção, mas uma necessidade urgente. ' +
                'Devemos agir agora para garantir um planeta habitável no futuro.',
                gerarDataAleatoria(),
                20
            ),
            new Postagem(
                4,
                'Saúde e Bem-Estar',
                'Manter o bem-estar físico e mental é essencial para uma vida equilibrada. ' +
                'O cuidado com a saúde deve ser uma prioridade diária. ' +
                'Pequenos hábitos saudáveis podem fazer uma grande diferença a longo prazo. ' +
                'Não negligencie seu bem-estar, ele é a chave para uma vida plena.',
                gerarDataAleatoria(),
                8
            ),    
            new Postagem(
                5,
                'Economia Digital',
                'A transformação digital está mudando a maneira como fazemos negócios. ' +
                'Empresas que não se adaptam a essa nova realidade correm o risco de ficar obsoletas. ' +
                'A digitalização não é apenas uma tendência, mas uma necessidade para a sobrevivência no mercado. ' +
                'O futuro é digital, e devemos nos preparar para ele.',
                gerarDataAleatoria(),
                12
            ),
            new Postagem(
                6,
                'Impacto das Redes Sociais',
                'As redes sociais têm um papel central na comunicação moderna. ' +
                'Elas conectam pessoas em todo o mundo, criando novas formas de interação. ' +
                'No entanto, também trazem desafios, como a disseminação de informações falsas. ' +
                'É crucial usar essas ferramentas de forma responsável e consciente.',
                gerarDataAleatoria(),
                7
            ),
            new Postagem(
                7,
                'Mobilidade Urbana',
                'Soluções de mobilidade inteligente são o futuro das grandes cidades. ' +
                'O crescimento populacional exige novas abordagens para o transporte urbano. ' +
                'A integração de tecnologia no transporte pode melhorar a qualidade de vida nas cidades. ' +
                'Investir em mobilidade sustentável é essencial para um futuro melhor.',
                gerarDataAleatoria(),
                9
            )
        ]

        for (const post of postagensIniciais) {
            await this.incluir(post);
        }

        console.log('[POVOAMENTO] Postagens iniciais inseridas com sucesso!');
    }

}