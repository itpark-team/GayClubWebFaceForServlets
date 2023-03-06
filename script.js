function showUsers(users) {
    let tableUsersDiv = document.getElementById("tableUsersDiv");

    let html = "";

    html += `<table class="table">`;
    html += `<thead>
        <tr>
            <th>#</th>
            <th>Nickname</th>
            <th>Ticket Price</th>
        </tr>
        </thead>`;
    html += `<tbody>`;

    users.forEach((user, index) => {
        html += `<tr>
                <td>${index + 1}</td>
                <td>${user.nickname}</td>
                <td>${user.ticketPrice}</td>
            </tr>`;
    });

    html += `</tbody>`;
    html += `</table>`;

    tableUsersDiv.innerHTML = html;
}

async function loadAndShowUsers() {
    let response = await fetch("http://localhost:8080/users");

    if (response.ok) {
        let users = await response.json();
        showUsers(users);
    }
}

async function saveToServer(user) {
    let response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(user)
    });
}

async function buttonAddUser_Click() {
    let inputNicknameField = document.getElementById("input-nickname-field");
    let inputTicketPriceField = document.getElementById("input-ticket_price-field");

    let nickname = inputNicknameField.value.toString();
    let ticketPrice = inputTicketPriceField.value.toString();

    if (nickname === "") {
        alert("Вы не ввели никнейм");
        return;
    }

    if (ticketPrice === "") {
        alert("Вы не ввели стоимость билета");
        return;
    }

    let user = {
        id: 0,
        nickname: nickname,
        ticketPrice: ticketPrice
    };

    await saveToServer(user);

    inputNicknameField.value = "";
    inputTicketPriceField.value = "";

    await loadAndShowUsers();
}

window.onload = loadAndShowUsers;
