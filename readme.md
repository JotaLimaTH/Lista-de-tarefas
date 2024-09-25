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
Trata-se de algo bastante simples. Coloquei tudo dentro de uma tag `main`, e tem duas divs, sendo que a div em que está empacotado o restante do código possui a id `to-do-list`. Existe um `input` de tipo de texto, onde vai entrar nossa tarefa, um `button` que chama a função `addTask()` ao ser clicada, e uma `ul` vazia com a id `taskList`.
## CSS
O código CSS não está especialmente refinado, somente configura as divs para estar com `display: flex`, e para dar alguma aparência. Design de interfaces não é exatamente meu forte! 🤣
## Javascript
Aqui é onde entra a funcionalidade da lista de tarefas.  
O código possui cinco funções: `addTask()`, `deleteTask(index)`, `deleteAllTasks()`, `editTask(index)` e `getTasks()`.
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
Basicamente, a função vai pegar o valor do elemento input no HTML e colocar na constante `newTask`. Se a constante estiver vazia, a função dá return e acaba. Coloque um valor nesse input para funcionar!  
Também vai ser pêgo do localStorage a string `'taskList`, que vai ser parseada numa lista de objetos javascript. Caso essa string não exista, a constante vai ficar vazia.  
`taskList` então vai dar push em um objeto cujos atributos são:
```Javascript
{
    task: newTask, 
    finished: 'false'
}
```
`localStorage` vai setar nosso array, o `inputTask.value` vai receber o valor vazio e então a função `getTasks()` vai ser chamada. Acaba aqui nossa primeira função.
### deleteTask(index)
```Javascript
function deleteTask(index) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));

    getTasks();
}
```
Essa função recebe como parâmetro o index, que vai ser definido na função `getTasks` . Basicamente, vai ser definida a constante `taskList`, que vai fazer a mesma coisa que na outra função. Então, damos um splice no array para deletar o elemento do index. Por fim, setamos para o `localStorage` o array. Então chamamos o `getTasks()`
### deleteAllTasks()
```Javascript
function deleteAllTasks() {
    const taskListUl = document.getElementById("taskList");
    const taskListLi = taskListUl.querySelectorAll("li");
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    let removedCount = 0;
    
    taskListLi.forEach((li, index) => {
        const checkbox = li.querySelector("input[type='checkbox']");
        if (checkbox.checked){
            taskList.splice(index - removedCount, 1);
            removedCount++;
        }
    })
    localStorage.setItem("taskList", JSON.stringify(taskList));
    getTasks();
}
```
Essa função vai pegar o elemento de id `taskList` e colocar dentro de uma constante chamada `taskListUl`. Então, como o Javascript vai pegar a tag sem alteração nenhuma, precisamos que os li estejam dispostos em um array. Por isso, para o terror de qualquer um adepto ao código limpo, fazemos um `taskListUl.querySelectorAll("li")` para reunirmos num array todos os li e colocarmos na constante `taskListLi`. Não contente com tudo isso, vamos pegar do localStorage nossa string e tornar num array de JSON e armazenar na constante `taskList`. Haja redundância!
Vamos declarar uma variável chamada `removedCount`. Veremos para que ela serve.
Vamos usar um método `forEach((li, index) => ...)` no `taskListLi`. Inclusive, meu caríssimo programador estressado, se você for um cara iniciante, entenda que o `forEach` vai, basicamente, fazer um for dentro do seu array, e o primeiro parâmetro sempre vai ser o valor do elemento atual na iteração e o segundo sempre vai ser o índice dele. Entendido?
Ok, isso feito, dentro da função que está dentro do forEach, vamos declarar a constante `checkbox`, que vai apontar para o input de tipo checkbox no elemento da iteração da vez.
Então, vem o seguinte código:
```Javascript
if (checkbox.checked){
    taskList.splice(index - removedCount, 1);
    removedCount++;
}
```
Isso vai fazer algo bastante simples: se o checkbox estiver marcado, `taskList` vai usar um `splice` no index da vez, para deletar seu elemento. Então, `removedCount` vai incrementar. Se não houver isso, não vai dar o resultado esperado, pois, obviamente, se um elemento da lista for deletado, então os índices de cada elemento também vai ser alterado. Dessa forma, quando colocamos como parâmetro `index - removedCount`, estamos garantindo que o item que vai ser deletado na próxima iteração é exatamente aquele que marcamos.
Por fim, vem as seguintes linhas de código:
```Javascript
localStorage.setItem("taskList", JSON.stringify(taskList));
getTasks();
```
O `localStorage` vai definir seu elemento como o nosso `taskList`, já com as devidas alterações. Após isso, chamamos a função `getTasks()`.
### editTask(index)
```Javascript
function editTask(index) {
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    const newTask = prompt("Edite a tarefa");
    taskList[index].task = newTask;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    getTasks();
}
```
O código para essa função ainda está rudimentar. Basicamente, vamos transformar o que tá lá no `localStorage` em array de JSON, e vamos declarar a constante `newTask`, que vai ser um prompt. Então, vamos botar a `newTask` como o valor do item com valor do `index` da `taskList`. Então, transformamos a lista atualizada em string novamente e jogamos no `localStorage`. Então chamamos `getTasks()`.
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

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Excluir';
        buttonDelete.addEventListener('click', () => deleteTask(index));

        const buttonEdit = document.createElement('button');
        buttonEdit.textContent = "Editar";
        buttonEdit.addEventListener('click', () => editTask(index));

        li.appendChild(span);
        li.appendChild(checkbox);
        li.appendChild(buttonDelete);
        li.appendChild(buttonEdit);
        taskListUl.appendChild(li);
    });
}
```
Aqui é evidentemente o código mais chatinho. Esta aí um bom motivo para se odiar Javascript e DOM, por sinal!  
Vamos pegar a `ul` do HTML, e criamos a constante `taskListUl`, que vai ficar com seu innerHTML vazio. Então, declaramos `taskList` da mesma forma que nas outras funções, parseando a string no localStorage. Amigo, se você leu Clean Code, peço mil perdões por esses nomes!  
Agora vamos fazer outro `forEach(task, index)`.  
Então, dentro do `forEach`, vamos criar alguns elementos:
```Javascript
const li = document.createElement('li');

