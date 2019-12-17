let products;
let categories = [];
let chosenCategory;

// var buildEvent = new Event('build');

function createElem(tag, className) {
    let elem = document.createElement(tag);
    elem.className = className;
    return elem;
}

request('GET', 'https://cors-anywhere.herokuapp.com/http://uptime-auction-api.azurewebsites.net/api/Auction')
    .then(function (d1) {
        products = JSON.parse(d1.target.responseText);
        console.log(products);
        loadAllProducts();
    }).catch(function (reason) {
    console.log(reason);
});

function request(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    })
}

function loadAllProducts() {
    categories.splice(0);
    let categoryContainer = document.querySelector(".dropdown-menu");
    let productContainer = document.querySelector("#productsContainer");

    while (productContainer.hasChildNodes()) {
        productContainer.removeChild(productContainer.firstChild);
    }
    if (categoryContainer) {
        while (categoryContainer.hasChildNodes()) {
            categoryContainer.removeChild(categoryContainer.firstChild);
        }
    }


    let table = document.createElement("table");
    // table.addEventListener('build', function (e) { loadAllProducts() }, false);
    let table_row = document.createElement("tr");

    let table_head_name = document.createElement("th");
    let table_head_description = document.createElement("th");
    let table_head_date = document.createElement("th");
    let table_head_input = document.createElement("th");

    table_head_name.innerText = "Product Name";
    table_head_description.innerText = "Product Description";
    table_head_date.innerText = "Bidding ends";
    table_head_input.innerText = "Make a bid";

    table_row.appendChild(table_head_name);
    table_row.appendChild(table_head_description);
    table_row.appendChild(table_head_date);
    table_row.appendChild(table_head_input);

    table.appendChild(table_row);

    for (let i = 0; i < products.length; i++) {
        if (!checkDate(products[i])) {
            continue;
        }

        if (!categories.includes(products[i].productCategory)) {
            categories.push(products[i].productCategory);
            createCategory(products[i].productCategory);
        }
    }
    console.log(categories);
    if (chosenCategory) {
        if (!categories.includes(chosenCategory)) {
            // removeElementByClass("alert alert-success alert-dismissible fade show");
            chosenCategory = "";
            loadAllProducts();
        }
    }

    for (let i = 0; i < products.length; i++) {
        if ((!chosenCategory) || (chosenCategory && products[i].productCategory === chosenCategory)) {
            let table_row = document.createElement("tr");
            let table_data_name = document.createElement("td");
            let table_data_description = document.createElement("td");
            let table_data_date = document.createElement("td");
            let table_data_input = document.createElement("td");

            table_data_name.innerText = products[i].productName;
            table_data_description.innerText = products[i].productDescription;
            table_data_date.innerText = get_formatted_date_from_list(get_formatted_date_time_yyyy_mm_dd_hh_mm_ss(products[i].biddingEndDate));
            table_data_input.appendChild(create_table_input(products[i].productId, "form_" + i));

            table_row.appendChild(table_data_name);
            table_row.appendChild(table_data_description);
            table_row.appendChild(table_data_date);
            table_row.appendChild(table_data_input);

            table.appendChild(table_row);
        }
    }
    productContainer.appendChild(table);
}


function createCategory(category) {
    let categoryList = document.querySelector(".dropdown-menu");
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "dropdown-item");
    link.setAttribute("onclick", "chooseCategory(this);");
    link.innerText = category;
    categoryList.appendChild(link);
}


function chooseCategory(id) {
    if (chosenCategory) {
        chosenCategory = id.innerHTML;
        document.getElementById("chosenCategory").innerText = chosenCategory;
        loadAllProducts();
        return;
    }

    chosenCategory = id.innerHTML;

    let container = createElem("div", "alert alert-secondary alert-dismissible fade show");
    container.setAttribute("role", "alert");
    let categoryName = document.createElement("span");
    categoryName.setAttribute("id", "chosenCategory");
    categoryName.innerText = chosenCategory;
    container.appendChild(categoryName);

    let button = createElem("button", "close");
    button.setAttribute("type", "button");
    button.setAttribute("data-dismiss", "alert");
    button.setAttribute("aria-label", "Close");
    button.setAttribute("onclick", "resetCategory();");

    let span = document.createElement("span");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = "&times;";
    button.appendChild(span);
    container.appendChild(button);

    document.getElementById("categoryContainer").appendChild(container);
    loadAllProducts();
}


function resetCategory() {
    console.log("doing reset");
    chosenCategory = "";
    loadAllProducts();
}


function removeElementByClass(className) {
    let elem = document.querySelector(className);
    return elem.parentNode.removeChild(elem);
}

