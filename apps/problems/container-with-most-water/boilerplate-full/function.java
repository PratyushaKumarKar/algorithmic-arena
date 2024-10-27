
    import java.io.*;
    import java.util.*;

    

    //##USER_CODE_HERE##

    public class Main {
      
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      int size_height = Integer.parseInt(br.readLine().trim());
        int[] height = new int[size_height];
        String[] items_height = br.readLine().trim().split("\\s+");
        for (int i = 0; i < size_height; i++) {
          height[i] = Integer.parseInt(items_height[i]);
        }
      Solution obj = new Solution();
      int result = obj.maxArea(height);
      System.out.println(result);
      br.close();
    }
      
    }
  