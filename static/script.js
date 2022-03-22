function renderTable(labels,fields, body){
  const conntentDiv = document.getElementById('conntent')
  if(conntentDiv.lastChild) conntentDiv.removeChild(conntentDiv.lastChild);

  const table = document.createElement('table');
  table.className="table";
  const thead = document.createElement('thead');
  const theadRow = document.createElement('tr');
  thead.appendChild(theadRow);
  const tbody = document.createElement('tbody');
  table.appendChild(thead)
  table.appendChild(tbody)

  labels.forEach( (label) => {
    let td = document.createElement('th');
    td.scope = "col"
    td.appendChild(document.createTextNode(label));
    theadRow.appendChild( td);
  })

  body.forEach( (item) => {
    const row = document.createElement('tr');
    tbody.appendChild(row);
    fields.forEach( (field) => {
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(item[field]));
        tbody.appendChild(td);
    })
  })
  conntentDiv.appendChild(table)
}

const checkBoxs = [
  document.getElementById('steamCheck'),
  document.getElementById('amazonCheck'),
  document.getElementById('gogCheck'),
  document.getElementById('originCheck'),
  document.getElementById('uplayCheck'),
  document.getElementById('epicCheck'),
]


function placeSteamTopSellers(topSelers){

  const imagesDiv = document.getElementById('images');
  while(imagesDiv.lastChild) imagesDiv.removeChild(imagesDiv.lastChild);

  topSelers.items.forEach( i => {
    const img  = document.createElement('img');
    img.src = i.large_capsule_image
    imagesDiv.appendChild(img);
  })
}

function printError(error){
  const errorDiv = document.getElementById('error');
  clearError()
  errorDiv.appendChild(document.createTextNode(error));
}

function clearError(){
  const errorDiv = document.getElementById('error');
  if(errorDiv.lastChild) errorDiv.removeChild(errorDiv.lastChild);
}

async function  getResult (e)  {

  const conntentDiv = document.getElementById('conntent')
  if(conntentDiv.lastChild) conntentDiv.removeChild(conntentDiv.lastChild);

  const titleInput = document.getElementById('gameTitle');
  const title = titleInput.value;

  selectedShops = []

  checkBoxs.forEach( chb => {
    if(chb.checked) selectedShops.push(chb.value)
  })

  const response = await fetch(`http://localhost:3000/game?title=${title}&shops=${selectedShops}`,{
    method: 'GET',
  })

  if(response.status != 200)
    return printError(await response.text());
  else
    clearError();

  const data = await response.json() 
  renderTable(
    ['Title','Shop','Price', 'Sale Praice'],
    ['title','store','normalPrice','salePrice'],
    data.searchResult
  )
  placeSteamTopSellers(data.topSellers)
}