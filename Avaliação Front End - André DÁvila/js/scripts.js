const getDetails = JSON.parse(localStorage.getItem('details')) || [];
const details = document.getElementById('details');
const getDescription = JSON.parse(localStorage.getItem('description')) || [];
const description = document.getElementById('description');
const tableBody = document.getElementById('table-body');
const errands = JSON.parse(localStorage.getItem('errands')) || [];

function addErrands() {
    getDetails.push(details.value);
    getDescription.push(description.value);
    const object = {
        description: getDescription.splice(getDescription.length-1, 1),
        details:getDetails.splice(getDetails.length-1, 1)
    }

    errands.push(object);
    show();
    save();
}

function deleteErrands(positions) {
    errands.splice(positions, 1);

    save();
    show();
}

console.log(errands);

function editErrands(positions) {
    const editDescription = prompt('Editar descrição');
    const editDetail = prompt('Editar detalhe');
    for(item of errands) {
        console.log(item.description);
        const newInfo = {
            descriptions: item.description[positions] = editDescription,
            details: item.details[positions] = editDetail
        }

        errands.push(newInfo);
        errands.splice(errands.length - 1, 1);
    }

    show();
    save();
}

function save() {
    localStorage.setItem('errands', JSON.stringify(errands));
}

function show() {
    tableBody.innerText = '';
        for(item of errands) {
            console.log(item);
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const containerButton = document.createElement('div');
            const changeButton = document.createElement('div');
            const deleteButton = document.createElement('div');

            const position = errands.indexOf(item);

            th.setAttribute('scope', 'row');
            th.setAttribute('class', 'text-center');
            td1.setAttribute('class', 'text-center info');
            td2.setAttribute('class', 'text-center info');
            td3.setAttribute('class', 'text-center d-flex align-items-center justify-content-around');
            containerButton.setAttribute('class', 'd-flex flex-row');
            changeButton.setAttribute('class', 'button-table rounded-3 me-2 btn btn-success btn-edit')
            changeButton.setAttribute('onclick', `editErrands(${position})`);
            deleteButton.setAttribute('class', 'button-table rounded-3 btn btn-danger btn-switchoff');
            deleteButton.setAttribute('onclick', `deleteErrands(${position})`);

            tableBody.appendChild(tr);
            tr.appendChild(th);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            td3.appendChild(containerButton);
            containerButton.appendChild(changeButton);
            containerButton.appendChild(deleteButton);

            td1.innerText = item.description;
            td2.innerText = item.details;

            th.innerText = position + 1;
            changeButton.innerText = 'Editar';
            deleteButton.innerText = 'Apagar';
        }
}

show();//para exibir os recados já salvos no LocalStorage