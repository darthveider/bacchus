(function() {

    function createElem(tag, className) {
        let elem = document.createElement(tag);
        elem.className = className;
        return elem;
    }

    request('GET', 'https://cors-anywhere.herokuapp.com/http://uptime-auction-api.azurewebsites.net/api/Auction')
        .then(function (d1) {
            let products = JSON.parse(d1.target.responseText);
            console.log(products);
            loadAllProducts(products);
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

    function loadAllProducts(products) {
        let container = document.querySelector(".container");
        let table = document.createElement("table");
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
            let pdList = get_formatted_date_time_yyyy_mm_dd_hh_mm_ss(products[i].biddingEndDate);
            let productDate = new Date(pdList[0], pdList[1] - 1, pdList[2],
                pdList[3], pdList[4], pdList[5]);
            let currentDate = new Date();

            if (productDate >= currentDate) {
                return;
            }

            let table_row = document.createElement("tr");

            let table_data_name = document.createElement("td");
            let table_data_description = document.createElement("td");
            let table_data_date = document.createElement("td");
            let table_data_input = document.createElement("td");

            table_data_name.innerText = products[i].productName;
            table_data_description.innerText = products[i].productDescription;
            table_data_date.innerText = get_formatted_date_from_list(get_formatted_date_time_yyyy_mm_dd_hh_mm_ss(products[i].biddingEndDate));
            table_data_input.appendChild(create_table_input(products[i].productId));

            table_row.appendChild(table_data_name);
            table_row.appendChild(table_data_description);
            table_row.appendChild(table_data_date);
            table_row.appendChild(table_data_input);

            table.appendChild(table_row);
        }
        container.appendChild(table);
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

        if (dates[3] >= 22) {
            dates[3] = dates[3] + 2 - 24;
        }
        else {
            dates[3] += 2;
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

    function create_table_input(product_id) {
        let form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "/add");

        let input_hidden = document.createElement("input");
        input_hidden.hidden = true;
        input_hidden.type = "text";
        input_hidden.name = "productId";
        input_hidden.id = "productId";
        input_hidden.value = product_id;

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
            console.log('form with product id ' + product_id + ' submitted');
        });

        return form;
    }

})();
