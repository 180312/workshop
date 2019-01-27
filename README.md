# Workshop at Experis 30th of January 2019

During this workshop we will create a simple web application using a javascript library called React.<br>
There will be two possible ways of completing the workshop.

## Path A: Create a simple web application and deploy it online using [GitHub Pages](https://pages.github.com/).

### Goals
* Create a simple web application using React
* Use version control (Git) to manage your project
* Host the webpage using GitHub Pages
* Display information from an external Rest API

### Requirements
* Git installed on you machhine
  * Linux: `sudo apt-get install git`
  * [Mac](https://hackernoon.com/install-git-on-mac-a884f0c9d32c)
  * [Windows](https://hackernoon.com/install-git-on-windows-9acf2a1944f0)
* [GitHub account](https://github.com/join)
* [Node 8.10 or later](https://nodejs.org/en/download/)
* Run “node -v” in your terminal, if it does not return a version number node is not properly installed on your machine.

## Path B: Create a simple web application using [JSFiddle](https://jsfiddle.net).

### Goals
* Create a simple web application using React
* Display information from an external Rest API

If you choose this path skip steps 1 to 5


### Step 1: Bootstrap a React application

Open the terminal and navigate to where you want the project to be.<br>
Run the following commands:<br>
```
npx create-react-app workshop
cd workshop
npm start

```
Go to http://localhost:3000/ to see the sample application

### Step 2: Create a repository on GitHub

Go to [GitHub](https://github.com).<br>
Click your avatar and select **Your repositories** in the dropdown.<br>
Click **New**.<br>
Write `workshop` under **Repository name**<br>
Click **Create repository**<br>
Copy the command under **…or push an existing repository from the command line**


### Step 3: Connect your repository to your project

Open a new terminal window.<br>
Navigate to the project we created.<br>
Copy the command to the terminal.<br>
Or type it, it was:
```
git remote add origin git@github.com:myusername/workshop.git
```
Change the `myusername` part with your GitHub username.<br>
Run:<br>
```
git push -u origin master
```

### Step 4: Configure your application

Open the project in the editor.<br>
Open `package.json` and add the following to line.
```json
"homepage": “https://myusername.github.io/workshop",
```
Change the `myusername` part with your Gitub username.<br>
Under `scripts` add the following two lines.<br>
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
```

### Step 5: Deploy your sample app to GitHub

Go to the terminal.<br>
Run:
```
npm install --save gh-pages
npm run deploy
```

Go to https://myusername.github.io/workshop/.<br>
Change the `myusername` part with your GitHub username.<br>
Give it a minute, your sample application should appear there shortly.

### Step 6: Create a simple component

Go to the editor.<br>
Under `src` create a file called `MovieList.js`.<br>
To begin with let's keep it very simple.<br>

Functions is JavaScript are either done like this:
```javascript
function add(a, b) {
  return a + b;
}
```
Or they can be written like this:
```
const add = (a, b) => {
  return a + b;
}
```
Or if we have a oneliner it can simply be written like this
```
const add = (a, b) => a + b;
```
These are called `Arrow functions` and we will be using them here.<br>


Write:
```javascript
import React from 'react';

const MovieList = () => <div>MovieList</div>;

export default MovieList;

```

Now go to `App.js` and change it so it looks like this:

```javascript
import React from 'react';
import MovieList from './MovieList';

export default () => <div><MovieList /></div>

```
Note: We `export` the `MovieList` function so it can be imported in the `App`.<br>

If you go to http://localhost:3000 you should see that it now only displays `MovieList` in the top left corner.

### Step 7: Fetch information from an external API

We will be using an open [Studio Ghibli API](https://ghibliapi.herokuapp.com/) to supply us with the information we want to display.

I found the API [here](https://github.com/toddmotto/public-apis) listed with a bunch of other open API's.
Open API's are great for practicing if you want to build your own project.
Just be careful so you won't accidentally DDoS the kind souls hosting them.

Under `src` create a new file called `api.js`.<br>

Here we will create two functions.<br>

The first one is a utility function to GET from a Rest API that does not require an authentication.<br>
The function return a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) which is an asynchronous operation.
```javascript
const get = url => fetch(url).then(response => response.json());
```
The second one calls the `get` function with the URL which points to our data.
```javascript
export const getMovieList = () => get('https://ghibliapi.herokuapp.com/films');
```
`api.js` should look like this now:
```javascript
const get = url => fetch(url).then(response => response.json());

export const getMovieList = () => get('https://ghibliapi.herokuapp.com/films');

```

Note: We are only exporting the `getMovieList` function.<br>
We don't need to use the `get` function in another file.<br>

Now we need to do some changes to `MovieList.js`.<br>

First of all we need to change `MovieList` from a `function` to a `class` and create an internal `state` to manage the movie list.
```javascript
import React, {Component} from 'react';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }
}

export default MovieList;

```

We also need to add a [Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html) method that only calls our endpoint when our component is initiated.<br>
The method we need is called [componentDidMount](https://reactjs.org/docs/react-component.html#componentdidmount).<br>

Now lets import the `getMovieList` from `api.js` and call it when `MovieList` is initiated.
After the data is fetched from the API we updated the `movies` state with the information.
```javascript
import React, { Component } from 'react';
import { getMovieList } from './api';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    getMovieList().then(movies => {
      this.setState({ movies })
    })
  }
}

export default MovieList;
```

Now we need to create the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) that is rendered in our browser along with our data.<br>
We add a `render` where we iterate through the list of movies and add them to the DOM.

```javascript
import React, { Component } from 'react';
import { getMovieList } from './api';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    getMovieList().then(movies => {
      this.setState({ movies })
    })
  }

  render() {
    return (
      <div>
        <h1>Ghibli movies</h1>
        <div>
          {this.state.movies.map((movie) => <div key={movie.id} >{movie.title}</div>)}
        </div>
      </div>
    )
  }
}

