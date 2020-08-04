console.log('This is post master');

let count = 0

// utility function 
function addParams(div, string) {
    div.innerHTML = string;
    return div.firstElementChild;
}



// show and hide json and paramiter 

// Request JSON 
document.getElementById('paramsBox').style.display = 'none';

// show the json box 
let reJson = document.getElementById('jsonRadio')
reJson.addEventListener('click', () => {
    document.getElementById('jsonBox').style.display = 'block';
    document.getElementById('paramsBox').style.display = 'none';
});

// show the paramiter box 
let reparms = document.getElementById('paramRadio')
reparms.addEventListener('click', () => {
    document.getElementById('paramsBox').style.display = 'block';
    document.getElementById('jsonBox').style.display = 'none';
})

// ading the more parame box 

let addbutton = document.getElementById('add')
addbutton.addEventListener('click', () => {
    let moreparams = document.getElementById('moreparam')
    let string;
    string = ` <div class="my-2 row" id="deleteBox-${count + 2}">
                    <label for="Rtext" class="col-sm-2 col-form-label">Paramiter ${count + 2}</label>
                    <div class="col-sm-9">
                        <div class="row g-3">
                            <div class="col-sm-6">
                                <input type="text" id='kyeParams${count + 2}' class="form-control" placeholder="kye name ${count + 2}"
                                aria-label="First name">
                            </div>
                            <div class="col-sm-6">
                                <input type="text" id='valueParams${count + 2}' class="form-control" placeholder="value name ${count + 2}" aria-label="Last name">
                            </div>

                            
                            
                        </div>
                            
                    </div>
                            
                    <button class="btn btn-primary col-md-1 deletebutton" id="id="less-${count + 2}">-</button>
                    </div>`
    // <input type="button" class="btn btn-primary col-md-1 deletebutton" value="-" id="less-${count + 2}">▬

    moreparams.innerHTML += string

    let deletparam = document.getElementsByClassName('deletebutton')
    for (let itme of deletparam) {
        itme.addEventListener('click', (e) => {
            e.target.parentElement.remove();

        })
    }

    count++;
});

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();

    let respose = document.getElementById('responcePcode')
    respose.innerHTML = 'Processing.....'
    let Hstring;
    let requestTypeV = document.querySelector("input[name='Rtype']:checked").value;
    let contenteTypeV = document.querySelector("input[name='Ctype']:checked").value;
    let url = document.getElementById('url').value;

    // console.log(requestTypeV,contenteTypeV);
    let data = {}
    if (contenteTypeV === 'customParameters') {
        for (let i = 0; i < count + 1; i++) {
            if (document.getElementById(`kyeParams${i + 1}`) != undefined) {
                let key = document.getElementById(`kyeParams${i + 1}`).value;
                let value = document.getElementById(`valueParams${i + 1}`).value;
                data[key] = value
            }
        }
        data = JSON.stringify(data)
        // console.log(data);
    } else {
        data = document.getElementById('Rjson').value
        // console.log(data);
    };

    if (requestTypeV === 'GET') {
        fetch(url, {
            method: 'GET'
        }).then(respose => respose.text())
            .then(data => {
                respose.innerHTML = data
                Prism.highlightAll();
            })
    } else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text())
            .then(data => {
                respose.innerHTML = data
                Prism.highlightAll();
            })
    }

    Hstring = `<li> <div class="method"> <strong class="${requestTypeV}">${requestTypeV} -</strong></div> <div class="urlHistory overflow-auto"> ${url} </div></li>`


    document.getElementById('historyList').innerHTML += Hstring
});



// element.style {
//     background: black;
//     color: white;
// }

// mak dark Them
let darkThem = document.getElementById('Dark')
darkThem.addEventListener('click', () => {
    document.body.style.background = 'black'
    document.body.style.color = 'white'
    document.getElementById('mainrowId').style.background = '#c5c5c53b'
})
// mak light them 
let lightThem = document.getElementById('Light')
lightThem.addEventListener('click', () => {
    document.body.style.background = 'unset'
    document.body.style.color = 'unset'
    document.getElementById('mainrowId').style.background = '#1313134d'
})



