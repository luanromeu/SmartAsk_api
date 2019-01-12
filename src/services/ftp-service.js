'use strict'

const jsftp = require('jsftp')


const Ftp = new jsftp({
    host: 'imagens.tetsistemas.com.br',
    port: 21,
    user: 'tetsistemas_imagens',
    pass: 'T&TSistemas2007',

})



exports.close = async () => {

    Ftp.raw('quit', (err, data) => {
        if (err) {
            return console.log(err);
        }
        console.log("Fechando Conexão Ftp")
    })
}


exports.CreateDirectory = async (namedir) => {

    Ftp.raw('mkd', '/' + namedir, (err, data) => {

        if (err) {
            console.log(err);

            Ftp.raw('quit', (err, data) => {
                if (err)
                    console.log(err)
                else
                    console.log("Fechando conexão FTP")
            })
        } else {
            console.log(data.text);
            console.log(data.code);

        }
    })
}


exports.SendToServer = async (localfile, remotepath) => {
    
    const Ftp = new jsftp({
        host: 'imagens.tetsistemas.com.br',
        port: 21,
        user: 'tetsistemas_imagens',
        pass: 'T&TSistemas2007',
    
    }) 
    
   await Ftp.put(localfile, remotepath, (err) => {

        if (err) {
            console.log(err)
            Ftp.raw('quit', (err, data) => {

                if (err)
                    console.log(err)
                else
                    console.log("Fechando conexão FTP")
            })
        }
        else
            return console.log('Arquivo Transferido com sucesso', localfile);

    })
}


exports.GetToServer = async (remotepath, localpath) => {


   await Ftp.get(remotepath, localpath, (err) => {

        if (err) {
            console.log(err)
            Ftp.raw('quit', (err, data) => {
                if (err)
                    console.log(err)
                else
                    console.log("Fechando conexão FTP")

            })
        }
        else
            console.log("Arquivo Baixado com Sucesso")

    })
}