export default MovieList;

```

This looks pretty good, however I want to make one minor adjustment.<br>
[Destructing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) is a way of unpacking values from objects or arrays.<br>
I want to use it to make the syntax a little cleaner.<br>
It works like this:
```javascript
const a = { b: { c : 'd' } };
const { b } = a; // { c : 'd' }
const { c } = b; // 'd'
```

After a few changes `MovieList.js` should looks like this:
```javascript
import React, { Component } from 'react';
import { getMovieList } from './api';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    getMovieList().then(movies => {
      this.setState({ movies })
    })
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        <h1>Ghibli movies</h1>
        <div>
          {movies.map(({ id, title }) => <div key={id} >{title}</div>)}
        </div>
      </div>
    )
  }
}

export default MovieList;

```

Go to http://localhost:3000 and you should now see a list of movie titles there.

### Step 8: Display the rest of the data in a table

Now lets display the rest of the [data](https://ghibliapi.herokuapp.com/#tag/Films%2Fpaths%2F~1films%2Fget) in a [table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table).<br>

Change `MovieList.js` so it looks like this:
```javascript
import React, { Component } from 'react';
import { getMovieList } from './api';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    getMovieList().then(movies => {
      this.setState({ movies })
    })
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        <h1>Ghibli movies</h1>
        <table>
          <thead>
            <th>Title</th>
            <th>Description</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Release date</th>
            <th>Score (Rotten Tomatos)</th>
          </thead>
          <tbody>
            {movies.map(({ id, title, description, director, producer, release_date, rt_score }) => <tr key={id} >
              <td>{title}</td>
              <td>{description}</td>
              <td>{director}</td>
              <td>{producer}</td>
              <td>{release_date}</td>
              <td>{rt_score}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MovieList;

```

Go to http://localhost:3000 and view the changes.

### Step 9: Add some CSS 💅

Let's give this a minor facelift.<br>
I'm using a color pallette from [here](http://designmadeinjapan.com/magazine/graphic-design/the-rich-colors-of-studio-ghibli/).<br>

Create a new file under `src` called `MovieList.css`.<br>

Add the following css:
```css
.wrapper {
  background: #E68A3E;
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
  border-spacing: 0px;
  width: 100%;
}

th {
  text-align: start;
  padding: 5px;
  color: #443635;
}

td {
  padding: 5px;
  max-width: 700px;
  vertical-align: top;
  color: #443635;
}

tr:nth-child(odd) {
  background: #F9F778;
}

tr:nth-child(even) {
  background: #8EC0E8;
}

h1 {
  color: #443635;
}

```

Go back to `MovieList.js` and import `MovieList.css`
```javascript
import React, { Component } from 'react';
import { getMovieList } from './api';
import './MovieList.css';
```

and add `className="wrapper"` to the the first `div`.<br>
```javascript
return (
  <div className="wrapper">
```

`MovieList.js` should now look like this.

```javascript
import React, { Component } from 'react';
import { getMovieList } from './api';
import './MovieList.css';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    getMovieList().then(movies => {
      this.setState({ movies })
    })
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="wrapper">
        <h1>Ghibli movies</h1>
        <table>
          <thead>
            <th>Title</th>
            <th>Description</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Release date</th>
            <th>Score (Rotten Tomatos)</th>
          </thead>
          <tbody>
            {movies.map(({ id, title, description, director, producer, release_date, rt_score }) => <tr key={id} >
              <td>{title}</td>
              <td>{description}</td>
              <td>{director}</td>
              <td>{producer}</td>
              <td>{release_date}</td>
              <td>{rt_score}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MovieList;

```

Go to http://localhost:3000 and view the changes.

Lets make one minor adjustment. I want the numberic fields to centered so add `className="number"` to the last two fields.
```javascript
<td className="number">{release_date}</td>
<td className="number">{rt_score}</td>
```

Also add this after td in `MovieList.css`
```css
.number {
  text-align: center;
}
```
