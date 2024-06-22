const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 4000;
const uploadDir = path.join(__dirname, 'uploads')
// Configuración de Multer para almacenar los archivos en disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


//middleware para hacer publica la carpeta uploads
app.use('/uploads', express.static(uploadDir));

// Ruta para subir un archivo
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.send('Archivo subido correctamente');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
