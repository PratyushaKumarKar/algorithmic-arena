
      import java.io.*;
      import java.util.*;
  
      //##USER_CODE_HERE##
  
      public class Main {
        
      public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int num1 = Integer.parseInt(br.readLine().trim());
int num2 = Integer.parseInt(br.readLine().trim());
        Solution obj = new Solution();
        int result = obj.sum(num1, num2);
        System.out.println(result);
        br.close();
      }
      }
    