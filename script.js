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

window.onload = async function () {
    let response = await fetch("http://localhost:8080/users");

    if (response.ok) {
        let users = await response.json();
        showUsers(users);
    }
};
