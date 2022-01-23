import mongoose from 'mongoose'
const { Schema } = mongoose

const campoSchema = new Schema({
 label: {
  type: String,
  required: true
 },
 id_campo: {
  type: String,
  require: false
 },
 tipo_campo: {
  type: String,
  require: true
 },
 dados_campo: {
  type: Array,
  require: true
 }
});

export default mongoose.model('campo', campoSchema)
