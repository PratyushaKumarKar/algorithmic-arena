#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>


struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

//##USER_CODE_HERE


int main() {
    
int n;
std::cin >> n;
std::vector<TreeNode*> nodes(n, nullptr);
std::vector<int> left_indices(n, -1);
std::vector<int> right_indices(n, -1);

for (int i = 0; i < n; ++i) {
    int val, l, r;
    std::cin >> val >> l >> r;
    nodes[i] = new TreeNode(val);
    left_indices[i] = l;
    right_indices[i] = r;
}

for (int i = 0; i < n; ++i) {
    if (left_indices[i] != -1) {
        nodes[i]->left = nodes[left_indices[i]];
    }
    if (right_indices[i] != -1) {
        nodes[i]->right = nodes[right_indices[i]];
    }
}

TreeNode* root = nodes[0];

int val;
std::cin >> val;
    Solution obj;
    TreeNode* result = obj.insertIntoBST(root, val);
    
std::queue<TreeNode*> q;
q.push(result);
while (!q.empty()) {
  TreeNode* node = q.front(); q.pop();
  if (node) {
      std::cout << node->val << " ";
      q.push(node->left);
      q.push(node->right);
  } else {
      std::cout << "null ";
  }
}
std::cout << std::endl;
    return 0;
}
