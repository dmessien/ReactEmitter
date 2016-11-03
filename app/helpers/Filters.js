export class Filters {
    constructor() {

    }
    basicFilter(key, item) {
        if(item.indexOf(this.state[key]) >= 0 && this.state[key] !== item) {
            return true;
        }
        return false;
    }
    fullNameFilter(item) {
        var fullName = item.firstName + " " + item.lastName;
        if(fullName.indexOf(this.state[this.key]) >= 0 && this.state[this.key] !== fullName) {
            return true;
        }
        return false;
    }
    concatFilter(key, item1, item2) {
        var concat = item1 + " " + item2;
        if(concat.indexOf(this.state[key]) >= 0 && this.state[key] !== concat) {
            return true;
        }
        return false;
    }
};

