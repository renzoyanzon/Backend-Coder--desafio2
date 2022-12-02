const fs = require('fs');

class Contenedor {
    constructor (_nameFile){
        this.ruta= `${_nameFile}.txt`
        
    }

    async save (_obj){
        try{
            const contenidoExistente = await this.getAll();
            const id = contenidoExistente.length >=1 ? contenidoExistente.length +1 :1;
            contenidoExistente.push({id:id,..._obj})
            const data = JSON.stringify(contenidoExistente);
            await fs.promises.writeFile(this.ruta, data)
            return id

        }catch(err){
            console.log('Error al guardar el objeto',err);
        }
    }


    async getAll(){
       try{
            const contenido = await fs.promises.readFile(this.ruta,'utf-8');
            if (contenido == ''){
                let data = [];
                return data
            } else{
                let data = JSON.parse(contenido);
                return data
            }
       }catch(err){
            console.log('No existe archivo en la base de datos',err.message);
       }
        
    }

    async getById (_id){
        try{
            const contenidoExistente = await this.getAll();
            return contenidoExistente.filter(el=> el.id===_id);
        }catch(err){
            console.log('Error en la busqueda mediante Id',err.message);
        }
    }

    async deleteById (_id){
        try{
            const contenidoExistente = await this.getAll();
            const data= JSON.stringify(contenidoExistente.filter(el=>el.id != _id));
            await fs.promises.writeFile(this.ruta,data)

        }catch(err){
            console.log('Error en el proceso de delete by id',err.message);
        }
    }

    async deleteAll (){
        try{
            await fs.promises.writeFile(this.ruta,'');

        }catch(err){
            console.log('Error en el proceso de delete all',err.message);
        }
    }

}

module.exports.Contenedor = Contenedor;