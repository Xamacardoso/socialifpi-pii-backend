import express, { NextFunction, Request, Response } from 'express';
import { RepositorioDePostagens } from './repository/RepositorioDePostagens';
import { Comentario } from './model/Comentario';
import { Postagem } from './model/Postagem';
import cors from 'cors';
import connectDB from './config/database';

const app = express();
const repositorio = new RepositorioDePostagens();

// Configurações do Express
app.use(express.json());

// Configuração básica do CORS
app.use(cors());

// Povoar o repositório com postagens iniciais
repositorio.listar().then(postagens => {
    if (postagens.length === 0) {
        console.log('Povoando o repositório com postagens iniciais...');
        repositorio.povoar();
    }
});

// Endpoint para raiz
const PATH: string = '/socialifpi/postagem';
const PATH_ID: string = PATH + '/:id';
const PATH_CURTIR = PATH_ID + '/curtir';
const PATH_COMENTARIO = PATH_ID + '/comentario';
const PATH_COMENTARIO_ID = PATH_COMENTARIO + '/:comentarioId';


// Endpoint para listar todas as postagens
app.get(PATH, async (req: Request, res: Response) => {
    try {
        const postagens = await repositorio.listar();
        res.json(postagens);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar postagens'});
    }
});

// Endpoint para consultar uma postagem pelo ID
app.get(PATH_ID, async (req: Request, res: Response) => {
    try {
        const postagem = await repositorio.consultar(req.params.id);
        if (!postagem) {
            return res.status(404).json({ message: 'Postagem não encontrada' });
        }
        res.json(postagem);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao consultar postagem' });
    }
});

// Endpoint para incluir uma nova postagem
app.post(PATH, async (req: Request, res: Response) => {
    try {
        const { titulo, conteudo } = req.body;
        const novaPostagem = new Postagem(0, titulo, conteudo, new Date(), 0);
        const postagemIncluida = await repositorio.incluir(novaPostagem);
        res.status(201).json(postagemIncluida);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao incluir postagem' });
    }
});

// Endpoint para excluir uma postagem pelo ID
app.delete(PATH_ID, async (req: Request, res: Response) => {
    try {
        const postagemExcluida = await repositorio.excluir(req.params.id);
        if (!postagemExcluida) {
            return res.status(404).json({ message: 'Postagem não encontrada' });
        }
        res.json({ message: 'Postagem excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir postagem' });
    }
});

// Endpoint para curtir uma postagem pelo ID
app.post(PATH_CURTIR, async (req: Request, res: Response) => {
    try {
        const postagemCurtida = await repositorio.curtir(req.params.id);
        if (!postagemCurtida) {
            return res.status(404).json({ message: 'Postagem não encontrada' });
        }
        res.json(postagemCurtida);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao curtir postagem' });
    }
});

// Endpoint para adicionar um comentário
app.post(PATH_COMENTARIO, async (req: Request, res: Response) => {
    try {
        // Extrair 'autor' e 'conteudo' do corpo da requisição
        const { autor, conteudo } = req.body;

        // Validação simples para garantir que os dados foram enviados
        if (!autor || !conteudo) {
            return res.status(400).json({ message: 'Autor e conteúdo são obrigatórios.' });
        }

        const novoComentario = new Comentario('', autor, conteudo, new Date());
        const postagemAtualizada = await repositorio.adicionarComentario(req.params.id, novoComentario);
        
        if (!postagemAtualizada) {
            return res.status(404).json({ message: 'Postagem não encontrada' });
        }
        res.json(postagemAtualizada);

    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar comentário' });
    }
});


// Inicializar o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Não encontrado');
});