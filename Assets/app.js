function openNav() {
    document.getElementById("mySidebar").style.width = "100vw";
    document.getElementById("main").style.marginLeft = "0vw";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function getel(x) { return document.getElementById(x) }
var students = []

function toggleLoader(x) {
    x ? getel('loaderparent').style.display = 'block' : getel('loaderparent').style.display = 'none'
}


function ApiCallingMiddleWare(url, next) {
    toggleLoader(1);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            next(data);
            toggleLoader(0);
        })
        .catch(() => toggleLoader(0))
}

function PostRequestMiddleware(url, body, next) {
    toggleLoader(1);
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(res => res.json())
        .then(data => {
            toggleLoader(0)
            next(data)
        })
        .catch(() => {
            toggleLoader(0);
        })
}


function showStudentDetails(x) {

    ApiCallingMiddleWare('/Home/FindStudent/?id=' + x, (data) => {
        getel('DetailsTable').innerHTML = `
                    <tr>
                        <td>${data.Name}</td>
                        <td>${data.Email}</td>
                        <td>${data.ID}</td>
                        <td> ${data.Discipline} </td>
                        <td><button type="button" class="btn btn-primary">Edit</button>
                            <button type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                `
        ApiCallingMiddleWare('/Product/GetProductsOf/?owner=' + x, (datas) => {
            var root = getel('DetailsProductsTable')
            root.innerHTML = ''
            datas.forEach(dat => {
                var s = `
                        <tr>
                            <td>${dat.Name}</td>
                            <td>
                                <button type="button" class="btn btn-primary" onclick="showProductDetails(${dat.ID})">Details</button>
                        </tr>
                        `
                root.innerHTML += s
            });

            openNav()
        })

    })

}


function showProductDetails(id) {
    $('#productDetailsModal').modal("hide")
    ApiCallingMiddleWare('/Product/FindProduct/?id=' + id, (data) => {
        var root = getel('renderProductDetails')

        var s = `
                        <tr>
                            <th> Name </th>
                            <td> ${data.Name} </td>
                        </tr>
                        <tr>
                            <th> Owner </th>
                            <td> ${data.OwnerName} </td>
                        </tr>

                    `

        root.innerHTML = s;
        ApiCallingMiddleWare('/Cart/GetCustomers/?pd=' + id, (datas) => {

            var parent = getel('customersList')

            parent.innerHTML = ''

            datas.forEach(data => {

                var s = `<tr>

                    <td>${data.Name}</td>

                    <td>${data.Email}</td>

                    <td>${data.ID}</td>

                    <td>${data.Discipline}</td>

                    <td>${data.Offer}</td>
                                        
                    <td>

                    <button type="button" class="btn btn-primary" onclick="showStudentDetails(${data.ID})">Details</button>
                                        
                    </td>
                                    
                    </tr>`

                parent.innerHTML += s
            })

            $('#productDetailsModal').modal()

        })


    })
}


ApiCallingMiddleWare('/Home/GetAll', (data) => {
    students = data;
    renderStudentList(students)
})

function renderStudentList(datas) {
    var root = getel('detailsList')
    root.innerHTML = ''
    datas.forEach(data => {
        var s = `<tr>
                <td>${data.Name}</td>
                <td>${data.Discipline}</td>
                <td>${data.ID}</td>
                <td>
                    <button type="button" class="btn btn-primary" onclick="showStudentDetails(${data.ID})">Details</button>
                </td>
            </tr>`
        root.innerHTML += s
    });
}

var Disciplines = [];
ApiCallingMiddleWare('/Home/GetAllDisciplines', (datas) => {
    Disciplines = datas;
    var root = getel('addnewStudentDeipdown')
    root.innerHTML = ''
    datas.forEach(data => {
        var s = `<option value=${data.DisciplineID}>${data.Name}</option>`
        root.innerHTML += s;

    })
})

getel('addNewStudentForm').onsubmit = (e) => {
    e.preventDefault()
    var data = {
        Name: getel('newName').value,
        Email: getel('newMail').value,
        DisciplineID: getel('addnewStudentDeipdown').value
    }
    PostRequestMiddleware('/Home/AddNewStudent', data, (resp) => {
        if (resp != -1) {
            var std = {
                ...data,
                ID: resp,
                Discipline: Disciplines.find((x) => x.DisciplineID == data.DisciplineID)
            }
            students.push(std);
            renderStudentList(students);
        }
    })
}