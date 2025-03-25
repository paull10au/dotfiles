
# Playwright
alias installplaywright='npx playwright install'
alias initplaywright='npm init playwright@latest'

# Cumulus CI / CCI
alias cciv='cci version'
alias cciversion=cciv

# Update Dev Tools
# Error: Permission denied @ apply2files - /usr/local/lib/docker/cli-plugins
	# https://github.com/Homebrew/homebrew-core/issues/45009#issuecomment-543795948
		# sudo chown -R $(whoami):admin /usr/local/* && sudo chmod -R g+rwx /usr/local/*

alias updatebrew='brew update && brew upgrade'
alias cleanupbrew='brew cleanup'
#alias updatesfdx='sfdx update'
#alias updatesf='sf update'
alias updatesf='npm update --global @salesforce/cli' # March 18 2024
# alias updateheroku='heroku update'
alias updateheroku='brew upgrade heroku'
alias updatetools='updatebrew && updatesf && updateheroku && cciversion'
alias updateall='updatetools'


# GH Cli
# alias installgh='brew install gh'
alias authgithub_read='gh auth login --hostname github.com --web --scopes read:packages'
alias ghorglist='gh org list'

# Docker
alias dockerauthgh='echo $(gh auth token) | docker login ghcr.io -u paull10au_sfemu --password-stdin'
alias dockerbaseemu='docker pull ghcr.io/sfdc-qbranch-emu/qbrix-base-container-quasar:latest'
# alias dockerbase='docker pull ghcr.io/sfdc-qbranch/qbrix-base-container-quasar:latest'
alias dockerbase='docker pull ghcr.io/sfdc-qbranch-emu/qbrix-base-container-quasar:latest'

# Shortcuts
alias path='tr ":" "\n" <<< "$PATH"'
alias bashprofile="code $DOTFILES/.bash_profile"
alias bashrc="code $DOTFILES/.bashrc"
alias rbashprofile="source $DOTFILES/.bash_profile"
alias rbashrc="source $DOTFILES/.bashrc"
alias r=rbashprofile
alias rz="source $DOTFILES/.zshrc"
# alias rz="omz reload"
alias ..="cd .."
alias ll="ls -l"
alias lsa="ls -al"
alias c='clear'
alias p='pwd'
alias speedtest='networkquality'
alias activity='top -o rsize'


# alias copyssh="pbcopy < $HOME/.ssh/id_ed25519.pub"
alias reloaddns="dscacheutil -flushcache && sudo killall -HUP mDNSResponder"
alias ll="/opt/homebrew/opt/coreutils/libexec/gnubin/ls -AhlFo --color --group-directories-first"
# alias ij='open -a /Applications/IntelliJ IDEA.app "`pwd`"'
alias ij='open -a "/Applications/IntelliJ IDEA.app"'
alias shrug="echo '¯\_(ツ)_/¯' | pbcopy"
# alias compile="commit 'compile'"
# alias version="commit 'version'"

# Directories
alias dotfiles="cd $DOTFILES"
alias library="cd $HOME/Library"
alias paull="cd $HOME/Paull"

# Frequently used directories - Defined in fig dotfile aliases
alias qbranch="cd $HOME/Paull/Q\ Branch/Q\ Brix/"
alias qbrix="cd $HOME/Paull/Q\ Branch"
alias emu="cd $HOME/Paull/Q\ Branch/Q\ Brix/emu"
alias qtools="cd ~/Paull/Q\ Branch/Q\ Tools"

# JS
alias nfresh="rm -rf node_modules/ package-lock.json && npm install"
alias watch="npm run dev"

# Git
alias gs="git status"
alias gb="git branch"
alias gc="git checkout"
alias gl="git log --oneline --decorate --color"
alias amend="git add . && git commit --amend --no-edit"
alias commit="git add . && git commit -m"
alias diff="git diff"
alias force="git push --force-with-lease"
alias nuke="git clean -df && git reset --hard"
alias pop="git stash pop"
alias prune="git fetch --prune"
alias pull="git pull"
alias push="git push"
alias resolve="git add . && git commit --no-edit"
alias stash="git stash -u"
alias unstage="git restore --staged ."
alias wip="commit wip"


