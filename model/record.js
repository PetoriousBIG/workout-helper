// A data class to represent the saved record of a completed workout where:
// header should be the string title of the workout + date it was performed
// body should be the string results of the workout 
export default class Record {
    constructor(header, body, key) {
        this.header = header
        this.body = body
        this.key = key
    }
}