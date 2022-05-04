require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require("path");
const limiter = require("./config/rateLimit");

// Inclusion des relations de la base de données
require("./models/relations");

// Récupération des routes de l'api
const routes = require("./routes");

// Configuration du server
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

// Le dossier uploads est rendu static pour pouvoir acceder aux images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Utilisation des routes dans l'application
app.use("/api", routes);

// Lancement du serveur
app.listen(3200, () => console.log(`Listening on port 3200`));
