
    import java.io.*;
    import java.util.*;

    

    //##USER_CODE_HERE##

    public class Main {
      
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      int m_mat = Integer.parseInt(br.readLine().trim());
      int n_mat = Integer.parseInt(br.readLine().trim());
      List<List<Integer>> mat = new ArrayList<>();
      for (int i = 0; i < m_mat; i++) {
        List<Integer> innerList = new ArrayList<>();
        String[] row = br.readLine().trim().split("\\s+");
        for (int j = 0; j < n_mat; j++) {
          innerList.add(Integer.parseInt(row[j]));
        }
        mat.add(innerList);
      }
      Solution obj = new Solution();
      List<List<Integer>> result = obj.matrix(mat);
      
  for (List<Integer> row : result) {
    for (Integer item : row) {
      System.out.print(item + " ");
    }
    System.out.println();
  }
      br.close();
    }
      
    }
  