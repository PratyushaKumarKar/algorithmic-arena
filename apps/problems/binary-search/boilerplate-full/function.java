
      import java.io.*;
      import java.util.*;
  
      //##USER_CODE_HERE##
  
      public class Main {
        
      public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int size_nums = Integer.parseInt(br.readLine().trim());
      List<Integer> nums = new ArrayList<>();
      String[] items_nums = br.readLine().trim().split("\\s+");
      for (int i = 0; i < size_nums; i++) {
        nums.add(Integer.parseInt(items_nums[i]));
      }
int target = Integer.parseInt(br.readLine().trim());
        Solution obj = new Solution();
        int result = obj.search(nums, target);
        System.out.println(result);
        br.close();
      }
      }
    