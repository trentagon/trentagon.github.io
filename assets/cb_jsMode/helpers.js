

//random function helpers
// fxrand() gives u a value between 0 and 1
// rnd_btw(a,b) gives u a value between a and b
// rnd_int(a,b) gives u an integer value between a and b
//function rnd_btw(min, max) {
//  return fxrand() * (max - min) + min;
//}

//function rnd_int(min, max) {
//  min = Math.ceil(min);
//  max = Math.floor(max);
//  return Math.floor(fxrand() * (max - min + 1)) + min;
//}


//Map function for smoothing
function map3(value, start1, stop1, start2, stop2, v, when) {
  //first 4 inputs are like the og map function
  //v = degree of polynomial smooting (>1 means smoother)  
  //When = ease in (1), out (2), or both (3). 

  let b = start2;
  let c = stop2 - start2;
  let t = value - start1;
  let d = stop1 - start1;
  let p = v;
  let out = 0;
  if (when == 1) {
    t /= d;
    out = c*pow(t, p) + b;
  } else if (when == 2) {
    t /= d;
    out = c * (1 - pow(1 - t, p)) + b;
  } else if (when == 3) {
    t /= d/2;
    if (t < 1) {
      return c/2*pow(t, p) + b;
    }
    out = c/2 * (2 - pow(2 - t, p)) + b;
  }
  return out;
}
