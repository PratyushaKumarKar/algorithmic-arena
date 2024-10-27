
    import java.io.*;
    import java.util.*;

    
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}


    //##USER_CODE_HERE##

    public class Main {
      
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      
      int n_node = Integer.parseInt(br.readLine().trim());
      String[] listData_node = br.readLine().trim().split("\\s+");
      ListNode node = buildListNode(listData_node);
      
int del = Integer.parseInt(br.readLine().trim());
      Solution obj = new Solution();
      ListNode result = obj.deleteNode(node, del);
      printListNode(result);
      br.close();
    }
      
  static ListNode buildListNode(String[] data) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    for (String s : data) {
      current.next = new ListNode(Integer.parseInt(s));
      current = current.next;
    }
    return dummy.next;
  }

  static void printListNode(ListNode head) {
    ListNode current = head;
    while (current != null) {
      System.out.print(current.val);
      if (current.next != null) {
        System.out.print(" ");
      }
      current = current.next;
    }
    System.out.println();
  }

    }
  