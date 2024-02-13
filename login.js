
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}


class LinkedList {
    constructor() {
        this.head = null;
    }

    add(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    remove(data) {
        if (!this.head) {
            return;
        }
        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.data === data) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }


    search(data) {
        let current = this.head;
        while (current) {
            if (current.data === data) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}

const users = new LinkedList();
users.add({ username: "Benito", password: "Turtlemaster312" });
users.add({ username: "Ian", password: "Goodname06" });
users.add({ username: "Jinxunhe", password: "FairlyJudged12" });

document.getElementById('loginForm').onsubmit = function() {
    const username = this.username.value;
    const password = this.password.value;
    const user = users.search({ username, password });
    if (user) {
        window.location.href = 'index.html';
        return false;
    } else {
        alert("Incorrect username or password!");
        return false;
    }
};
