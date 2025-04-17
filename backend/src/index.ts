import app from './server/Server';

const port = 3333;
app.listen(port, () => {
    console.log('Servidor rodando na porta: '+port);
})