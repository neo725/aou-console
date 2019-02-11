class Schedule {
    //constructor(d) {
    ctor (d) {
        this.title = d.title
        this.start = d.start
        this.end = d.end
        this.link = d.link
        this.note = d.note

        this.isSchedule = true
    }
}
Schedule.prototype.ParseFromRequest = function(req) {
    if (req && req.body) {
        var body = req.body
        
        // this.title = body.title
        // this.start = body.start
        // this.end = body.end
        // this.link = body.link
        // this.note = body.note
        
        this.ctor(body)

        return this
    }

    throw "Not a valid request data"
}

Schedule.prototype.toJson = function() {
    return {
        id: this.id,
        title: this.title,
        start: this.start,
        end: this.end,
        link: this.link,
        note: this.note
    }
}

module.exports = Schedule