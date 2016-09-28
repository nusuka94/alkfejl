"use strict";

//objektum létrehozás
//objektumliterál
const cim = {
    varos: 'Budapest', //'', "" és `` egyaránt használható
    utca: "Pázmany Péter sétány",
    hazszam: '1/c',
    toString: function toString() {
        //megadott kifejezés behelyettesítése ${ }
        return `${this.varos}, ${this.utca}`
    }
    //toString() {...}
};

//console.log(cim);
//console.log(cim.toString());

class Point {
    constructor(x, y) {
        this._x = x; //_ - privátnak tekintem
        this._y = y;
    }

    setX(value) {
        this._x = value;
    }

    set x(value) {
        this._x = value;
    }

    get x() {
        return this._x;
    }
}

class Circle extends Point {
    constructor(x, y, r) {
        super(x,y);
        this._r = r;
    }
}

//nincs láthatóság, minden public
const p1 = new Point(10,20);
const c1 = new Circle(100,200,5);
//p1.setX(100);
p1.x = 100;
console.log(p1);
console.log(c1);