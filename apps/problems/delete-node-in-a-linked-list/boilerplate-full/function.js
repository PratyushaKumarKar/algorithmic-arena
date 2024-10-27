
    
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function buildListNode(values) {
    let dummy = new ListNode();
    let current = dummy;
    values.forEach(val => {
        current.next = new ListNode(parseInt(val, 10));
        current = current.next;
    });
    return dummy.next;
}

function printListNode(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    console.log(result.join(' '));
}


    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/delete-node in a linked list/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const node = buildListNode(input.splice(0, parseInt(input.shift() || "0")));
  const del = parseInt(input.shift() || "0");
const result = deleteNode(node, del);
printListNode(result);
    