
    import java.io.*;
    import java.util.*;

    

    //##USER_CODE_HERE##

    public class Main {
      
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      int rows_board = Integer.parseInt(br.readLine().trim());
        int cols_board = Integer.parseInt(br.readLine().trim());
        char[][] board = new char[rows_board][cols_board];
        for (int i = 0; i < rows_board; i++) {
          String line = br.readLine().trim().replace(" ", "");
          for (int j = 0; j < cols_board; j++) {
            board[i][j] = line.charAt(j);
          }
        }
String word = br.readLine().trim();
      Solution obj = new Solution();
      boolean result = obj.exist(board, word);
      System.out.println(result);
      br.close();
    }
      
    }
  