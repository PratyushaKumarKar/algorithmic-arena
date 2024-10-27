
    
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function buildTreeNode(values) {
    if (!values.length) return null;
    const root = new TreeNode(parseInt(values[0], 10));
    const queue = [root];
    let i = 1;
    while (queue.length && i < values.length) {
        const node = queue.shift();
        if (values[i] !== 'null') {
            node.left = new TreeNode(parseInt(values[i], 10));
            queue.push(node.left);
        }
        i++;
        if (i < values.length && values[i] !== 'null') {
            node.right = new TreeNode(parseInt(values[i], 10));
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

function printTreeNode(root) {
    const result = [];
    const queue = [root];
    while (queue.length) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push('null');
        }
    }
    console.log(result.join(' '));
}


    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/insert-into a binary search tree/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const root = buildTreeNode(input);
  const val = parseInt(input.shift() || "0");
const result = insertIntoBST(root, val);
printTreeNode(result);
    