/*******************************************************
 * OPCIONES INICIALES.
 ******************************************************/
let pasteles = [
    {
        tipo: 'Cocoa',
        precio: '450',
    }, 

    {
        tipo: 'Cajeta',
        precio: '440'
    },

    {
        tipo: 'Limón',
        precio: '430'
    }

];

/*******************************************************
 * ELEMENTO DEL DOM EN DONDE SE AGREGAN LAS OPCIONES.
 ******************************************************/
const options = $('.options');

/*******************************************************
 * AGREGAR NUEVAS OPCIONES.
 ******************************************************/
const generarItem = (tipo, id) => {
    return `
        <li class="option" data-id=${id}>
            <h4>${tipo}</h4>
            <span data-id=${id}>x</span>
            <input type="text" placeholder="Cantidad">
            <hr>
            <button type="button" class="addToList" data-id=${id}>+</button>
        </li>
    `
}

/* OPCIONES INICIALES AGREGADAS AL DOM */
for(let i=0; i<pasteles.length; i++) {
    let pastel = pasteles[i];
    let newitem = generarItem(pastel.tipo, i+1);
    let $option = $(newitem);
    options.append($option);
}

/* FORMA PARA AGREGAR NUEVAS OPCIONES */
$('#add').click(() => {
    const tipo = $('#tipo').val();
    const precio = $('#precio').val();

    if(tipo !== '') {
        const id = pasteles.length + 1;

        const pastelToAdd = {
            tipo: tipo,
            precio: precio
        }
    
        pasteles.push(pastelToAdd);
    
        let newitem = generarItem(tipo, id);
        let $option = $(newitem);
        options.append($option);
    }

    $('#tipo').val('');
    $('#precio').val('');
});

/* ELIMINAR OPCIONES */
$('.option').click((event) => {
    if(event.target.tagName === 'SPAN') {
        const id = event.target.getAttribute('data-id');
        console.log(id);
        const element = $('.option[data-id=' + id + ']'); 

        $(element).remove();
    }
});

/* AGREGAR A LA LISTA */
$('.addToList').click((event) => {
    const id = event.target.getAttribute('data-id');

    const input = $('.option[data-id=' + id + '] > input'); 
    
    if(input.val() !== '0' && !isNaN(input.val())) {
        console.log(input.val());
    }

    input.val('');
});

