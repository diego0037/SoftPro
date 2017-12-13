var po = 0;
function PedidoOptimo(d,s,h,p) {
    h = (p * h)/100;
    div = Math.ceil(Math.sqrt(2*d*s/h));
    $('#q').text("Your Optimal Q is: " + div + " Units");
    $('#qo').val(div);
    $('#qop').val(div);
    $('#qopg').val(div);
    $('#qopct').val(div);
    $('#pct').val(p);
}
function PedidosAnuales(d,q) {
    div = Math.ceil(d/q);
    $('#pa').text("Your annual orders are: " + div);
}
function CostoMantener(costo,demanda) {
    costom = costo * (demanda/2);
    $('#costo_mantener').text("Your Units Maintain Cost is: $" + costom);
}
function CostoGestionar(h,q,s,d){
    cg = h*(q/2)+s*(d/q)
    $('#costo_gestionar').text("Your Units Manage Cost is: $" + cg.toFixed(2));
}
function CostoTotal(p,h,q,s,d){
    ct = p*q+h*(q/2)+s*(d/q)
    $('#ct').text("Your Total Cost is: $" + ct.toFixed(2));


}

$(document).ready(function() {

    $('#calc').on('click', function(event) {
        PedidoOptimo(parseInt($('#demand').val()), parseInt($('#cd').val()),parseFloat($('#cm').val()), parseInt($('#UCP').val()));
        $('#costMan').val($('#cm').val());
        $('#demanda').val(parseInt($('#demand').val()));

        $('#demandg').val(parseInt($('#demand').val()));
        $('#cdg').val(parseInt($('#cd').val()));
        $('#cmg').val($('#cm').val());


        $('#demandct').val(parseInt($('#demand').val()));
        $('#cdct').val(parseInt($('#cd').val()));
        $('#cmct').val($('#cm').val());
    });

    $('#pedidos').on('click', function(event) {
        PedidosAnuales(parseInt($('#demanda').val()), parseInt($('#qo').val()));
    });

    $('#mantener').on('click', function(event) {
        CostoMantener(parseFloat($('#costMan').val()),parseInt($('#qop').val()));
    });

    $('#gestionar').on('click', function(event) {
        CostoGestionar(parseFloat($('#cmg').val()),parseInt($('#qopg').val()),parseInt($('#cdg').val()),
        parseInt($('#demandg').val()));

    });

    $('#calc_ct').on('click', function(event) {
        CostoTotal(parseFloat($('#pct').val()),parseFloat($('#cmct').val()),parseInt($('#qopct').val()),
        parseInt($('#cdct').val()),parseInt($('#demandct').val()));
    });

    // segundo servicio
    $('#PSU').on('click', function(event) {
        probabilidadSinUnidades();
    })

    $('#LMC').on('click', function(event) {
        longitudMediaCola();
    })

    $('#TEP').on('click', function(event) {
        tiempoEsperaPromedio();
    })

    $('#TMS').on('click', function(event) {
        tiempoMedioSistema();
    })

    // fin del segundo servicio

    })

function probabilidadSinUnidades() {
  var x = $('#TLLE').val();
  var y = $('#TA').val();
  var res = (1-(x/y)).toFixed(4);
  po = res;
  // po
  $('#LMCTLLE').val(x);
  $('#TETLLE').val(x);
  $('#LMCTA').val(y);
  $('#TMSTA').val(y);
  $('#TEPTLLE').val(x);
  $('#TMSLLE').val(x);
  $('#resProbabilidadSinUnidades').text("The Probability is: " + res);
}

function longitudMediaCola(){
  var x = $('#LMCTLLE').val();
  var y = $('#LMCTA').val();
  var res1 = Math.pow(x,2);
  var res2 = y*(y-x);
  var res = (res1/res2).toFixed(4);
  $('#TEPTLLE').val(x);
  $('#TMSTA').val(y);
  $('#TEPLMC').val(res);
  $('#TMSLLE').val(x);
  $('#TLLE').val(x);
  $('#TA').val(y);
  $('#reslongitudMediaCola').text("The Average Capacity is: " + res);
}

function tiempoEsperaPromedio() {
  var x = $('#TEPLMC').val();
  var y = $('#TEPTLLE').val();
  var res = (x/y).toFixed(4);
  $('#restiempoEsperaPromedio').text("The Time Waiting is: " + res +" hours");
  var minutos = (res*60/1).toFixed(4);
  $('#restiempoMinutos').text("The Time Waiting is: " + minutos +" minutes");
  var segundos = (res*3600/1).toFixed(4);
  $('#restiempoSegundos').text("The Time Waiting is: " + segundos +" seconds");
}

function tiempoMedioSistema() {
  if (po ==0) {
    alert('Inconsistent Data');
    return;
  }else {
    var x = $('#TMSLLE').val();
    var y = $('#TMSTA').val();
    var res = (x/y).toFixed(4);
    $('#restiempoMedioSistema').text("Probability of Waiting for the Service: " + res);

    var res1 = Number(po)+Number(res);
    console.log(res1);
    $('#resCalidadSistema').text("Po + Pw : " + res1 + ". Acceptable Service");
  }

}
