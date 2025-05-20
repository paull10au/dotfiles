/* Examples:
Use grep with two arguments to find inherited or direct properties of an object:
> grep(document, 'get') // see all properties case insensitively matching *get*:
{ getCSSCanvasContext: function getCSSCanvasContext() { [native code] }
, getElementById: function getElementById() { [native code] }
, getElementsByClassName: function getElementsByClassName() { [native code] }
, getElementsByName: function getElementsByName() { [native code] }
, getElementsByTagName: function getElementsByTagName() { [native code] }
, getElementsByTagNameNS: function getElementsByTagNameNS() { [native code] }
, getOverrideStyle: function getOverrideStyle() { [native code] }
, getSelection: function getSelection() { [native code] }
}
To narrow it down to direct properties only, instead use grep.own:
> grep.own(document, /^a/) // see just all direct properties starting with 'a':
{ activeElement: body
, alinkColor: ""
, all: HTMLAllCollection[168]
, anchors: HTMLCollection[0]
, applets: HTMLCollection[0]
}
You can also grep through nested object structures to the N:th level:
> grep(window, /^on/, 1) // shows all "on*" properties of window and window[*]:
{ applicationCache:
  { oncached: null
  , onchecking: null
  , ondownloading: null
  , ...
  }
, clientInformation:
  { onLine: true
  }
, document:
  { onabort: null
  , ...
  }
, ...
}
*/

function grep(obj, regexp, depth, own_only) {
  if (arguments.length < 2)
    throw new Error('Need both an object and a search string/regexp!');

  if (typeof regexp !== 'object' && typeof regexp.test !== 'function')
    regexp = new RegExp(regexp, 'i');

  depth = depth || 0;

  var hits = {}
    , next = []
    , found, keys, name, what;

  try {
    keys = Object.getOwnPropertyNames(obj); // both enumerables and not
    if (!own_only)
      for (name in obj)
        if (keys.indexOf(name) === -1)
          keys.push(name);
  } catch(e) {
    return undefined; // can typically only grab these from objects / functions
  }

  while ((name = keys.shift()) !== undefined) {
    if (regexp.test(name)) {
      hits[name] = obj[name];
      found = true;
    }
    else if (depth && typeof obj[name] === 'object')
      next.push(name);
  }

  while ((name = next.shift()) !== undefined)
    if ((what = grep(obj[name], regexp, depth - 1, own_only)) !== undefined) {
      hits[name] = what;
      found = true;
    }

  return found ? hits : undefined;
}
grep.own = function(obj, regexp, depth) {
  return grep(obj, regexp, depth, !!'own_only');
};