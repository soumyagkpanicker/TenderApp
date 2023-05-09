function EscapeNewLine(result, newLine) {
    return result.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

function ParseJSON(result) {
    return jQuery.parseJSON(EscapeNewLine(result).replace(/'/g, ""));
}

function GetQueryStringValues(url, param) {
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}


