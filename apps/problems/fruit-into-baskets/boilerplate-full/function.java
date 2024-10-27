
    import java.io.*;
    import java.util.*;

    

    //##USER_CODE_HERE##

    public class Main {
      
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      int size_fruits = Integer.parseInt(br.readLine().trim());
        int[] fruits = new int[size_fruits];
        String[] items_fruits = br.readLine().trim().split("\\s+");
        for (int i = 0; i < size_fruits; i++) {
          fruits[i] = Integer.parseInt(items_fruits[i]);
        }
      Solution obj = new Solution();
      int result = obj.totalFruit(fruits);
      System.out.println(result);
      br.close();
    }
      
    }
  