/*
*   Charter Communications Programming Assessment
*   Nested hash constructor
*   by Joshua Donelson
*
*   Write a subroutine that, provided an array of lines each of which contains pipe separated values,
*   will produce an appropriately deep hash representing the data. You should not make an assumption
*   regarding the number of fields on a line; they may be more than five levels deep as in the example below.
*/
var input = [
    'app1|server1|uptime|5',
    'app1|server1|loadavg|0.01 0.02 0.03',
    'app1|server1|conn1|state|up',
    'app1|server2|uptime|10',
    'app1|server2|loadavg|0.11 0.22 0.33',
    'app1|server2|conn1|state|down',
    'app1|running|true'
];

// Merge() source and destination objects (recursive/goes deep)
function Merge(src, dest) {
    for(let key in src) {
        if(typeof src[key] === "object") {
            //object requires deeper analysis
            if(!dest[key]) {
                dest[key] = src[key];
            } else {
                dest[key] = Merge(src[key], dest[key]);
            }
        } else {
            //not an object (is final property value)
            dest[key] = src[key];
        }
    }
    return dest;
}

// Dumper() - hashes input data
function Dumper(data) {
    //Object.assign and ... spread operator overwrite object properties and don't do a deep merge, so let's get creative in as few lines as I can muster:
    let result = {};
    for(let i=0; i<data.length; i++) {
        let ar = data[i].split("|");
        let len = ar.length - 1; //length of the split array
        let val = ar.pop(); //remove the end value (it is not a property name)
        let str = "{\"" + ar.join("\":{\"") + "\": \"" + val + "\"" + ("}".repeat(len)); //construct a string to easily parse as JSON object
        let o = JSON.parse(str); //constructs initial object...now merge with result in case of duplicate keys
        result = Merge(o, result);
    }
    return result;
}


//example output:
//console.log(Dumper(input));

//...or stringify to verify output since deep objects are shown as [Object] in console:
console.log(JSON.stringify(Dumper(input)));