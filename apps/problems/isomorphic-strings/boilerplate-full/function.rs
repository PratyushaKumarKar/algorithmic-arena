use std::fs::read_to_string;
        use std::io::{self};
        use std::str::Lines;
       
    
       

    //##USER_CODE_HERE##

    fn main() -> io::Result<()> {
      let input = read_to_string("/dev/problems/isomorphic-strings/tests/inputs/##INPUT_FILE_INDEX##.txt")?;
      let mut lines = input.lines();
      let s: String = lines.next().unwrap().to_string();
  let t: String = lines.next().unwrap().to_string();
      let result = Solution::isIsomorphic(s, t);
      println!("{}", result);
      Ok(())
    }
    
