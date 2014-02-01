![jukebox](http://omg.wthax.org/54Ygcm.png)

Requires node.js with express and socket.io installed.

Start with "node server.js"

##Installing

###Ubuntu/Debian

```
sudo apt-get install nodejs npm git
sudo npm install express
sudo npm install socket.io
git clone https://github.com/atmosfar/tf2webGL.git
cd tf2webGL  
node server.js
```

###Mac OS X
Assumes you use [Homebrew](http://brew.sh/). If not, use the [node.js installer](http://nodejs.org/download/) and skip the first command.
```
brew install nodejs
npm install express
npm install socket.io
git clone https://github.com/atmosfar/tf2webGL.git
cd tf2webGL  
node server.js
```

###Windows
[Install](http://nodejs.org/download/) node.js.  
Install express and socket.io through Node Package Manager (npm).  
[Install](http://git-scm.com/downloads) git.  
Complete the final three steps above in Git Bash.  

##Caveats:
Does not work with TF2 running at the same time (CLRBrowserSourcePlugin3 - Chromium 31 base)
