const app = require('./server');
const bodyParser = require('body-parser');
const cors = require('cors');

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());

// API ROUTES
const postagemRouter = require('./routes/postagem.routes');
app.use('/api', postagemRouter);