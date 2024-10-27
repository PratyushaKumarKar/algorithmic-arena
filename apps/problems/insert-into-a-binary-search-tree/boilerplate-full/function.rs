use std::fs::read_to_string;
        use std::io::{self};
        use std::str::Lines;
       use std::rc::Rc;
use std::cell::RefCell;
    
       
      #[derive(Debug)]
      struct TreeNode {
          val: i32,
          left: Option<Rc<RefCell<TreeNode>>>,
          right: Option<Rc<RefCell<TreeNode>>>,
      }
      
      impl TreeNode {
          fn new(val: i32) -> Self {
              TreeNode { val, left: None, right: None }
          }
      }
      

    //##USER_CODE_HERE##

    fn main() -> io::Result<()> {
      let input = read_to_string("/dev/problems/insert-into a binary search tree/tests/inputs/##INPUT_FILE_INDEX##.txt")?;
      let mut lines = input.lines();
      
      let tree_values_root: Vec<Option<i32>> = lines.next().unwrap_or("").split_whitespace()
          .map(|s| if s == "null" { None } else { s.parse::<i32>().ok() }).collect();
      let root = build_tree_node(&tree_values_root);
  let val: i32 = lines.next().unwrap().parse().unwrap();
      let result = Solution::insertIntoBST(root, val);
      println!("{}", result);
      Ok(())
    }
      fn build_tree_node(values: &[Option<i32>]) -> Option<Rc<RefCell<TreeNode>>> {
          if values.is_empty() || values[0].is_none() {
              return None;
          }
          let root = Rc::new(RefCell::new(TreeNode::new(values[0].unwrap())));
          let mut queue = std::collections::VecDeque::new();
          queue.push_back(root.clone());
          let mut i = 1;
          while !queue.is_empty() && i < values.len() {
              let current = queue.pop_front().unwrap();
              if let Some(Some(val)) = values.get(i) {
                  let left_node = Rc::new(RefCell::new(TreeNode::new(*val)));
                  current.borrow_mut().left = Some(left_node.clone());
                  queue.push_back(left_node);
              }
              i += 1;
              if let Some(Some(val)) = values.get(i) {
                  let right_node = Rc::new(RefCell::new(TreeNode::new(*val)));
                  current.borrow_mut().right = Some(right_node.clone());
                  queue.push_back(right_node);
              }
              i += 1;
          }
          Some(root)
      }
      
      fn print_tree_node(root: Option<Rc<RefCell<TreeNode>>>) {
          if root.is_none() {
              println!("null");
              return;
          }
          let mut result = Vec::new();
          let mut queue = std::collections::VecDeque::new();
          queue.push_back(root);
          while !queue.is_empty() {
              let node_option = queue.pop_front().unwrap();
              if let Some(node_rc) = node_option {
                  let node = node_rc.borrow();
                  result.push(node.val.to_string());
                  queue.push_back(node.left.clone());
                  queue.push_back(node.right.clone());
              } else {
                  result.push("null".to_string());
              }
          }
          while result.last() == Some(&"null".to_string()) {
              result.pop();
          }
          println!("{}", result.join(" "));
      }
      
    
