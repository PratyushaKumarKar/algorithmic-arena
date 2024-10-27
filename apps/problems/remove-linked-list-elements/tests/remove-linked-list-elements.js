function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

function createLinkedList(arr) {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function linkedListToArray(head) {
    let arr = [];
    let current = head;
    while (current !== null) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
}

function removeElements(head, val) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;
    
    while (current.next !== null) {
        if (current.next.val === val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return dummy.next;
}

function generateTestCases() {
    let testCases = [];
    
    for (let i = 0; i < 50; i++) {
        let length = Math.floor(Math.random() * 20);
        let arr = [];
        for (let j = 0; j < length; j++) {
            arr.push(Math.floor(Math.random() * 50) + 1);
        }
        let val = Math.floor(Math.random() * 51);
        
        let input = createLinkedList(arr);
        let output = removeElements(input, val);
        
        testCases.push({
            input: { head: arr, val: val },
            output: linkedListToArray(output)
        });
    }
    
    return testCases;
}

console.log(JSON.stringify(generateTestCases()));