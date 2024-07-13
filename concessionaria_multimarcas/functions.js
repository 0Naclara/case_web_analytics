const fs = require('fs');
const { database1, database2 } = LerDatabase('broken_database_1.json', 'broken_database_2.json');

const dadosCorrigidos1 = CorrigirValor(database1); // Chama a função para corrigir os nomes de marca e veículo do arquivo 1
const dadosCorrigidos2 = CorrigirValor(database2); // Chama a função para corrigir os nomes de marca e veículo do arquivo 2 

const dadoCorretoVenda1 = ConverterParaInt(dadosCorrigidos1);
const dadoCorretoVenda2 = ConverterParaInt(dadosCorrigidos2);

ExportarArquivoJson(dadoCorretoVenda1, 'database_certa_1.json');
ExportarArquivoJson(dadoCorretoVenda2, 'database_certa_2.json');




function LerDatabase(broken_database_1, broken_database_2) {
    try {
        // Lê os dados dos arquivos e converte os arquivos .json 
        const database1 = JSON.parse(fs.readFileSync(broken_database_1, 'utf8'));
        const database2 = JSON.parse(fs.readFileSync(broken_database_2, 'utf8'));
        // Depois de ler os arquivod da function
        return { database1, database2 };
    } catch (erro) {
        /*Se caso a função nao conseguir ler os arquivos, ele vai imprimir a  mensagem de erro 
        e retornará objetos vazios*/
        console.error('Erro ao ler os arquivos:', erro);
        return { database1: [], database2: [] };
    }
}



// Função para corrigir nomes de marca e veículo
function CorrigirValor(data) {
    try {
        const valor_corrigido = data.map(entry => ({
            ...entry,
            nome: entry.nome ? entry.nome
                .replace(/æ/g, 'a')
                .replace(/ø/g, 'o') : entry.nome,
                marca: entry.marca ? entry.marca
                .replace(/æ/g, 'a')
                .replace(/ø/g, 'o') : entry.marca

       
        }));
        return valor_corrigido;
    } catch (erro) {
        console.error('Erro ao corrigir os nomes dos campos:', erro);
        return [];
    }

}

// Função para corrigir vendas
function ConverterParaInt(data) {
    try {
        const alterar_tipo = data.map(entry => ({
            ...entry,
            vendas: typeof entry.vendas === 'string' ? parseInt(entry.vendas) : entry.vendas
        }));
        return alterar_tipo;
    } catch (erro) {
        console.error('Erro ao alterar formato de vendas para inteiro', erro);
        return [];
    }
}

// Função para exportar o banco de dados corrigido
function ExportarArquivoJson(data, arquivo) {
    try {
        const json = JSON.stringify(data, null, 2);
        fs.writeFileSync(arquivo, json);
        console.log(`Dados corrigidos exportados para ${arquivo}`);
    } catch (erro) {
        console.error('Erro ao exportar', erro);
    }
}


