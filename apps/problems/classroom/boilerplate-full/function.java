
      import java.io.*;
      import java.util.*;
  
      //##USER_CODE_HERE##
  
      public class Main {
        
      public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int size_arr = Integer.parseInt(br.readLine().trim());
      List<Integer> arr = new ArrayList<>();
      String[] items_arr = br.readLine().trim().split("\\s+");
      for (int i = 0; i < size_arr; i++) {
        arr.add(Integer.parseInt(items_arr[i]));
      }
        Solution obj = new Solution();
        int result = obj.classroom(arr);
        System.out.println(result);
        br.close();
      }
      }
    