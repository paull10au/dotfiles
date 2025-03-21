# Add directories to the PATH and prevent to add the same directory multiple times upon shell reload.
append_path() {
  if [ -d "$1" ] && [[ ":$PATH:" != *":$1:"* ]]; then
     PATH="${PATH:+"$PATH:"}$1"
  fi
}

prepend_path() {
  if [ -d "$1" ] && [[ ":$PATH:" != *":$1:"* ]]; then
    # PATH="${PATH:+"$PATH:"}$1"
    PATH="$1${PATH:+":$PATH"}"
  fi
}

remove_path() {
  if [[ "$PATH" == "$1" ]] ; then 
    PATH="" ; 
  fi
  
  PATH=${PATH//":$1:"/":"} # middle
  PATH=${PATH/#"$1:"/} # beginning
  PATH=${PATH/%":$1"/} # end
}


## Higher priority, prepend last

# Brew
eval "$(/opt/homebrew/bin/brew shellenv)"

# Load global Node installed binaries
# prepend_path "$HOME/.node/bin"

# Cumulus CI
prepend_path "$HOME/.local/bin"

# Prioritise Python versions installed by Brew - https://mac.install.guide/python/path
prepend_path "$(brew --prefix python@3.12)/libexec/bin"
#export PATH="$(brew --prefix python@3.13)/libexec/bin:$PATH"
#export PATH="$(brew --prefix python)/libexec/bin:$PATH" # Will return the latest?


# Globally install pipx for a specific python version, ie. 3.12 which was installed with brew
# python3.12 -m pip install --user --break-system-packages pipx
prepend_path "$HOME/Library/Python/3.12/bin"

# pipx shared libraries, ie. venv instance of pip
prepend_path "$HOME/.local/pipx/shared/bin"



# PATH including local Ruby gems, ie Travis
# append_path "/.gem/ruby/3.0.0/bin:/Library/Frameworks/Python.framework/Versions/3.6/bin"
# append_path "/usr/local/opt/ruby/bin"

# Load dotfiles binaries
append_path "$DOTFILES/bin"


# VS Code
append_path "/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
