/*******************************************************
 * OPCIONES INICIALES.
 ******************************************************/
let pasteles = [
    {
        tipo: 'Cocoa',
        precio: 450,
        id: 1
    }, 

    {
        tipo: 'Cajeta',
        precio: 440,
        id: 2
    },

    {
        tipo: 'Limón',
        precio: 430,
        id: 3
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
    let option = $(newitem);
    options.append(option);
}

/* FORMA PARA AGREGAR NUEVAS OPCIONES */
$('#add').click(() => {
    const tipo = $('#tipo').val();
    const precio = $('#precio').val();

    if(tipo !== '') {
        const id = pasteles.length + 1;

        const pastelToAdd = {
            tipo: tipo,
            precio: parseInt(precio),
            id: id
        }
    
        pasteles.push(pastelToAdd);
    
        let newitem = generarItem(tipo, id);
        let option = $(newitem);
        options.append(option);

        /* AGREGAR EVENTO PARA ELIMINAR */
        option.click(event => eliminarOpcion(event));

        /* AGREGAR EVENTO PARA INSERTAR EN LISTA */
        let add = $('.option[data-id=' + id + '] > button');
        add.click(event => actualizarLista(event));
    }

    $('#tipo').val('');
    $('#precio').val('');
});

/* ELIMINAR OPCIONES */

const eliminarOpcion = (event) => {
    if(event.target.tagName === 'SPAN') {
        const id = event.target.getAttribute('data-id');
        console.log(id);
        const element = $('.option[data-id=' + id + ']'); 

        $(element).remove();
    }
};

$('.option').click(event => eliminarOpcion(event));

/* ELIMINAR ELEMENTOS DE LA LISTA */
const eliminarDeLista = (event) => {
    
    if(event.target.tagName === 'SPAN') {
        
        const id = event.target.getAttribute('data-id');
        const element = $('.listed[data-id=' + id + ']'); 

        $(element).remove();
    }
};

$('.listed').click(event => eliminarDeLista(event))

let lista = [];

/* AGREGAR A LA LISTA */
const actualizarLista = (event) => {
    const id = event.target.getAttribute('data-id');
    const tipo = $('.option[data-id=' + id + '] > h4'); 
    const input = $('.option[data-id=' + id + '] > input'); 

    if(input.val() !== '0' && !isNaN(input.val())) {

        const item = {
            tipo: tipo.text(),
            cantidad: parseInt(input.val()),
            id: lista.length + 1
        }

        /* VERIFICAR SI EL PASTEL YA ESTA EN LISTA */;

        if(lista.some(prod => prod.tipo === item.tipo)){
            
            let objFind = lista.find(obj => obj.tipo == item.tipo);
            objFind.cantidad = objFind.cantidad + item.cantidad;
            
            const itemId = objFind.id;
            const prevItem = $('.listed[data-id=' + itemId + ']'); 
            const updateditem = agregarALista(objFind, itemId);

            if(!!prevItem[0]){
                /* ACTUALIZAR EL ITEM DE LA LISTA */
                $(prevItem).replaceWith(updateditem);
            } else {
                /* AGREGAR ELEMENTO ACTUALIZADO SI EL ANTERIOR FUE BORRADO */
                objFind.cantidad = item.cantidad;
                const restartedItem = agregarALista(objFind, itemId);
                $('.added').append(restartedItem);
            }
            
            /* AGREGAR EVENTO PARA ELIMINAR */
            const upitm = $('.listed[data-id=' + itemId + ']'); 
            $(upitm).click(event => eliminarDeLista(event));
            
        } else {
            lista.push(item);
            const newid = lista.length;
            const newitem = agregarALista(item, newid);

            $('.added').append(newitem);

            
            const itm = $('.listed[data-id=' + newid + ']'); 
            $(itm).click(event => eliminarDeLista(event));
        }
    }

    input.val('');
};

const agregarALista = (item, id) => {
    return `
        <li class="listed" data-id=${id}>
            <h4>${item.cantidad}</h4>
            <h4>${item.tipo}</h4>
            <span data-id=${id}>x</span>
        </li>
    `
};

/* ACTUALIZAR LISTA */
$('.addToList').click(event => actualizarLista(event));





