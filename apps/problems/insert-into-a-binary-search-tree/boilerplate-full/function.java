
    import java.io.*;
    import java.util.*;

    
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}


    //##USER_CODE_HERE##

    public class Main {
      
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      
      String treeData_root = br.readLine().trim();
      TreeNode root = buildTreeNode(treeData_root);
      
int val = Integer.parseInt(br.readLine().trim());
      Solution obj = new Solution();
      TreeNode result = obj.insertIntoBST(root, val);
      printTreeNode(result);
      br.close();
    }
      
  static TreeNode buildTreeNode(String data) {
    // Implement tree building logic here
    return null;
  }

  static void printTreeNode(TreeNode root) {
    // Implement tree printing logic here
  }

    }
  