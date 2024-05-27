// Função para carregar os itens salvos do localStorage
function loadItems() {
    let printItem = document.getElementById('printItem');
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    
    items.forEach((item, index) => {
        addItemToDOM(item.text, index, item.crossed);
    });

    // Carregar o tema salvo
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

function addItemToDOM(item, index, crossed = false) {
    let printItem = document.getElementById('printItem');
    let itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');

    let itemText = document.createElement('div');
    itemText.textContent = item;
    if (crossed) {
        itemText.classList.add('crossed');
    }
    itemText.onclick = function() {
        toggleCrossed(index);
    };

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.onclick = function() {
        removeItem(index);
    };

    itemContainer.appendChild(itemText);
    itemContainer.appendChild(deleteButton);

    printItem.appendChild(itemContainer);
}

function btnClick() {
    let item = document.getElementById('item').value;

    if (item) {
        // Adiciona o novo item ao DOM
        let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        items.push({ text: item, crossed: false });
        localStorage.setItem('shoppingList', JSON.stringify(items));

        addItemToDOM(item, items.length - 1);

        // Limpa o campo de entrada
        document.getElementById('item').value = '';

        // Exibe o valor no console
        console.log(item);
    }
}

function removeItem(index) {
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(items));

    // Recarrega os itens no DOM
    document.getElementById('printItem').innerHTML = '';
    loadItems();
}

function toggleCrossed(index) {
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items[index].crossed = !items[index].crossed;
    localStorage.setItem('shoppingList', JSON.stringify(items));

    // Recarrega os itens no DOM
    document.getElementById('printItem').innerHTML = '';
    loadItems();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Salva a preferência do tema no localStorage
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Carrega os itens quando a página é carregada
window.onload = loadItems;