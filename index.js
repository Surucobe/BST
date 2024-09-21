//sort and remove duplicates!
const test = [10, 6, 15, 3, 8, 20]; // Output: 3, 6, 8, 10, 15, 20

class Node {
  constructor(value){
    this.data = value;
    this.left = null;
    this.rigth = null;
    this.level = 0;
  }
}

class Tree {
  constructor(){
    this.root = null;
  }

  buildTree(array){
    array.forEach(element => this.insert(element));
  }

  insert(value){
    const newNode = new Node(value);

    if(this.root === null){
      this.root = newNode;
    }else{
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode){
    if(newNode.data < node.data){
      if(node.left === null){
        node.left = newNode;
        newNode.level = node.level + 1
      }else{
        this.insertNode(node.left, newNode);
      }
    }else{
      if(node.rigth === null){
        node.rigth = newNode;
        newNode.level = node.level + 1
      }else{
        this.insertNode(node.rigth, newNode);
      }
    }
  }

  inOrder(callback, node = this.root){
    if(!callback){
      throw new Error('A callback was expected but none was pass');
    }

    if(node !== null){
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.rigth);
    }
  }

  preOrder(callback,node = this.root){
    if(!callback){
      throw new Error('A callback was expected but none was pass');
    }

    if(node !== null){
      callback(node);
      this.preOrder(callback,node.left);
      this.preOrder(callback, node.rigth);
    }
  }

  postOrder(callback, node = this.root){
    if(!callback){
      throw new Error('A callback was expected but none was pass');
    }

    if(node !== null){
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.rigth);
      callback(node);
    }
  }

  find(value, node = this.root){
    if(node === null){
      return null;
    }

    if(value === node.data){
      return node;
    } else if(value < node.data){
      return this.find(value, node.left);
    }else{
      return this.find(value, node.rigth);
    }
  }

  levelOrder(callback){
    if(!callback){
      throw new Error('A callback was expected but none was pass');
    }
    
    if(this.root === null) return;

    const queue = [];

    queue.push(this.root);

    while(queue.length > 0){
      let currentNode = queue.shift();

      callback(currentNode);

      if(currentNode.left !== null){
        queue.push(currentNode.left);
      }
      if(currentNode.rigth !== null){
        queue.push(currentNode.rigth);
      }
    }
  }

  height(node = this.root){
    if(node === null) return -1;

    let level = 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.rigth);

    return level = level + ((Math.max(leftHeight, rightHeight))+1);
  }

  depth(value){
    return this.find(value).level;
  }

  balancedResult(){
    return this.isBalanced() === -1?
    'Tree is not Balanced':
    'Tree is Balanced'
  }

  isBalanced(node = this.root){
    if(node === null) return 0;

    const leftHeight = this.height(node.left);
    if(leftHeight === -1) return -1;

    const rightHeight = this.height(node.rigth);
    if(rightHeight === -1) return -1;

    if(Math.abs(leftHeight, rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight)+1;
  }

  rebalance() {
    const sortedArray = this.inOrder(); // Step 1: Get sorted array
    this.root = this.buildBalancedTree(sortedArray); // Step 2: Rebuild the tree from sorted array
  }

  // Helper function to build a balanced tree from sorted array
  buildBalancedTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    const mid = Math.floor(sortedArray.length / 2);
    const root = new Node(sortedArray[mid]);

    root.left = this.buildBalancedTree(sortedArray.slice(0, mid)); // Left half
    root.right = this.buildBalancedTree(sortedArray.slice(mid + 1)); // Right half

    return root;
  }

}

function printData(node) {
  console.log(`Node(s): ${node.data}`)
}

const bst = new Tree();
bst.buildTree(test);
// bst.inOrder(printData);
//console.log(bst.find(150))
//bst.levelOrder(printData);
//console.log(bst.height());
//console.log(bst.depth(3));
console.log(bst.balancedResult());