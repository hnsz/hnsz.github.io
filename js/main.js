class Product {
  constructor(name, pricevalue) {
    this.productname = name;
    this.pricevalue = pricevalue;
  }
}
class Euro {
  format(value) {
    const euro = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return euro.format(value);
  }
}

class ShopListEntry extends Product {


  constructor(product, amount) {
    super(product.productname, product.pricevalue);
    this.total = 0;
    this.updateAmount(amount);

  }

  updateAmount(amount) {
    this.amount = amount;
    this.total = amount * this.pricevalue

    console.log("update amount now total = " + this.pricevalue );
  }


}

let products = [
  new Product("boter", 2.49),
  new Product("jonge kaas, plakken", 1.69),
  new Product("eieren, doos 10st", 2.28),
  new Product("koffie", 3.45)
];

let euro = new Euro();



function initTable(thead, tbody) {
  let table = document.createElement('table');

  table.appendChild(thead);
  table.appendChild(tbody);
  document.body.appendChild(table);

  return table;
}
function initTHead(columnNames) {
  let thead = document.createElement('thead');
  let tr = document.createElement('td');
  columnNames.forEach(columnName => {
    let td = document.createElement('td');
    let textNode = document.createTextNode(columnName);
    td.appendChild(textNode);
    tr.appendChild(td);
  });
  thead.appendChild(tr);

  return thead;
}
function initTBody(shopListEntries) {
  let tbody = document.createElement('tbody');
  shopListEntries.forEach(shopListEntry => {
    let tableRow = initTRow(shopListEntry);
    tbody.appendChild(tableRow);
  });
  return tbody;
}

function initTRow(shopListEntry) {
  let tr = document.createElement('tr');


  let fieldProductname  = document.createTextNode(shopListEntry.productname);
  let fieldPricevalue  = document.createTextNode(shopListEntry.pricevalue);
  let fieldAmount = document.createElement("input");
  fieldAmount.type = "number";
  fieldAmount.name = `amount[${shopListEntry.productname}]`;
  fieldAmount.value = shopListEntry.amount;
  let fieldTotal = document.createTextNode(shopListEntry.total);

  let subscribedCommands = [
    () => {shopListEntry.updateAmount(Number.parseFloat(fieldAmount.value));},
    () => {fieldTotal.textContent = euro.format(shopListEntry.total);}
  ];
  fieldAmount.addEventListener('change', function amountChargeEventHandler() {
    subscribedCommands.forEach(command => {
      command();
    });
  });

  [fieldProductname,fieldPricevalue,fieldAmount,fieldTotal].forEach(field => {
    let td = document.createElement('td');
    td.appendChild(field);
    tr.appendChild(td);
  });

  return tr;
}
let shoplist = new Array();
function addToList(product, amount) {
  shoplist.push(new ShopListEntry(product, amount));
}
function renderTable() {

  products.forEach(product => {
    addToList(product, 1);
  });


  let thead = initTHead(['name', 'pricevalue', 'amount', 'total']);
  let tbody = initTBody(shoplist);
  let table = initTable(thead,tbody);


}

document.body.onload = renderTable();
