const { assert } = require("chai");

class BSTNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key, value) {
        this.root = this._insert(this.root, key, value);
    }

    _insert(node, key, value) {
        if (!node) {
            return new BSTNode(key, value);
        }

        if (key < node.key) {
            node.left = this._insert(node.left, key, value);
        } else if (key > node.key) {
            node.right = this._insert(node.right, key, value);
        } else {
            node.value = value; // перезапис
        }

        return node;
    }

    search(key) {
        return this._search(this.root, key);
    }

    _search(node, key) {
        if (!node || node.key === key) {
            return node ? node.value : null;
        }

        if (key < node.key) {
            return this._search(node.left, key);
        } else {
            return this._search(node.right, key);
        }
    }

    remove(key) {
        this.root = this._remove(this.root, key);
    }

    _remove(node, key) {
        if (!node) {
            return null;
        }

        if (key < node.key) {
            node.left = this._remove(node.left, key);
        } else if (key > node.key) {
            node.right = this._remove(node.right, key);
        } else {
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            }

            node.key = this._getMin(node.right).key;
            node.value = this._getMin(node.right).value;
            node.right = this._remove(node.right, node.key);
        }

        return node;
    }

    _getMin(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    traverse() {
        const result = [];
        this._traverse(this.root, result);
        return result;
    }

    _traverse(node, result) {
        if (node) {
            this._traverse(node.left, result);
            result.push({ key: node.key, value: node.value });
            this._traverse(node.right, result);
        }
    }
}



