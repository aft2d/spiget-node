# Spiget Api Node implementation

Easily access the spiget api

## Supports

 * Resources
   - Resource List
   - Resource Details
   - Resource Versions
   - Resource Version Download
   - Resource Author
   - New Resources
 * Resource Categories
   - Category List
   - Category Details
   - Category Resources
 * Authors
   - Author List
   - Author Details
   - Author Resources
   - New Authors
 * Searching
   - Resource Search
   - Author Search
   - Ping a server for status


## Usage

### Example

```js
var spiget = require("./spiget.js");


spiget.getResources(100,function(result) {
    for(var i = 0; i < result.length; i++) {
        spiget.getResource(result[i].id, function(resource) {
            console.log(resource);
        });
    }
})
```

## Installation

`npm install spiget-node`

See also https://spiget.org