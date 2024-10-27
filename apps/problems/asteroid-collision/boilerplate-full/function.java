
    import java.io.*;
    import java.util.*;

    

    //##USER_CODE_HERE##

    public class Main {
      
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      int size_asteroids = Integer.parseInt(br.readLine().trim());
      List<Integer> asteroids = new ArrayList<>();
      String[] items_asteroids = br.readLine().trim().split("\\s+");
      for (int i = 0; i < size_asteroids; i++) {
        asteroids.add(Integer.parseInt(items_asteroids[i]));
      }
      Solution obj = new Solution();
      List<Integer> result = obj.collision(asteroids);
      
  for (Integer item : result) {
    System.out.print(item + " ");
  }
  System.out.println();
      br.close();
    }
      
    }
  