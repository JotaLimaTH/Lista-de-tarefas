# Lista de tarefas
Esse é um pequeno exercício que fiz. Trata-se de uma lista de tarefas simples, que fiz baseado numa aula que tive.
## Tecnologias
- HTML
- CSS
- Javascript
## Visão geral do código
### HTML
A estrutura do HTML é esta:
```HTML
<main>
    <div id="to-do-list">
        <h1>Lista de tarefas</h1>
        <label for="new-task">Nova tarefa</label>
        <div>
            <input type="text" id="newTask" name="newTask" autocomplete="off" placeholder="&quot;Passear com o cachorro&quot;">
            <button onclick="addTask()">Adicionar</button>
            <ul id="taskList"></ul>
        </div>
    </div>
</main>
```
Trata-se de algo bastante simples. Coloquei tudo dentro de uma tag \`main\`, e tem duas divs, sendo que a div em que está empacotado o restante do código possui a id \`to-do-list\`. Existe um \`input\` de tipo de texto, onde vai entrar nossa tarefa, um \`button\` que chama a função \`addTask()\` ao ser clicada, e uma \`ul\` vazia com a id \`taskList\`.
## CSS
O código CSS não está especialmente refinado, somente configura as divs para estar com \`display: flex\`, e para dar alguma aparência. Design de interfaces não é exatamente meu forte! 🤣
## Javascript
Aqui é onde entra a funcionalidade da lista de tarefas.  
O código possui três funções: \`addTask()\`, \`deleteTask(index)\` e \`getTasks()\`.
### addTask()
```Javascript
function addTask() {
    const inputTask = document.getElementById("newTask");
    const newTask = inputTask.value;
    if (newTask.trim() == ""){
        return;
    }
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.push({ task: newTask, finished: 'false' })
    localStorage.setItem('taskList', JSON.stringify(taskList));
    inputTask.value = "";
    getTasks()    
}
```
Basicamente, a função vai pegar o valor do elemento input no HTML e colocar na constante \`newTask\`. Se a constante estiver vazia, a função dá return e acaba. Coloque um valor nesse input para funcionar!  
Também vai ser pêgo do localStorage a string \`'taskList\`, que vai ser parseada numa lista de objetos javascript. Caso essa string não exista, a constante vai ficar vazia.  
\`taskList\` então vai dar push em um objeto cujos atributos são:
```Javascript
{
    task: newTask, 
    finished: 'false'
}
```
\`localStorage\` vai setar nosso array, o \`inputTask.value\` vai receber o valor vazio e então a função \`getTasks()\` vai ser chamada. Acaba aqui nossa primeira função.
### deleteTask(index)
```Javascript
function deleteTask(index) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));

    getTasks();
}
```
Essa função recebe como parâmetro o index, que vai ser definido na função \`getTasks\` . Basicamente, vai ser definida a constante \`taskList\`, que vai fazer a mesma coisa que na outra função. Então, damos um splice no array para deletar o elemento do index. Por fim, setamos para o \`localStorage\` o array. Então chamamos o \`getTasks()\`
### getTasks()
```Javascript
function getTasks() {
    const taskListUl = document.getElementById("taskList");
    taskListUl.innerHTML = '';

    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

    taskList.forEach((task, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.innerHTML = task.task;

        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Excluir';
        buttonDelete.addEventListener('click', () => deleteTask(index));

        li.appendChild(span);
        li.appendChild(buttonDelete);

        taskListUl.appendChild(li);

        localStorage.removeItem("task");
    });
}
```
Aqui é evidentemente o código mais chatinho. Esta aí um bom motivo para se odiar Javascript e DOM, por sinal!  
Vamos pegar a \`ul\` do HTML, e criamos a constante \`taskListUl\`, que vai ficar com seu innerHTML vazio. Então, declaramos \`taskList\` da mesma forma que nas outras funções, parseando a string no localStorage. Amigo, se você leu Clean Code, peço mil perdões por esses nomes!  
Agora vamos fazer um \`forEach(task, index)\`. Inclusive, meu caríssimo programador estressado, se você for um cara iniciante, entenda que o \`forEach\` vai, basicamente, fazer um for dentro do seu array, e o primeiro parâmetro sempre vai ser o valor do elemento atual na iteração e o segundo sempre vai ser o índice dele. Entendido?  
Então, dentro do \`forEach\`, vamos criar alguns elementos:
```Javascript
const li = document.createElement('li');

const span = document.createElement('span');
span.innerHTML = task.task;

const buttonDelete = document.createElement('button');
```
Inclusive, atenção: esse \`span\` vai receber o atributo task do nosso elemento atual na iteração. Por isso que fica \`span.innerHTML = task.task\`. Novamente, leitores de CleanCode e discípulos de Uncle Bob, mil perdões!  
Quanto a esse \`buttonDelete\`, ele vai receber uma função no onClick.
```Javascript
buttonDelete.textContent = 'Excluir';
buttonDelete.addEventListener('click', () => deleteTask(index));
```
Aliás, fica uma dica para os estressados programadores iniciantes: o \`addEventListener\` vai receber sempre o nome do evento (no caso, um click) e a declaração de uma função anônima (aqui em arrow function, apontando para \`deleteTask(index)\`). Em hipótese alguma coloque sem ser com função anônima, pois senão essa função vai ser chamada, se colocada com o parâmetro, ou então vai ir para o onClick sem parâmetro. Não diga que eu não avisei quando seu código estiver bugado!  
Enfim, por fim, dá um append no seu \`li\` e no seu \`taskListUl\`. Teu código tá pronto!
```Javascript
li.appendChild(span);
li.appendChild(buttonDelete);
taskListUl.appendChild(li);
```