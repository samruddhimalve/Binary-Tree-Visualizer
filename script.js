// Generate stars background
const stars = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = Math.random() * 2 + 1 + 's';
    stars.appendChild(star);
}

// Node structure
class TreeNode {
    constructor(value, x, y) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
    }
}

let root = null;
const treeContainer = document.getElementById('treeContainer');

// Function to insert a node into the BST
function insertNode() {
    const value = parseInt(document.getElementById('inputValue').value);
    if (isNaN(value)) return;
    root = insert(root, value, window.innerWidth / 2, 120, 200); // Adjusted vertical offset to 120px
    renderTree(root);
    document.getElementById('inputValue').value = '';
}


// Recursive function to insert a node into the BST with adjustable spacing
function insert(node, value, x, y, spacing) {
    if (!node) return new TreeNode(value, x, y);
    if (value < node.value) {
        node.left = insert(node.left, value, x - spacing, y + 80, spacing / 2);
    } else {
        node.right = insert(node.right, value, x + spacing, y + 80, spacing / 2);
    }
    return node;
}

// Function to render the tree
function renderTree(node) {
    treeContainer.innerHTML = '';
    if (node) drawNode(node);
}

function drawNode(node) {
    const nodeElement = document.createElement('div');
    nodeElement.className = 'node';
    nodeElement.style.left = node.x + 'px';
    nodeElement.style.top = node.y + 'px';
    nodeElement.innerText = node.value;
    treeContainer.appendChild(nodeElement);

    if (node.left) {
        drawEdge(node, node.left);
        drawNode(node.left);
    }
    if (node.right) {
        drawEdge(node, node.right);
        drawNode(node.right);
    }
}

// Draw edges between nodes with fixed positioning
function drawEdge(fromNode, toNode) {
    const edge = document.createElement('div');
    edge.className = 'edge';
    
    // Calculate the center points of the nodes
    const x1 = fromNode.x + 20; // Assuming node width is 40px
    const y1 = fromNode.y + 20; // Assuming node height is 40px
    const x2 = toNode.x + 20;
    const y2 = toNode.y + 20;
    
    // Calculate length and angle
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    
    // Position the edge from the center of the starting node
    edge.style.width = length + 'px';
    edge.style.left = x1 + 'px';
    edge.style.top = y1 + 'px';
    
    // Set transform origin to the start of the edge and rotate
    edge.style.transformOrigin = '0 0';
    edge.style.transform = `rotate(${angle}deg)`;
    
    treeContainer.appendChild(edge);
}

// Reset the tree
function resetTree() {
    root = null;
    treeContainer.innerHTML = '';
}

function calculateTraversals() {
    document.getElementById('inorderDisplay').textContent = inorderTraversal(root).join(', ') || 'N/A';
    document.getElementById('preorderDisplay').textContent = preorderTraversal(root).join(', ') || 'N/A';
    document.getElementById('postorderDisplay').textContent = postorderTraversal(root).join(', ') || 'N/A';
}

function inorderTraversal(node) {
    if (!node) return [];
    return [...inorderTraversal(node.left), node.value, ...inorderTraversal(node.right)];
}

function preorderTraversal(node) {
    if (!node) return [];
    return [node.value, ...preorderTraversal(node.left), ...preorderTraversal(node.right)];
}

function postorderTraversal(node) {
    if (!node) return [];
    return [...postorderTraversal(node.left), ...postorderTraversal(node.right), node.value];
}

function insertNode() {
    const value = parseInt(document.getElementById('inputValue').value);
    if (isNaN(value)) return;
    root = insert(root, value, window.innerWidth / 2, 120, 200); // Adjusted vertical offset
    renderTree(root);
    calculateTraversals(); // Update traversal orders
    document.getElementById('inputValue').value = '';
}

function resetTree() {
    root = null;
    treeContainer.innerHTML = '';
    calculateTraversals(); // Clear traversal orders
}

