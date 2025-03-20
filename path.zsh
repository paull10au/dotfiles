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

## Higher priority, prepend last

# Brew
eval "$(/opt/homebrew/bin/brew shellenv)"

# Load global Node installed binaries
# prepend_path "$HOME/.node/bin"

# Load dotfiles binaries
append_path "$DOTFILES/bin"

# Cumulus CI
prepend_path "$HOME/.local/bin"

# Prioritise Python versions installed by Brew - https://mac.install.guide/python/path
prepend_path "$(brew --prefix python@3.12)/libexec/bin"
#export PATH="$(brew --prefix python@3.13)/libexec/bin:$PATH"
#export PATH="$(brew --prefix python)/libexec/bin:$PATH" # Will return the latest?




# PATH including local Ruby gems, ie Travis
# append_path "/.gem/ruby/3.0.0/bin:/Library/Frameworks/Python.framework/Versions/3.6/bin"
# append_path "/usr/local/opt/ruby/bin"

# VS Code
append_path "/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
