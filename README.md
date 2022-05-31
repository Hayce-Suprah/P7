# Projet

Projet 7 du parcours Web d'Openclassrooms par Nicolas Maffar.
Le projet 7 est un blog composé de deux parties, la partie Front et la partie API.

## Contenu du projet

Le projet s'articule autour de 3 dossiers.

- API : Contient la partie serveur de l'application et la liaison à la base de données.

- Front : Contient la partie front (visuel) de l'application

- Database : Contient deux fichiers SQL à importer dans la base de données, permettant ainsi d'avoir des données de tests minimum.

## Installation

Pour installer le projet, il vous faudra déjà le cloner sur votre ordinateur. Pour cela, il suffit de taper la commande 
`git clone https://github.com/Hayce-Suprah/P7.git`

Une fois la commande tapée, le projet est cloné sur votre ordinateur et il ne reste plus qu'à installer les différentes parties du projet.
L'installation du projet va ce dérouler en 2 phases, à savoir l'API puis le front.

### L'API et la base de données
L'API du projet se trouve dans le dossier `/API`. 
Dans un premier temps, il faudra ce rendre dans ce dossier et installer les différentes dépendances nécessaire à son bon fonctionnement. 
`cd /API && npm install`

Ensuite, il faudra dupliquer le fichier `.env.local` et le renommer en `.env`.
Ce fichier contient les différentes variables d'environnement nécessaire au fonctionnement de l'API : 

````
DB_NAME=
DB_PORT=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
JWT_TOKEN=
````
La valeur à remplir dans le JWT_TOKEN est une chaine de caratère quelconque, "azerty" par exemple.
Pour remplir les autres valeurs, il faudra au préalable que vous aillez installé un SGBD comme MySQL.
Le but est de créer une base de données avec le nom de votre choix et d'entrer les informations de connexion dans le fichier .env.

Par exemple : 
````
DB_NAME=projet7
DB_PORT=3306
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=root
JWT_TOKEN=unephrasesecrete
````

Une fois le fichier .env rempli, vous pouvez lancer l'API avec la commande 
`npm run start`
Les différentes tables de la base de données vont se créer automatiquement et le serveur d'API se lance sur le port 3200. 

### Inclure les fichiers de tests de base de données
Pour avoir des données minimums dans votre base de données, un dossier a été préparé pour vous. Il se situe dans le à la racine du projet `/database`.
Ce dossier contient deux fichiers SQL : 
- categories.sql ---> Contient les catégories des articles
- users.sql ---> Contient les différents utilisateurs de la base de données

Il faudra inclure les deux fichiers dans la nouvelle base de données que vous venez de créer, dans la table `users` et `categories`.

### Installer le front
Le front du projet ce trouve dans le dossier `/front`. 
Pour installer les différentes dépendances, il faudra entrer la commande 
`cd /front && npm install`

Ensuite, entrer la commande `npm run start` pour lancer la partie front. Une fenêtre devrait s'ouvrir avec l'application qui se lance. 


## A savoir
Pour les comptes utilisateurs, vous pouvez vous connecter avec différents comptes qui sont déjà dans la base de données : 
````
Utilisateur simple
Email = john.do@gmail.com
Mot de passe = user

Admin
Email = admin@admin.com
Mot de passe = user
````
Vous pouvez également créer votre propre compte.
