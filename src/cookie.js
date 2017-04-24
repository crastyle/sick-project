let cookie = function (name, value, options) {
    var d = document;
    if (typeof value != 'undefined') {
        options = options || ( {});
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && ( typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + options.path : '; path=/';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        d.cookie = [name, '=', window.encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (d.cookie && d.cookie != '') {
            var cookies = d.cookie.split(';');
            for (var i = 0, _len = cookies.length; i < _len; i++) {
                var cookie = cookies[i];
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = window.decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}
export default cookie