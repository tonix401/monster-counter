# Monster-Counter
A nice little tool for D&D dungeon masters to manage enemies. It includes autocompletion of official monsters, character sheets, conditions, some small personalisation options and looks neat. :)
![overview](https://ibb.co/bRbCLdWD)
![monster-sheet](https://ibb.co/p68W2mfH)
![autocomplete](https://ibb.co/PZK3W1LP)

# How to use
A manual for non-technical people
## Prerequisites
1. You need to have nodejs installed, it will be responsible for running the "website" on your machine
Download it here: https://nodejs.org/en/download
2. I really recommend having git installed to download the code from GitHub, but it is not technically necessary
Download it here: https://git-scm.com/

##### Downloading with git
- Open a terminal of your choice
- Run `git --version` to see if git is installed properly, this should give you the current version of git
- Use the `cd directory-name` command to go into a folder where you would like the code to be
- Example: Create a folder called "git" under you user, then `cd git`
- Alternatively: open the terminal directly inside that folder
- Now you can to run `git clone https://github.com/tonix401/monster-counter` to download all the code

##### Downloading without git
- To download without git you can use a tool like this: https://danielcregg.github.io/github-folder-downloader/
- Enter this URL: `https://github.com/tonix401/monster-counter`
- Extract the files in some folder of your choosing

## Running this thing
- Open a terminal
- Go into the monster-counter folder using `cd`
- Run `npm run dev` to start the "website"
- If prompted agree to install the serve package, it will run the server for you
- If the terminal looks happy, don't close it! The server will be shutdown when closing the terminal
- Now open `http://localhost:3000/main` in a browser and start managing encounters in style

If you want to get the newest version of this code, you can run `git pull` inside the monster-counter folder any time