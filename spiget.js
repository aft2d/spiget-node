var http = require('http');
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback callback
 * @param {object|string} result - Result of the request
 */


module.exports = {
    config: {
        domain: "api.spiget.org",
        port: 80,
        versionPath: "v1",
        userAgent: "Spiget-NodeJSAPI/1.0"
    },
    
    /**
     * Makes an API call
     * @param {string} uri - Url which should be querried
     * @param {Object[]} parameters - Parameters of the query
     * @param {callback} cb - The callback that handles the response.
     */
    call: function (uri, parameters, cb) {
        var path = "/" + uri;

        for (var i = 0; i < parameters.length; i++) {
            if (i == 0) {
                path += "?" + parameters[i].key + "=" + parameters[i].val;
            } else {
                path += "&" + parameters[i].key + "=" + parameters[i].val;
            }
        }

        var options = {
            host: this.config.domain,
            port: this.config.port,
            path: "/" + this.config.versionPath + path,
            headers: {
                "User-Agent": this.config.userAgent
            }
        };


        http.get(options, function (resp) {
            var result = "";
            resp.on('data', function (chunk) {
                result += chunk;
            });
            resp.on('end', function (chunk) {
                try {
                    var parsed = JSON.parse(result);
                    if (cb)
                        cb(parsed);
                } catch (err) {
                    if (cb)
                        cb(result);
                }

            });
        }).on("error", function (e) {
            console.log("Got error: " + e.message);
        });

    },
    /**
     * Returns a list of available Resources.
     * @param {integer} size - Number of Resources which should be returned
     * @param {callback} cb - The callback that handles the response.
     */
    getResources: function (size, cb) {
        if (typeof (size) == "function") {
            cb = size;
            size = 10;
        } else if (typeof (size) == "undefined") {
            size = 10;
            cb = false;
        }

        this.call("resources", [
            {
                key: "size",
                val: size
            }
        ], cb);
    },
    
    /**
     * Returns a list of new available Resources.
     * @param {integer} size - Number of Resources which should be returned
     * @param {callback} cb - The callback that handles the response.
     */
    getNewResources: function (size, cb) {
        if (typeof (size) == "function") {
            cb = size;
            size = 10;
        } else if (typeof (size) == "undefined") {
            size = 10;
            cb = false;
        }

        this.call("resources/new", [
            {
                key: "size",
                val: size
            }
        ], cb);
    },
    
    /**
     * Returns detailed information about a resource
     * @param {string} search - Name or id of the resource
     * @param {callback} cb - The callback that handles the response.
     */
    getResource: function (search, cb) {
        if (typeof (search) != "undefined") {
            if (typeof (search) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("resources/" + search, [], cb);
    },
    
    /**
     * Returns the list of available versions of the resource
     * @param {string} search - Name or id of the resource
     * @param {callback} cb - The callback that handles the response.
     */
    getResourceVersions: function (search, cb) {
        if (typeof (search) != "undefined") {
            if (typeof (search) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("resources/" + search + "/versions", [], cb);
    },
    
    /**
     * Returns detailed information about the version
     * @param {string} search - Name or id of the resource
     * @param {string} version - Version number
     * @param {callback} cb - The callback that handles the response.
     */
    getVersionDetails: function (search, version, cb) {
        if (typeof (search) != "undefined") {
            if (typeof (search) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("resources/" + search + "/versions/" + version, [], cb);
    },
    
    /**
     * Returns the download link of the version
     * @param {string} search - Name or id of the resource
     * @param {string} version - Version number
     * @param {callback} cb - The callback that handles the response.
     */
    getVersionDownload: function (search, version, cb) {
        if (typeof (search) != "undefined") {
            if (typeof (search) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("resources/" + search + "/versions/" + version + "/download", [], cb);
    },
    
    /**
     * Returns the author of the resource
     * @param {string} search - Name or id of the resource
     * @param {callback} cb - The callback that handles the response.
     */
    getResourceAuthor: function (search, cb) {
        if (typeof (search) != "undefined") {
            if (typeof (search) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("resources/" + search + "/author", [], cb);
    },
    
    /**
     * Returns a list of available categories.
     * @param {callback} cb - The callback that handles the response.
     */
    getCategories: function (cb) {
        this.call("categories", [], cb);
    },
    
    /**
     * Returns detailed information about a category
     * @param {string} search - Name or id of the category
     * @param {callback} cb - The callback that handles the response.
     */
    getCategory: function (search, cb) {
        if (typeof (search) != "undefined") {
            if (typeof (search) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("categories/" + search, [], cb);
    },
    
    /**
     * Returns a list of resources in the given category
     * @param {string} search - Name or id of the category
     * @param {integer} size - Number of Resources which should be returned
     * @param {callback} cb - The callback that handles the response.
     */
    getCategoryResources: function (search, size, cb) {
        if (typeof (search) != "undefined") {
            if (typeof (search) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("categories/" + search + "/resources", [{key: "size", val: size}], cb);
    },
    
    /**
     * Returns a list of available authors.
     * @param {integer} size - Number of authors which should be returned
     * @param {callback} cb - The callback that handles the response.
     */
    getAuthors: function (size, cb) {
        if (typeof (size) == "function") {
            cb = size;
            size = 10;
        } else if (typeof (size) == "undefined") {
            size = 10;
            cb = false;
        }

        this.call("authors", [
            {
                key: "size",
                val: size
            }
        ], cb);
    },
    
    /**
     * Returns detailed information about an author
     * @param {string} search - Name or id of the resource
     * @param {callback} cb - The callback that handles the response.
     */
    getAuthor: function (search, cb) {
        if (typeof (search) != "undefined") {
            if (typeof (search) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("authors/" + search, [], cb);
    },
    
    /**
     * Returns a list of resources of the given author
     * @param {string} search - Name or id of the author
     * @param {callback} cb - The callback that handles the response.
     */
    getAuthorResources: function (search, cb) {
        if (typeof (search) != "undefined") {
            if (typeof (search) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("authors/" + search + "/resources", [], cb);
    },
    
    /**
     * Returns a list of new authors 
     * @param {integer} size - Number of authors which should be returned
     * @param {callback} cb - The callback that handles the response.
     */
    getNewAuthors: function (size, cb) {
        if (typeof (size) == "function") {
            cb = size;
            size = 10;
        } else if (typeof (size) == "undefined") {
            size = 10;
            cb = false;
        }

        this.call("authors/new", [
            {
                key: "size",
                val: size
            }
        ], cb);
    },
    
    /**
     * Search for a resource
     * @param {string} query - What to search for
     * @param {string} field - The field that should be searched (only name and tag for resources)
     * @param {callback} cb - The callback that handles the response.
     */
    searchResource: function (query, field, cb) {
        if (typeof (query) != "undefined") {
            if (typeof (query) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("search/" + query + "/" + field, [], cb);
    },
    
    /**
     * Search for a´n author
     * @param {string} query - What to search for
     * @param {string} field - The field that should be searched (only username for authors)
     * @param {callback} cb - The callback that handles the response.
     */
    searchAuthor: function (query, field, cb) {
        if (typeof (query) != "undefined") {
            if (typeof (query) == "function") {
                return false;
            }
        } else {
            return false;
        }
        this.call("search/authors/" + query + "/" + field, [], cb);
    },
}