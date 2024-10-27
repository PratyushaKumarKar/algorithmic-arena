
    import java.io.*;
    import java.util.*;

    

    //##USER_CODE_HERE##

    public class Main {
      
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      int rows_matrix = Integer.parseInt(br.readLine().trim());
        int cols_matrix = Integer.parseInt(br.readLine().trim());
        int[][] matrix = new int[rows_matrix][cols_matrix];
        for (int i = 0; i < rows_matrix; i++) {
          String[] row = br.readLine().trim().split("\\s+");
          for (int j = 0; j < cols_matrix; j++) {
            matrix[i][j] = Integer.parseInt(row[j]);
          }
        }
int target = Integer.parseInt(br.readLine().trim());
      Solution obj = new Solution();
      boolean result = obj.searchMatrix(matrix, target);
      System.out.println(result);
      br.close();
    }
      
    }
  