var urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
var initialUrl = 'https://eddyst.one/';

function make2Digit(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function getEddystoneEncoding(urlString) {
    var encode = [],
    schemes = [
    "http://www.",
    "https://www.",
    "http://",
    "https://",
    ],
    extensions = [
    ".com/", ".org/", ".edu/", ".net/", ".info/", ".biz/", ".gov/",
    ".com", ".org", ".edu", ".net", ".info", ".biz", ".gov",
    ],
    reg = urlRegex.exec(urlString);
    encode.push(make2Digit(schemes.indexOf(reg[1])));
    for(var i = reg[1].length; i < urlString.length; i++) {
        if (urlString[i] == ".") {
            for (var j = 0; j < extensions.length; j++) {
                if (urlString.startsWith(extensions[j], i)) {
                    i += extensions[j].length - 1;
                    encode.push(make2Digit(j));
                }
            }
        } else {
            encode.push(urlString[i].charCodeAt(0).toString(16));
        }
    }
    return encode;
}

$(document).ready(function() {
    $.fn.form.settings.rules.maxUrlLength = function(value, maxUrlLength) {
        return (window.encodedUrl.length <= maxUrlLength)
    };

    $('.ui.form').form({
        fields: {
            url: {
                identifier: 'url',
                rules: [
                {
                    type: 'regExp',
                    value: urlRegex,
                    prompt: 'Please enter a valid URL.'
                },
                {
                    type: 'maxUrlLength[18]',
                    prompt: 'Encoded url too long (max 18 bytes)'
                }
                ]
            }
        }
    });

    // disabling form submit
    $('form').submit(function() {
        $('.ui.form').form('validate form');
        return false;
    });

    $("#url").keyup(function(e) {
        window.encodedUrl = '';
        var inputUrl = $(this).val().trim();
        if(inputUrl.length > 0) {
            if($('.ui.form').form('validate form')) {
                window.encodedUrl = getEddystoneEncoding(inputUrl);
                if($('.ui.form').form('validate form')) {
                    $('.hexData').html(window.encodedUrl.join(' '));
                }
            }
        }
    });

    $('.hexData').html(getEddystoneEncoding(initialUrl).join(' '));
});
