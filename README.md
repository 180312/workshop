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
