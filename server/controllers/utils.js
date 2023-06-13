const fs = require('fs');

//crear funcion de lectura
const leerArchivo = (archivo)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(`./db/${archivo}`, 'utf8', (error, data)=>{
            if(error){
                console.log(error);
                reject('Error al leer el archivo pipipi :(')
            }
            resolve(JSON.parse(data));
        })
    })
}

const escribirArchivo = (archivo, data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(`./db/${archivo}`, JSON.stringify(data, null, 4), 'utf8', (error)=>{
            if(error){
                console.log(error);
                reject('Error al ecribir el archivo pipipi :(')
            }
            resolve('El archivo ha sido escrito satisfactoriamente yuju! :D');
        })
    })
}

module.exports = {
    leerArchivo,
    escribirArchivo
}