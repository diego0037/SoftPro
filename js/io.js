


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
})
