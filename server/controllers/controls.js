//Importaciones
const fs = require('fs');
const { v4: uuid } = require('uuid');
const { leerArchivo, escribirArchivo } = require('./utils.js')

//creamos la clase
class Anime {
    constructor(nombre, genero, año, autor) {
        this.nombre = nombre;
        this.genero = genero;
        this.año = año;
        this.autor = autor;
    }
    async findAll() {
        let data = await leerArchivo('anime.json')
        if (data) {
            return data;
        } else {
            alert("No existen datos en la DB")
        }
    }

    async findById(id) {
        let animes = await this.findAll()
        let animeName = animes.find(anime => anime.nombre.toLowerCase() == id.toLowerCase())
        let animeId = animes.find(anime => anime.id== id)
        if(animeName){
            return animeName
        } else if (animeId) {
            return animeId
        } else {
            return false
        }
    }

    async create() {
        let animes = await this.findAll();

        let newAnime = {
            id: uuid().slice(0, 6),
            nombre: this.nombre,
            genero: this.genero,
            año: this.año,
            autor: this.autor
        }
        animes.push(newAnime);
        await escribirArchivo('anime.json', animes);
        return newAnime
    }

    async delete(id) {
        let animes = await this.findAll()
        animes = animes.filter(anime => anime.id != id);
        escribirArchivo('anime.json', animes);
        return animes
    }

    async update(id) {
        let identificador = id || this.id;
        let animes = await this.findAll();
        let animeAct = animes.find(anime => anime.id == identificador)
        if (animeAct) {
            animeAct.nombre = this.nombre;
            animeAct.genero = this.genero;
            animeAct.año = this.año;
            animeAct.autor = this.autor;
            await escribirArchivo('anime.json', animes);
            return animeAct;
        } else {
            return false
        }
    }
};

module.exports = Anime