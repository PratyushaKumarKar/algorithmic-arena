use std::fs::read_to_string;
    use std::io::{self};
    use std::str::Lines;
    
    //##USER_CODE_HERE##
    
    fn main() -> io::Result<()> {
      let input = read_to_string("/dev/problems/word-search/tests/inputs/##INPUT_FILE_INDEX##.txt")?;
      let mut lines = input.lines();
      let size_board_outer: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
    let mut board: Vec<Vec<char>> = vec![];
    for _ in 0..size_board_outer {
      let row = lines.next().unwrap_or("").chars().collect::<Vec<char>>();
      board.push(row);
    }
  let word: String = lines.next().unwrap().to_string();
      let result = Solution::exist(board, word);
      println!("{}", result);
      Ok(())
    }
fn parse_input(lines: &mut Lines, size_arr: usize) -> Vec<i32> {
        lines.next()
            .unwrap_or_default()
            .split_whitespace()
            .filter_map(|x| x.parse::<i32>().ok())
            .collect()
    }
    
    fn parse_float(lines: &mut Lines, size_arr: usize) -> Vec<f64> {
        lines.next()
            .unwrap_or_default()
            .split_whitespace()
            .filter_map(|x| x.parse::<f64>().ok())
            .collect()
    }
    
    fn parse_char(lines: &mut Lines, size_arr: usize) -> Vec<char> {
        lines.next()
            .unwrap_or("")
            .chars()
            .collect()
    }
    
    fn parse_string(lines: &mut Lines, size_arr: usize) -> Vec<String> {
        lines.next()
            .unwrap_or("")
            .split_whitespace()
            .map(|x| x.to_string())
            .collect()
    }
    
    fn parse_bool(lines: &mut Lines, size_arr: usize) -> Vec<bool> {
        lines.next()
            .unwrap_or("")
            .split_whitespace()
            .map(|x| x == "true")
            .collect()
    }
    
    fn parse_input_matrix(lines: &mut Lines, size_arr: usize) -> Vec<i32> {
        parse_input(lines, size_arr)
    }
    
    fn parse_float_matrix(lines: &mut Lines, size_arr: usize) -> Vec<f64> {
        parse_float(lines, size_arr)
    }
    
    fn parse_char_matrix(lines: &mut Lines, size_arr: usize) -> Vec<char> {
        parse_char(lines, size_arr)
    }
    
    fn parse_string_matrix(lines: &mut Lines, size_arr: usize) -> Vec<String> {
        parse_string(lines, size_arr)
    }
    
    fn parse_bool_matrix(lines: &mut Lines, size_arr: usize) -> Vec<bool> {
        parse_bool(lines, size_arr)
    }
    