const span = document.createElement('span');
span.innerHTML = task.task;

const checkbox = document.createElement('input');
checkbox.type = "checkbox";

const buttonDelete = document.createElement('button');
const buttonEdit = document.createElement('button');
```
Inclusive, atenção: esse `span` vai receber o atributo task do nosso elemento atual na iteração. Por isso que fica `span.innerHTML = task.task`. Novamente, leitores de CleanCode e discípulos de Uncle Bob, mil perdões!  
Quanto a esse `buttonDelete`, ele vai receber uma função no onClick.
```Javascript
buttonDelete.textContent = 'Excluir';
buttonDelete.addEventListener('click', () => deleteTask(index));
```
Aliás, fica uma dica para os estressados programadores iniciantes: o `addEventListener` vai receber sempre o nome do evento (no caso, um click) e a declaração de uma função anônima (aqui em arrow function, apontando para `deleteTask(index)`). Em hipótese alguma coloque sem ser com função anônima, pois senão essa função vai ser chamada, se colocada com o parâmetro, ou então vai ir para o onClick sem parâmetro. Não diga que eu não avisei quando seu código estiver bugado!  
`buttonEdit` também vai receber uma função no onClick.
```Javascript
buttonEdit.textContent = "Editar";
buttonEdit.addEventListener('click', () => editTask(index));
```
Enfim, por fim, dá um append no seu `li` e no seu `taskListUl`. Teu código tá pronto!
```Javascript
li.appendChild(span);
li.appendChild(checkbox);
li.appendChild(buttonDelete);
li.appendChild(buttonEdit);
taskListUl.appendChild(li);
```