function get_formatted_date_time_yyyy_mm_dd_hh_mm_ss(dateTime) {
    let date = dateTime.toString().split("T")[0].split("-");
    let time = dateTime.toString().split("T")[1].replace('Z', '').split(":");

    return date.concat(time).map(function(item) {
        return parseInt(item, 10);
    });
}

function get_formatted_date_from_list(dates) {
    let strDates = [];

    let date = new Date();
    if (dates[3] >= 22) {
        dates[3] = (dates[3] + Math.abs(date.getTimezoneOffset() / 60)) - 24;
    }
    else {
        dates[3] += Math.abs(date.getTimezoneOffset() / 60);
    }

    for (let el of dates) {
        if (el < 10) {
            strDates.push("0" + el);
        }
        else {
            strDates.push("" + el);
        }
    }


    return `${strDates[0]}-${strDates[1]}-${strDates[2]} / ${strDates[3]}:${strDates[4]}:${strDates[5]}`
}

function checkDate(product) {
    let pdList = get_formatted_date_time_yyyy_mm_dd_hh_mm_ss(product.biddingEndDate);
    let productDate = new Date(pdList[0], pdList[1] - 1, pdList[2],
        pdList[3], pdList[4], pdList[5]);
    let currentDate = new Date();

    return productDate < currentDate;
}


function getProductById(productId) {
    for (let product of products) {
        if (productId === product.productId) {
            return product;
        }
    }
    return null;
}


function showResponseMessage(responseValue) {
    let responseMessage = document.createElement("b");
    if (responseValue) {
        responseMessage.setAttribute("class", "alert alert-success");
        responseMessage.innerText = "Bid added";
    }
    else {
        responseMessage.setAttribute("class", "alert alert-danger");
        responseMessage.innerText = "Could not make a bid with given information"
    }
    document.getElementById("alertContainer").appendChild(responseMessage);
    setTimeout(function() {document.getElementById('alertContainer').innerHTML='';},3000);
}


function create_table_input(productId, formId) {
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/add");
    form.setAttribute("id", formId);

    let input_hidden = document.createElement("input");
    input_hidden.hidden = true;
    input_hidden.type = "text";
    input_hidden.name = "productId";
    input_hidden.id = "productId";
    input_hidden.value = productId;

    let input_name = document.createElement("input");
    input_name.type = "text";
    input_name.name = "fullName";
    input_name.id = "fullName";
    input_name.placeholder = "Full Name";

    let input_bid = document.createElement("input");
    input_bid.type = "text";
    input_bid.name = "bidAmount";
    input_bid.id = "bidAmount";
    input_bid.placeholder = "Bid";

    let input_button = document.createElement("input");
    input_button.type = "submit";
    input_button.id = "submitButton";
    input_button.value = "Bid";

    form.appendChild(input_hidden);
    form.appendChild(input_name);
    form.appendChild(input_bid);
    form.appendChild(input_button);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!checkDate(getProductById(productId))) {
            console.log('That product is no longer on auction');
        }
        else {
            // get values with formId
            let product_form = document.getElementById(formId);
            let elements = product_form.getElementsByTagName("input");

            let items = {
                fullName: elements[1].value,
                productId: productId,
                bidAmount: elements[2].value
            };

            if (!items.fullName || !items.productId || !items.bidAmount) {
                loadAllProducts(products);
                showResponseMessage(false);
                return;
            }

            let options = {
                method: "post",
                body: JSON.stringify(items),
                headers: {
                    "Content-type": "application/json"
                }
            };
            fetch("http://localhost:8080/add", options).then(function (response) {
                loadAllProducts(products);
                showResponseMessage(response.ok);
            });
        }
    });
    return form;
}




var update_loop = setInterval(Main, 1000);

Main();

function Main(){

    var time = new Date();

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    if (document.querySelector("table")) {
        let pattern = /(.+\s\/\s)/i;
        let product_time = document.querySelector("table").getElementsByTagName("tr")[1].getElementsByTagName("td")[2].innerText;
        product_time = product_time.replace(pattern, '').split(":");

        let product_date = new Date();
        product_date.setHours(parseInt(product_time[0]));
        product_date.setMinutes(parseInt(product_time[1]));
        product_date.setSeconds(parseInt(product_time[2]));

        if (time >= product_date) {
            request('GET', 'https://cors-anywhere.herokuapp.com/http://uptime-auction-api.azurewebsites.net/api/Auction')
                .then(function (d1) {
                    products = JSON.parse(d1.target.responseText);
                    console.log(products);
                    loadAllProducts();
                }).catch(function (reason) {
                console.log(reason);
            });
        }
    }

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    document.getElementById("currentTime").innerHTML = 'Current time: ' + hours + ':' + minutes + ':' + seconds;
}

