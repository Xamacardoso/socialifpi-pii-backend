import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Esta é a "string de conexão". Aponta para o banco de dados.
const MONGO_URI = process.env.MONGO_URI!;

const connectDB = async () => {
    try {
        // Tenta se conectar ao banco de dados
        await mongoose.connect(MONGO_URI);
        console.log('✅ Sucesso: Conectado ao MongoDB!');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error);
        // Se a conexão com o banco de dados falhar, a aplicação não deve continuar.
        // Por isso, encerramos o processo.
        process.exit(1);
    }
};

export default connectDB;