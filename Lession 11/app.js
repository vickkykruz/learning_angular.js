// Prototypal Inheritance

// ================================================================
// CREATING PARENT OBJECTS
// =====================================================================
let parent = {
    value: "parentValue",
    obj: {
        objValue: "parentObjValue"
    },
    walk: ()=> {
        console.log("walking");
    }
};

// ================================================================
// CHILD INHERITANCE FROM PARENTS
// =====================================================================

let child = Object.create(parent);
// console.log("CHILD - child.value: ", child.value);
// console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
// console.log("PARENT - parent.value: ", parent.value);
// console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
// console.log("Parent", parent);
// console.log("child", child);

// ================================================================
// END OF CHILD INHERITANCE FROM PARENTS
// =====================================================================


// =============================================================
// CREATING THE CHILD OBJECT
// ==============================================================

// child.value = "childValue";
// child.obj.objValue = "childObjObjValue";
// console.log("*** CHANGED: child.value = 'childValue'");
// console.log("*** CHANGED: child.obj.objValue = 'childObjValue'");
// console.log("CHILD - child.value: ", child.value);
// console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
// console.log("PARENT - parent.value: ", parent.value);
// console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
// console.log("parent ", parent);
// console.log("child", child);

// console.log("child.obj === parent.obj ", child.obj === parent.obj);

// let grandChild = Object.create(child);
// console.log("Grain Child", grandChild);
// grandChild.walk();

// **Function Constructiors

function Dog(name) {
    this.name = name;
    console.log("'this is: ", this);
}

let myDog = new Dog("Jack");
console.log("myDog", myDog);

// Not begin used as a function constructor
Dog("Jack");