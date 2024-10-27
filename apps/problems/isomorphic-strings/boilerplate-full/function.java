
    import java.io.*;
    import java.util.*;

    

    //##USER_CODE_HERE##

    public class Main {
      
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      String s = br.readLine().trim();
String t = br.readLine().trim();
      Solution obj = new Solution();
      boolean result = obj.isIsomorphic(s, t);
      System.out.println(result);
      br.close();
    }
      
    }
  