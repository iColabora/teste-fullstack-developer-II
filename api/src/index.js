const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const Install = require('./install/Install');
app.get("/install/db-tables", Install.dbTables);
app.get("/install/db-populate", Install.dbPopulate);


const Form = require('./controllers/Form');
app.get("/form", Form.get);
app.get("/form/:id", Form.getById);
app.post("/form", Form.post);
app.put("/form", Form.put);
app.delete("/form/:id", Form.delete);

const FormField = require('./controllers/FormField');
app.get("/form_field", FormField.get);
app.get("/form_field/:id", FormField.getById);
app.post("/form_field", FormField.post);
app.put("/form_field", FormField.put);
app.delete("/form_field/:id", FormField.delete);

const FormFieldOption = require('./controllers/FormFieldOption');
app.get("/form_field_option", FormFieldOption.get);
app.get("/form_field_option/:id", FormFieldOption.getById);
app.post("/form_field_option", FormFieldOption.post);
app.put("/form_field_option", FormFieldOption.put);
app.delete("/form_field_option/:id", FormFieldOption.delete);

app.listen(process.env.PORT || 3000, '0.0.0.0', ()=> {
    console.log("Listening on port 3000");
});