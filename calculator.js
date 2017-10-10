

function init() {
    var frm = document.getElementById('form');
    form.addEventListener("submit",calculate,false);
    var btn = document.getElementById('calc');
    btn.addEventListener("click",calculate,false);
}

window.addEventListener("load",init,false);


function calculate(e) {
    e.preventDefault();
    error();
    var txt = document.getElementById('input').value;
    var mod = document.getElementById('clock').value;
    mod = parseInt(mod);
    if (mod != mod || mod < 2) {
	error("Modulo must be an integer greater than 1.");
    }
    var res = parse(txt,mod);
    if (res !== false) {
	var tbdy = document.getElementById('results');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML = txt;
	tr.appendChild(td);
	td = document.createElement('td');
	td.innerHTML = '&equiv;';
	tr.appendChild(td);
	td = document.createElement('td');
	td.innerHTML = res;
	tr.appendChild(td);
	td = document.createElement('td');
	td.innerHTML = 'mod ' + mod;
	tr.appendChild(td);
	tbdy.appendChild(tr);
    }
    return false;
}


function error(msg) {
    var err = document.getElementById('error');
    if (msg) {
	err.innerHTML = "Error: " + msg;
	err.style.display = 'block';
    } else {
	err.innerHTML = '';
	err.style.display = 'none';
    }
}

function parse(txt,mod) {
    var a,b,m;
    m = txt.match(/^\s*(\d+)\s*([-+*/^])\s*(\d+)\s*$/);
    if (m) {
	a = parseInt(m[1]);
	b = parseInt(m[3]);
	if (m[2] == '+') {
	    return add(a,b,mod);
	}
	if (m[2] == '-') {
	    return sub(a,b,mod);
	}
	if (m[2] == '*') {
	    return mul(a,b,mod);
	}
	if (m[2] == '/') {
	    return div(a,b,mod);
	}
	if (m[2] == '^') {
	    return pow(a,b,mod);
	}
    }
    m = txt.match(/^\s*(\d+)\s*$/);
    if (m) {
	a = parseInt(m[1]) % mod;
	return a;
    }
    error('Invalid expression; see below.');
    return false;
}

function add(a,b,m) {
    a %= m;
    b %= m;
    return (a + b) % m;
}

function sub(a,b,m) {
    a %= m;
    b %= m;
    var r = (a - b) % m;
    if (r < 0) {
	r += m;
    }
    return r;
}

function mul(a,b,m) {
    a %= m;
    b %= m;
    var r = 0;
    for (i = 0; i < a; i++) {
	r += b;
	r %= m;
    }
    return r;
}

function div(a,b,m) {
    a %= m;
    b %= m;
    var r = a;
    var i = 0;
    while (r != 0 || r != a) {
	r -= b;
	r %= m;
	if (r < 0) {
	    r += m;
	}
	i++;
    }
    return i;
}

function pow(a,b,m) {
    var c,p,r;
    r = 1;
    p = a % m;
    while (b > 0) {
	c = b & 1;
	b >>= 1;
	if (c == 1) {
	    r = mul(r,p,m);
	}
	p = mul(p,p,m);
    }
    return r;
}

