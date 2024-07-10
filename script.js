function maskPassword(pass) {
    return '*'.repeat(pass.length);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 2000);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
}

const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
    } else {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
        let arr = JSON.parse(data);
        let str = "";
        arr.forEach((element) => {
            str += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.png" alt="Copy Button"></td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.png" alt="Copy Button"></td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.png" alt="Copy Button"></td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        });
        tb.innerHTML += str;
    }
    document.getElementById("passwordForm").reset();
}

document.addEventListener("DOMContentLoaded", () => {
    showPasswords();

    document.querySelector(".btn").addEventListener("click", (e) => {
        e.preventDefault();
        let website = document.getElementById("website").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let passwords = localStorage.getItem("passwords");
        let json = passwords ? JSON.parse(passwords) : [];
        json.push({ website, username, password });
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json));
        showPasswords();
    });
});
