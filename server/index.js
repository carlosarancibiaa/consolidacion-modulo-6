//importaciones
const app = require('./app');
const Anime = require('./controllers/controls');
const PORT = 3000;

let server = app.listen(PORT, () => {
    console.log('Servidor escuchando en puerto:' + PORT);
});

//------------------------------------------------------Rutas vistas
//inicio
app.get(['/', '/home'], (req, res) => {
    res.render('home');
});
//acerca
app.get('/about', (req, res) => {
    res.render('about');
});
//Animess
app.get('/animes', async (req, res) => {
    try {
        let listaAnimes = new Anime
        let final = await listaAnimes.findAll();
        res.status(200).render('allAnimes', {
            target: final
        });
    } catch (error) {
        res.status(200).render('allAnimes', {
            error
        })
    }
});
//Animes por ID
app.get('/anime/:id', async (req, res) => {
    try {
        let { id } = req.params
        // let id = req.params.id -->esto es equivalente a la linea anterior que es una deconstruccion del objeto req.params que contiene el valor del atriuto id
        let animePorId = new Anime;
        let final = await animePorId.findById(id);
        res.status(200).render('anime', {
            target: [final]
        })
    } catch (error) {
        res.render('anime', {
            error
        })
    }
})
//Animes por nombre
app.get('/animes/:nombre', async (req, res) => {
    try {
        let { nombre } = req.params
        let nuevaInstancia = new Anime //creamos una nueva instancia de la clase Anime para utilizar su metodo 'findByName()' y así obtener el objeto anime deseado
        let animePorNombre = await nuevaInstancia.findByName(nombre);//guardamos en la variable animePorNombre lo retornado por el metodo findByName
        res.render('anime', {
            target: [animePorNombre]
        })
    } catch (error) {
        res.render('anime', {
            error
        })
    }
});

//-----------------------------------------------ENDPOINTS
//Crear
app.post('/animes', async (req, res) => {
    try {
        let { nombre, genero, año, autor } = req.body;
        let newAnime = new Anime(nombre, genero, año, autor);
        let respuesta = await newAnime.create();
        res.status(201).send({
            code: 201,
            message: respuesta
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: 'error al crear anime.'
        })
    }
});

//Actualizar
app.put('/animes', async (req, res) => {
    try {
        let { id, nombre, genero, año, autor } = req.body;
        let newAnime = new Anime(nombre, genero, año, autor);
        let respuesta = await newAnime.update(id);
        if (respuesta) {
            res.status(200).send({ code: 200, message: 'Modificadooooo!' })
        } else {
            res.status(500).send({
                code: 500,
                message: 'Error (;´༎ຶД༎ຶ`)'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error al actualizar el anime'
        })
    }
})

//eliminar
app.delete('/animes/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let eliminado = new Anime;
        await eliminado.delete(id);
        res.status(200).send({
            message: 'Eliminado con exito',
            code: 200
        })
    } catch (error) {
        res.status(500).send({
            message: error,
            code: 500
        })
    }
});

//rutas no existente
app.all("*", (req, res) => {
    res.status(200).send(`Ruta ${req.method} no encontrada.`);
});

module.exports = server;