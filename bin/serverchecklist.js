/* Strict usado para node ser mais rigoroso na compilação do codigo 
causando falha caso houver algum erro */
'use strict';

/* Importando Dependencias que serão usadas */
const app = require ('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');


/* Configurando o server , definindo constantes  e parametros http , req, res, next, post, 
    retornando status code , nome da api e versão*/
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);



/* Definindo porta para o servidor , Chamando a função de erro e do Debbug */ 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('Api Rodando na porta ' + port);

/* função que verificas as portas disponiveis para rodar a api , caso não encontre nenhuma tenta 
 diretamente na 3000 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

/* função para tratamento de erros diversos */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/* função  para attach do debuger */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  