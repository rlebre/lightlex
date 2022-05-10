<img src="https://github.com/rlebre/lightlex/blob/main/public/images/lightlex.png" alt="logo" width="650"/>

# Lightlex

This app was created using LightningJS. It is a proof of concept to explore the LightningJS SDK and Core features, as Routing, Texture loading, Animations, Transitions, Shapes, and more.

#### Pre requisites
Make sure you create a `.env` file containing your [TMDB](https://www.themoviedb.org/) api key or, alternatively, provide it in the API_KEY environment variable. Example of the `.env` file:

```bash
API_KEY=8e88asdsad89asua
```

More information about how to get the TMDB api key [here](https://www.themoviedb.org/settings/api).

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the webpack by runnning `npm run build`

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

#### Developing the App

During development you can use the **watcher** functionality of webpack.

```bash
npm run dev
```

