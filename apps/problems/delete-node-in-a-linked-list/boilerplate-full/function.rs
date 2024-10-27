use std::fs::read_to_string;
        use std::io::{self};
        use std::str::Lines;
       
    
       
      #[derive(Debug)]
      struct ListNode {
          val: i32,
          next: Option<Box<ListNode>>,
      }
      
      impl ListNode {
          fn new(val: i32) -> Self {
              ListNode { val, next: None }
          }
      }
      

    //##USER_CODE_HERE##

    fn main() -> io::Result<()> {
      let input = read_to_string("/dev/problems/delete-node in a linked list/tests/inputs/##INPUT_FILE_INDEX##.txt")?;
      let mut lines = input.lines();
      
      let n_node: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
      let node = build_list_node(&mut lines, n_node);
  let del: i32 = lines.next().unwrap().parse().unwrap();
      let result = Solution::deleteNode(node, del);
      println!("{}", result);
      Ok(())
    }
      fn build_list_node(lines: &mut Lines, n: usize) -> Option<Box<ListNode>> {
          let mut head: Option<Box<ListNode>> = None;
          let mut tail = &mut head;
          if let Some(line) = lines.next() {
              for val_str in line.split_whitespace().take(n) {
                  if let Ok(val) = val_str.parse::<i32>() {
                      let new_node = Box::new(ListNode::new(val));
                      if tail.is_none() {
                          *tail = Some(new_node);
                      } else {
                          tail.as_mut().unwrap().next = Some(new_node);
                          tail = &mut tail.as_mut().unwrap().next;
                      }
                  }
              }
          }
          head
      }
      
      fn print_list_node(head: &Option<Box<ListNode>>) {
          let mut current = head;
          while let Some(node) = current {
              print!("{}", node.val);
              if node.next.is_some() {
                  print!(" ");
              }
              current = &node.next;
          }
          println!();
      }
      
    
