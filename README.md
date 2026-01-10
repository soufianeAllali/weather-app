                                🌦️ Weather App – Application Météo 

# Description du projet

    Cette application web permet d’afficher la météo en temps réel selon la position géographique de l’utilisateur ou selon une ville choisie.
    Elle propose également une carte mondiale, des prévisions météo, des conseils intelligents générés par l’IA, un arrière-plan dynamique qui change selon le temps, ainsi que des informations supplémentaires sur la ville.

    L’objectif du projet est d’offrir une expérience simple, intuitive et interactive pour consulter la météo rapidement.

# Public cible

    -Utilisateurs grand public
    -Voyageurs
    -Toute personne souhaitant connaître la météo et les prévisions

# Fonctionnalités (Features)

    -Détection automatique de la localisation
    -Carte mondiale interactive
    -Recherche de la météo par ville
    -Affichage de la météo actuelle
    -Prévisions météorologiques
    -Conseils personnalisés selon la météo (IA)
    -Arrière-plan dynamique selon les conditions météo
    -Informations supplémentaires sur la ville

# Technologies utilisées

    -Frontend : React.js
    -APIs : OpenWeatherMap API, OpenAI API
    -Package Manager : npm
    -Autres : HTML, CSS, JavaScript

# Lancer le projet en local

    1️⃣ Cloner le dépôt
    git clone https://github.com/USERNAME/REPOSITORY_NAME.git

    2️⃣ Accéder au dossier du projet
    cd REPOSITORY_NAME

    3️⃣ Installer les dépendances
    npm install

    4️⃣ Démarrer l’application
    npm start

    L’application sera accessible à l’adresse : http://localhost:3000

# APIs utilisées

    Ce projet utilise plusieurs APIs externes :

    -OpenWeatherMap API → Récupération de la météo actuelle et des prévisions météorologiques. (requiert une clé API)
    -Unsplash API → Récupération d’images pour l’arrière-plan et les illustrations. (requiert une clé API)
    -OpenAI API → Génération de conseils personnalisés selon les conditions météo. (requiert une clé API)
    -Wikidata API → Récupération de l’identifiant QVille et informations liées. (pas besoin de clé API)
    -Wikipedia API → Récupération d’informations détaillées sur la ville. (pas besoin de clé API)

    ⚠️ Les clés API (OpenWeatherMap, Unsplash, OpenAI) ne sont pas incluses dans le dépôt GitHub. Chaque utilisateur doit créer ses propres clés et les ajouter dans un fichier .env.
    Exemple de fichier .env
    ## REACT_APP_OPENWEATHER_API_KEY=your_openweather_key
    ## REACT_APP_UNSPLASH_API_KEY=your_unsplash_key
    ## REACT_APP_OPENAI_API_KEY=your_openai_key


# Améliorations futures

    -Mode sombre 🌙
    -Prévisions météo à long terme
    -Support multilingue
    -Sauvegarde des villes favorites

# Remarques

    -Les clés API ne sont jamais partagées sur GitHub
    -L’application peut ne pas fonctionner sans clés API valides
    -Projet réalisé dans un objectif d’apprentissage et d’amélioration continue


# Captures d'écran
   
   -Voici quelques captures de l'application :
   ![Page d'accueil](public/images/img1.jpeg)
   ![Météo d'aujourd'hui](public/images/img1.jpeg)
   ![Informations complémentaires sur la ville](public/images/img1.jpeg)
   ![Prévisions météo](public/images/img1.jpeg)