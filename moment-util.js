let moment = require('moment')

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

let MomentUtil = {
    parseToDate: function(dateString = '') {
        try {
            let _d = moment()

            dateString = dateString.replaceAll('/', '-')

            if (dateString.indexOf('T') != -1) {
                // UTC time format
                _d = moment.utc(dateString).local()
            }
            else if (dateString.trim().length > 0) {
                // normal time format
                _d = moment(dateString, ['YYYY-M-D', 'YYYY-MM-DD'], true)
            }

            _d = moment(_d.format('YYYY-M-D'), 'YYYY-M-D', true)

            return _d.startOf('day')
        }
        catch (ex) {
            console.log(ex)

            throw ex
        }
        
    },

    toString: function(dateString) {
        return this.parseToDate(dateString).format('YYYY-M-D')
    },

    isLower: function(start, end) {
        var _start = this.parseToDate(start)
        var _end = this.parseToDate(end)

        return _start < _end
    },

    getDateStatus: function(start, end) {
        var now = this.parseToDate()

        if (this.parseToDate(end) < now) {
            return 'expired'
        }

        if (this.parseToDate(start) > now) {
            return 'not-begin'
        }

        return 'running'
    }
}

module.exports = MomentUtil