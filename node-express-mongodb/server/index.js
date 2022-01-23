import mongoose from 'mongoose'
import colorConsole from '../lib/color.js'
import app from './app.js'

mongoose
 .connect('mongodb://db:27017/crud-icolabora', {
  useNewUrlParser: true
 })
 .then(result => {
  console.log('MongoDB Conectado');
 })
 .catch(error => {
  console.log(error);
 });

const port = process.env.PORT || 5001

app.listen(port, () => {
 colorConsole('FgWhite', '----------------')
 colorConsole('FgRed', 'Server listening')
 colorConsole('FgWhite', '----------------')
 colorConsole('FgRed', `Porta: ${port}`)
 colorConsole('FgWhite', '----------------')
})

export default app