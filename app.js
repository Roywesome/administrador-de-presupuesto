class Gastos{
    constructor(name, cantidad, id){
        this.name = name;
        this.cantidad = cantidad;
        this.id = Date.now();
    }
}

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        //Agregando los gastos en un arrar mediante spread operador
        this.gastos = [...this.gastos, gasto]
        //console.log(this.gastos)
        
        this.calcularResante();
       
    }

    calcularResante(){
        const total = presupuestoUsuario.presupuesto;
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        let restante = total - gastado;

        const restanteSelector = document.getElementById('restante');
        
        if(restante > 10){
            //Mostrar restante
            if(restanteSelector.parentNode.parentNode.classList.contains('alert-danger')){
                restanteSelector.parentNode.parentNode.classList.replace('alert-danger', 'alert-success')
            }else{
                restanteSelector.parentNode.parentNode.classList.replace('alert-warning', 'alert-success')
            }
            restanteSelector.textContent = restante;
        }else if(restante <= 10 && restante >=0){
            if(restanteSelector.parentNode.parentNode.classList.contains('alert-danger')){
                restanteSelector.parentNode.parentNode.classList.replace('alert-danger', 'alert-warning')
            }else{
                restanteSelector.parentNode.parentNode.classList.replace('alert-success', 'alert-warning')
            }
            restanteSelector.textContent = restante;
        }else{
            if( restanteSelector.parentNode.parentNode.classList.contains('alert-success')){
                restanteSelector.parentNode.parentNode.classList.replace('alert-success', 'alert-danger')
            }else{
                restanteSelector.parentNode.parentNode.classList.replace('alert-warning', 'alert-danger')
            }
            restanteSelector.textContent = restante;
        }
    }

    mostrarGastos(gastos){
        this.limpiarHtml();

        gastos.forEach((gasto, index) => {
            const li = document.createElement('li');
            //li.dataset.id = gasto.id;
            li.id = 'gasto.id'
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
            li.innerHTML = `${gasto.name} <span class="badge bg-info text-dark ">$${gasto.cantidad}</span> <button  onclick = eliminarGasto(${gasto.id}); class="btn btn-danger fw-bold">x</button>`
        
            ul.appendChild(li);
        })

        /*const presupuesto = document.getElementById('presupuesto');
        presupuesto.insertAdjacentElement('beforebegin', div)*/
    }

    limpiarHtml(){
        while(ul.firstChild){
            ul.removeChild(ul.firstChild);
        }
    }



    eliminarGasto(id){
        /*const li = document.querySelector('ul .list-group-item');
        li.remove();*/
        const restanteModificado = this.gastos.filter((gasto, index) => id !== gasto.id);
        this.gastos = restanteModificado;
        this.mostrarGastos(this.gastos);
        this.calcularResante();

        //this.mostrarGastos(restanteModificado);
    }

}



let presupuestoUsuario;
const ul = document.querySelector('#gastos ul');

class UI{
    static agregarGastos(e){
        e.preventDefault();

        const gasto = document.getElementById('gasto').value;
        const cantidad = Number(document.getElementById('cantidad').value);

        if(gasto === '' || !cantidad){
            UI.showAlert('danger', 'Complete todo los campos.');
        }else{
            //Generar un objeto
            const gastosAgreg = new Gastos(gasto, cantidad)

            //Añade un nuevo gasto
            presupuestoUsuario.nuevoGasto(gastosAgreg)

            //UI.showGastos(gastosAgreg);
            presupuestoUsuario.mostrarGastos(presupuestoUsuario.gastos);
        }
    }

    static showAlert(className, msg){
        const div = document.createElement('div');
        div.className = `mt-2 alert alert-${className}`;
        div.textContent = `${msg}`
        
        const btn = document.getElementById('btn');

        btn.insertAdjacentElement('beforebegin', div)

        setTimeout(() => {
            div.remove();
        }, 1000)
    }

    /*static showGastos(gasto){
        const div = document.createElement('div');
        div.className = `mb-2`;
        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        const li = document.createElement('li');
        li.id = gasto.id;
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        li.innerHTML = `${gasto.name} <span class="badge bg-info text-dark ">$${gasto.cantidad}</span> <button  onclick = eliminarGasto(id); class="btn btn-danger fw-bold">x</button>`

        ul.appendChild(li);
        div.appendChild(ul)
    
        const presupuesto = document.getElementById('presupuesto');
        presupuesto.insertAdjacentElement('beforebegin', div)
    }*/

    static preguntarPresupuesto(){
        const presupuesto = prompt('Ingrese su presupuesto en números!');
        const pres = parseFloat(presupuesto);

        if(presupuesto === '' || presupuesto === null || presupuesto <= 0 || isNaN(presupuesto)){
            window.location.reload();
        }
        const total = document.getElementById('total');
        total.classList.add('fw-bold')
        total.textContent = pres;

        const restanteSelector = document.getElementById('restante');
        restanteSelector.textContent = pres;
        
        presupuestoUsuario = new Presupuesto(pres);
        console.log(presupuestoUsuario);

    }

    /*static showRestantes(gastos){
        const total = document.getElementById('total').innerHTML;
        const gasto = gastos.cantidad;
        const gastMo = parseFloat(gasto);
        const subTotal = [parseFloat(total), gastMo];
        let restante = total - gasto;
        console.log(subTotal);
    
    }*/
}

document.addEventListener('DOMContentLoaded', UI.preguntarPresupuesto)

const formulario = document.getElementById('agregar-gasto');
formulario.addEventListener('submit', UI.agregarGastos )

function eliminarGasto(id){
    presupuestoUsuario.eliminarGasto(id);
}

