var po = 0;
function PedidoOptimo(d,s,h) {
    div = Math.ceil(Math.sqrt(2*d*s/h));
    $('#q').text("Su Q óptimo es de: " + div + " unidades");
    $('#qo').val(div);
    $('#qop').val(div);
    $('#qopg').val(div);
}
function PedidosAnuales(d,q) {
    div = Math.ceil(d/q);
    $('#pa').text("Su numero de pedidos anuales es de: " + div + " pedidos");
}
function CostoMantener(costo,demanda) {
    costom = costo * (demanda/2);
    $('#costo_mantener').text("Su costo de mantener las unidades es de: " + costom);
}
function CostoGestionar(h,q,s,d){
    cg = h*(q/2)+s*(d/q)
    $('#costo_gestionar').text("Su costo de gestionar las unidades es de: " + cg.toFixed(2));
}
$(document).ready(function() {

    $('#calc').on('click', function(event) {
        PedidoOptimo(parseInt($('#demand').val()), parseInt($('#cd').val()),parseInt($('#cm').val()));
        $('#costMan').val($('#cm').val());
        $('#demanda').val(parseInt($('#demand').val()));

        $('#demandg').val(parseInt($('#demand').val()));
        $('#cdg').val(parseInt($('#cd').val()));
        $('#cmg').val($('#cm').val());
    });

    $('#pedidos').on('click', function(event) {
        PedidosAnuales(parseInt($('#demanda').val()), parseInt($('#qo').val()));
    })

    $('#mantener').on('click', function(event) {
        CostoMantener(parseInt($('#costMan').val()),parseInt($('#qop').val()));
    })

    $('#gestionar').on('click', function(event) {
        CostoGestionar(parseInt($('#cmg').val()),parseInt($('#qopg').val()),parseInt($('#cdg').val()),
        parseInt($('#demandg').val()));
    })

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
  $('#resProbabilidadSinUnidades').text("La Probabilidad es de: " + res);
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
  $('#reslongitudMediaCola').text("La Capacidad promedio es de: " + res);
}

function tiempoEsperaPromedio() {
  var x = $('#TEPLMC').val();
  var y = $('#TEPTLLE').val();
  var res = (x/y).toFixed(4);
  $('#restiempoEsperaPromedio').text("El tiempo de espera es: " + res +" horas");
  var minutos = (res*60/1).toFixed(4);
  $('#restiempoMinutos').text("El tiempo de espera es: " + minutos +" minutos");
  var segundos = (res*3600/1).toFixed(4);
  $('#restiempoSegundos').text("El tiempo de espera es: " + segundos +" segundos");
}

function tiempoMedioSistema() {
  if (po ==0) {
    alert('Datos inconsintentes');
    return;
  }else {
    var x = $('#TMSLLE').val();
    var y = $('#TMSTA').val();
    var res = (x/y).toFixed(4);
    $('#restiempoMedioSistema').text("Probabilidad de espera por el servicio: " + res);

    var res1 = Number(po)+Number(res);
    console.log(res1);
    $('#resCalidadSistema').text("Po + Pw : " + res1 + ". El servicio es aceptable");
  }

}