# *** Recreate CumulusCI Pipx Environment from scratch
alias deletecci='delete  ~/.local/pipx/venvs/cumulusci'
# alias installcci='pip3 install cumulusci'
# alias installcci='pipx install cumulusci' # *** Installs in  ~/.local/pipx/venvs but we are using the q brix version above
# alias pipxcciqsr='pipx install "cumulusci @ git+https://github.com/sfdc-qbranch-emu/CumulusCI.git@quasar" --force' #  install location is ~/.local/pipx/venvs
alias pipxcciqsr="pipx install --python python3.12 'cumulusci @ git+https://github.com/sfdc-qbranch-emu/cumulusci.git@quasar'"
alias activatecci='source ~/.local/pipx/venvs/cumulusci/bin/activate'
alias deactivatecci='deactivate'
alias installqxcli='activatecci && python3 -m pip install "qbrix-cli @ git+https://github.com/sfdc-qbranch-emu/qbrix_cli.git@main"' # pip install into pipx venv
alias updateprotobuf='python3 -m pip install protobuf==5.28.1 --force --no-deps' # may need to run the command, not the alias
alias initrfbrowser='rfbrowser init' # [ ERROR ] Error in file '/Users/plucas/.local/pipx/venvs/cumulusci/lib/python3.12/site-packages/qx/qrobot/keywords/QRobot.resource' on line 3: Initializing library 'Browser' with no arguments failed: Could not find node dependencies in installation directory `/Users/plucas/.local/pipx/venvs/cumulusci/lib/python3.12/site-packages/Browser/wrapper.` Run `rfbrowser init` to install the dependencies.


#If you’ve installed a major new version of Python—e.g., you already have Python 3.10 and you now install Python 3.11 
#alongside it—you’ll need to create a new virtual environment that specifically uses the new major point version. 
#Do not attempt to upgrade an existing virtual environment to a higher major point version of Python.

    # *** I'm on mac, and homebrew upgrades my python all the time. All my pipx packages are easily fixed when this happens by:
    # - pipx reinstall-all

alias upgradeccienv='deactivatecci && python3 -m venv ~/.local/pipx/venvs/cumulusci/bin/activate --upgrade'
alias uninstallcci='pipx uninstall cumulusci'
# alias reinstallcci='pipx reinstall cumulusci'
alias updatecci='pipx upgrade cumulusci'
alias reinstallcci='uninstallcci && pipxcciqsr'


# Python
# alias python=python3
#alias python=python3.12
alias allpython='which -a python3'
alias upgradepip='python3.12 -m pip install --upgrade pip'
alias updatepip='upgradepip'
alias updateproto='python3 -m pip install protobuf==5.28.1 --force --no-deps'

# Error in file '/Users/plucas/Paull/Q Branch/Q Brix/emu/DemoBrix-6-xDO-DataCloud-MultiOrg-Home/.cci/projects/QBrix-6-SDO-DataCloud-PostSpin/robot/DataCloudRobot.robot' on line 3: Importing library '/Users/plucas/Paull/Q Branch/Q Brix/emu/DemoBrix-6-xDO-DataCloud-MultiOrg-Home/.cci/projects/QBrix-6-SDO-DataCloud-PostSpin/robot/DataCloudRobot.py' failed: ModuleNotFoundError: No module named 'Browser'
alias installbrowser='cci robot install_playwright'
alias installpandas='pip install pandas'
alias installpandasql='pip install -U pandasql'
alias installccidependencies='pip install --upgrade pandas pandasql robotframework-browser'

# Pip
alias listpip='pip list'

# Pipx
alias listpipx='pipx list'
alias upgradepipx='brew update && brew upgrade pipx'
alias newvenv='python3 -m venv /Users/plucas/.local/pipx/venvs/xxx' # or you can specify the version of python you want installed in this venv

# QX
## Run activatecci before installing
alias upgradegcm='brew upgrade --cask git-credential-manager'
alias installqx='activatecci && python3 -m pip install "qbrix-cli @ git+https://github.com/sfdc-qbranch-emu/qbrix_cli.git@main"'
alias updateqx='qx update --include_extensions False'
alias qxupdate='qx update --include_extensions False'

# Robot Framework Browser
alias initbrowser='rfbrowser init'
