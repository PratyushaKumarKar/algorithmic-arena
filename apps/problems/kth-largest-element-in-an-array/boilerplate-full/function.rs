use std::fs::read_to_string;
        use std::io::{self};
        use std::str::Lines;
       
    
       

    //##USER_CODE_HERE##

    fn main() -> io::Result<()> {
      let input = read_to_string("/dev/problems/kth-largest element in an array/tests/inputs/##INPUT_FILE_INDEX##.txt")?;
      let mut lines = input.lines();
      let size_nums: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
    let nums: Vec<i32> = parse_input(&mut lines, size_nums);
  let k: i32 = lines.next().unwrap().parse().unwrap();
      let result = Solution::findKthLargest(nums, k);
      println!("{}", result);
      Ok(())
    }
    
fn parse_input(lines: &mut Lines, size_outer: usize) -> Vec<i32> {
          lines.next()
              .unwrap_or_default()
              .split_whitespace()
              .filter_map(|x| x.parse::<i32>().ok())
              .collect()
      }
  
      fn parse_float(lines: &mut Lines, size_outer: usize) -> Vec<f64> {
          lines.next()
              .unwrap_or_default()
              .split_whitespace()
              .filter_map(|x| x.parse::<f64>().ok())
              .collect()
      }
  
      fn parse_char(lines: &mut Lines, size_outer: usize) -> Vec<char> {
          lines.next()
              .unwrap_or("")
              .chars()
              .collect()
      }
  
      fn parse_string(lines: &mut Lines, size_outer: usize) -> Vec<String> {
          lines.next()
              .unwrap_or("")
              .split_whitespace()
              .map(|x| x.to_string())
              .collect()
      }
  
      fn parse_bool(lines: &mut Lines, size_outer: usize) -> Vec<bool> {
          lines.next()
              .unwrap_or("")
              .split_whitespace()
              .map(|x| x == "true")
              .collect()
      }
  
      // Functions to parse 2D matrices for each data type
  
      fn parse_input_matrix(lines: &mut Lines, rows: usize, cols: usize) -> Vec<Vec<i32>> {
          (0..rows)
              .map(|_| lines.next()
                  .unwrap_or_default()
                  .split_whitespace()
                  .take(cols)
                  .filter_map(|x| x.parse::<i32>().ok())
                  .collect())
              .collect()
      }
  
      fn parse_float_matrix(lines: &mut Lines, rows: usize, cols: usize) -> Vec<Vec<f64>> {
          (0..rows)
              .map(|_| lines.next()
                  .unwrap_or_default()
                  .split_whitespace()
                  .take(cols)
                  .filter_map(|x| x.parse::<f64>().ok())
                  .collect())
              .collect()
      }
  
      fn parse_char_matrix(lines: &mut Lines, rows: usize, cols: usize) -> Vec<Vec<char>> {
          (0..rows)
              .map(|_| lines.next()
                  .unwrap_or("")
                  .chars()
                  .take(cols)
                  .collect())
              .collect()
      }
  
      fn parse_string_matrix(lines: &mut Lines, rows: usize, cols: usize) -> Vec<Vec<String>> {
          (0..rows)
              .map(|_| lines.next()
                  .unwrap_or("")
                  .split_whitespace()
                  .take(cols)
                  .map(|x| x.to_string())
                  .collect())
              .collect()
      }
  
      fn parse_bool_matrix(lines: &mut Lines, rows: usize, cols: usize) -> Vec<Vec<bool>> {
          (0..rows)
              .map(|_| lines.next()
                  .unwrap_or("")
                  .split_whitespace()
                  .take(cols)
                  .map(|x| x == "true")
                  .collect())
              .collect()
      }
