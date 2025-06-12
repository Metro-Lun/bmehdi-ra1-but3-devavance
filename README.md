# bmehdi-ra1-but3-devavance
R6.A.05 Dev avancé - TP4

Mehdi BOURBON - BUT3 RA1


# Lancement du projet

Lancez `npm install` à la racine du projet.

En cas de problème, les paquets à installer manuellement sont :
- `jsonwebtoken`
- `cookie-parser`
- `bcrypt`
- `crypto`

Créez un fichier `.env` à la racine du projet, contenant les champs suivants :

- `DATABASE`= le lien vers votre base de données. Il est à noter que ce projet n'utilise pas de base de données locale, donc le mot de passe est de mon côté directement dans l'URL.
- `PORT`=3000
- `ADMIN_PASSWORD`= un mot de passe (à vous de le choisir - voir ci-dessous)
- `SECRET_KEY`= le résultat de la commande `node secret.js`

Concernant `ADMIN_PASSWORD` : puisque la création d'un utilisateur admin requiert un autre admin, le lancement de l'application crée automatiquement un admin :

```js
name: "admin",
email: "admin@node.js",
password: // le mot de passe que vous avez défini,
role: "admin"
```

Le mot de passe est évidemment chiffré avant d'être introduit dans la base.

# Routes

## /api/v1/users/signup

### - POST /api/v1/users/signup

Permet de créer un utilisateur soi-même.

Le corps de la requête doit contenir un objet JSON avec quatre attributs :
- `name` (obligatoire)
- `email` (obligatoire, unique)
- `password` (obligatoire, doit faire 8 caractères ou plus : vous pouvez tester !)
- `role` (facultatif, mais doit être soit `user`, `moderator` ou `admin` et sera mis à `user` si non renseigné)

## /api/v1/users/login

### - POST /api/v1/users/login

Permet de se connecter.
Cette requête renvoie un token sous forme de cookie, qui dure 24h. Ce token sera utilisé pour vérifier le rôle de l'utilisateur connecté dans les autres requêtes.

Le corps de la requête doit contenir :
- `email` (sinon, impossible de se connecter)
- `password` (le mot de passe __non chiffré__)

## /api/v1/users

### - GET /api/v1/users/

**Cette route est protégée. Il faut être admin ou modérateur.**

Renvoie l'ensemble des utilisateurs.
Il n'y a rien à passer en paramètre.

### - POST /api/v1/users/

**Cette route est protégée. Il faut être admin ou modérateur.**

Permet d'ajouter un utilisateur.

Le corps de la requête doit contenir un objet JSON avec quatre attributs :
- `name` (obligatoire)
- `email` (obligatoire, unique)
- `password` (obligatoire, doit faire 8 caractères ou plus : vous pouvez tester !)
- `role` (facultatif, mais doit être soit `user`, `moderator` ou `admin` et sera mis à `user` si non renseigné)

**NOTE** : pour créer un admin, l'utilisateur connecté doit être un admin.

## /api/v1/users/:id

Comme indiqué dans cette URL, l'ID doit être passé en paramètre de la requête.

### - GET /api/v1/users/:id

**Cette route est protégée. Il faut être admin ou modérateur.**

Renvoie l'utilisateur comportant cet ID.

### - PUT /api/v1/users/:id

**Cette route est protégée. Il faut être admin ou modérateur.**

Modifie les données d'un utilisateur.
Les données à changer doivent être passées dans le corps de la requête.

### - DELETE /api/v1/users/:id

**Cette route est protégée. Il faut être admin ou modérateur.**

Supprime un utilisateur.

## /api/v1/tours

### - GET /api/v1/tours/

Permet de récupérer tous les tours.

### - POST /api/v1/tours/

**Cette route est protégée. Il faut être admin ou modérateur.**

Crée un tour.
Il faut passer dans le corps de la requête un objet JSON contenant au minimum :
- `name` (unique, string)
- `duration` (number)
- `maxGroupSize` (number)
- `difficulty` (string)
- `price` (number)
- `summary` (string)
- `description` (string)
- `imageCover` (string)

## /api/v1/tours/:id

Comme indiqué dans cette URL, l'ID doit être passé en paramètre de la requête.

### - GET /api/v1/tours/

Renvoie le tour comportant l'ID correspondant.

### - PUT /api/v1/tours/

**Cette route est protégée. Il faut être admin ou modérateur.**

Modifie le tour avec l'id correspondant.

Les données à modifier doivent être passées dans le corps de la requête.

### - DELETE /api/v1/tours/

**Cette route est protégée. Il faut être admin ou modérateur.**

Supprime le tour comportant l'ID correspondant.

## /api/v1/tours/filter

### - GET /api/v1/tours/filter

Permet de filtrer les tours selon ce qui est passé dans l'attribut `params` de la requête.

Ce filtre peut être :
- `limit` (nombre entier) 
- `sort` (un champ du tour, si ce champ existe) 
- `fields` (string)

## /api/v1/tours/top-5-cheap

### - GET /api/v1/tours/top-5-cheap

Renvoie les 5 tours les moins chers.

## /api/v1/tours/tour-stats

### - GET /api/v1/tours/tour-stats

Renvoie différentes statistiques sur l'ensemble des tours.




