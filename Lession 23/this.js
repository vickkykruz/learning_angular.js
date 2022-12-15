function Person () {
    this.fullname = "Victor";
    this.fav = "Rice";

    this.describe = ()=> {
        console.log('this is: ', this);
        console.log(this.fullname + " likes " + this.fav);
    }
}

let victor = new Person();
victor.describe();

// Bad Practices
let describe = victor.describe;
describe.call(victor);