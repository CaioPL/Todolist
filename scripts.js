
const container = document.querySelector('.container')
const input = document.querySelector('.input')
const addButton = document.querySelector('.add')

function addTarefa(nomeDaTarefa) {
    const itemTarefa = document.createElement('div')
    itemTarefa.classList.add('item')

    const inputTarefa = document.createElement('input')
    inputTarefa.type = 'text'
    inputTarefa.disabled = true
    inputTarefa.value = nomeDaTarefa
    inputTarefa.classList.add('item-input')

    const btnEditar = document.createElement('button')
    btnEditar.classList.add('editar')
    btnEditar.innerText = "EDITAR"
    btnEditar.addEventListener('click', () => editarTarefa(inputTarefa, nomeDaTarefa))

    const btnRemover = document.createElement('button')
    btnRemover.classList.add('remover')
    btnRemover.innerText = "REMOVER"
    btnRemover.addEventListener('click', () => deletarTarefa(itemTarefa, nomeDaTarefa))

    container.appendChild(itemTarefa)
    itemTarefa.appendChild(inputTarefa)
    itemTarefa.appendChild(btnEditar)
    itemTarefa.appendChild(btnRemover)
}

function saveTasks(){
    window.localStorage.setItem("tasks", JSON.stringify(tasks))
}

function editarTarefa(input, nomeDaTarefa) {
    input.disabled = !input.disabled
    if (!input.disabled){
        const index = tasks.indexOf(nomeDaTarefa)
        tasks[index] = input.value
        saveTasks()
    }
   // alert('Botão editar')
}

function deletarTarefa(itemTarefa, nomeDaTarefa) {
    container.removeChild(itemTarefa)
    const index = tasks.indexOf(nomeDaTarefa)
    tasks.splice(index, 1)
    saveTasks()
    //alert('Botão remover')
}




//função que verifica se o input estápreencido
function checkInput(){
    //pegando o valor que está no input
    const valorInput = input.value
    if (valorInput !== ''){
        addTarefa(valorInput)
        //add
        tasks.push(valorInput)
        saveTasks() 
        input.value = ''
    }
}
// Adicionando evento de clique no botão
addButton.addEventListener('click', checkInput)
window.addEventListener('keypress', (e)=>{
    // Verificando se a tecla pressionada foi  Enter
    if (e.key == "Enter"){
        checkInput()
    }
})

// criando /carregando o localstorage
   const tasks = JSON.parse(window.localStorage.getItem("tasks")) || []
   for (const task of tasks){
    addTarefa(task)
   }