/*
*   Charter Communications Programming Assessment
*   Change delta object
*   by Joshua Donelson
*
*   Write an OO module to represent a container that holds key value pairs.
*   The constructor for this object must accept key value pairs and use them as initial values for the object.
*   The object must have three methods to manipulate the key value pairs: add, delete, and modify. 
*   add and modify each accept a value in addition to the name of the key. There should also be a get method
*   that returns the current value of the provided key. The object must track the changes that have occurred since
*   construction and implement a delta method that prints out the smallest set of changes necessary to represent the current state.
*/

//"DeltaObject" constructor:
function DeltaObject() {
    //key/value pairs must be provided as a single JSON object as the first argument
    this.deltas = 'Object constructed.\r\n';
    this.keys = {};

    for(let key in arguments[0]) {
        let val = arguments[0][key];
        this.add(key, val);
    }

}

//Methods:
DeltaObject.prototype.add = function(key, val) {
    this.keys[key] = val;
    this[key] = function() { return key + "'s " + this.keys[key] }; //BONUS: function to access data member value by name (was this what was intended?)
    this.deltas += 'ADD ' + key + ' = ' + val + '\r\n';
}
DeltaObject.prototype.delete = function(key) {
    this.deltas += 'DELETE ' + key + '\r\n';
    delete this[key]; //delete the function, too
    delete this.keys[key];
}
DeltaObject.prototype.modify = function(key, val) {
    this.deltas += 'MODIFY ' + key + ' = ' + val + '\r\n';
    this.keys[key] = val;
}
DeltaObject.prototype.get = function(key) {
    return this.keys[key] ? this.keys[key] : -1; //returning -1 instead of undefined
}


//initialize:
var someObject = new DeltaObject({deer: "park", foo: "bar", this: "that"});


//testing:

someObject.delete("this");
someObject.add("gnu", "linux");
someObject.modify("gnu", "not unix");
console.log(someObject.get('gnu'));
someObject.modify("deer", "venison");

console.log(someObject.deltas);

console.log(someObject.gnu());