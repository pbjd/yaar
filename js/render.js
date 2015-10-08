var rlen = 1669;      // reference length
var pad = 10;        // canvas padding
var minOvl = 100;    // minimum overlap (in bases)
//var numQueries = 20; // number of queries to generate
//var queries = [];    // query locations

function simulateQueries() {
    // anchor range position for query
    var min = minOvl,
        max = rlen-minOvl;
    var maxQlen = 5e3;
    var minQlen = 500;

    // create a set of randomly aligned queries
    for(var i = 0; i < numQueries; i++) {
        // alignment start (reference)
        var ars = Math.floor((Math.random() * (max-min)) + min);
        var qlen = Math.floor((Math.random() * (maxQlen-minQlen)) + minQlen); 
        // alignment start (query)
        var maxQstart = qlen - min;
        var aqs = Math.floor(Math.random() * maxQstart);
        var maxAlen = Math.min(rlen-ars, ars+(qlen-aqs));
        var alen = Math.floor((Math.random() * (maxAlen-min)) + min);
        queries.push({rlen: rlen, qlen: qlen, alen: alen, ars: ars, aqs: aqs});
    }
}

function renderRef(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle   = '#FF0000';  // red
    ctx.strokeStyle = '#000000';  // black

    var width = canvas.width - (pad * 2);

    ctx.fillRect(pad,pad,width,5);
    ctx.strokeRect(pad,pad,width,5);
}

function renderQueries(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width - (pad * 2);
    var y = 20;
    var scale = w / queries[0].rlen;
    queries.sort(function(a,b){return a.ars-b.ars});
    for (var i = 0; i < queries.length; i++) {
        var q = queries[i];
        ctx.setLineDash([5,5]);
        ctx.beginPath();
        var x1 = pad+(q.ars-q.aqs)*scale;
        var x2 = x1 + q.qlen*scale;
        ctx.moveTo(x1, y+3);
        ctx.lineTo(x2, y+3);
        ctx.stroke();
        ctx.fillStyle = "blue";
        ctx.fillRect(pad+q.ars*scale, y, q.alen*scale, 5); 
        y += 10;
    }
}

function render() {
    var canvas = document.getElementById('peek');
    renderRef(canvas);
    //simulateQueries();
    renderQueries(canvas);
}
