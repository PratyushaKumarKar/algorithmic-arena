#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>


struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

//##USER_CODE_HERE


int main() {
    
int n;
std::cin >> n;
ListNode* head = nullptr;
ListNode* tail = nullptr;
for (int i = 0; i < n; ++i) {
    int val;
    std::cin >> val;
    ListNode* newNode = new ListNode(val);
    if (head == nullptr) {
        head = newNode;
        tail = newNode;
    } else {
        tail->next = newNode;
        tail = newNode;
    }
}

int val;
std::cin >> val;
    Solution obj;
    ListNode* result = obj.removeElements(head, val);
    
ListNode* current = result;
while (current) {
  std::cout << current->val;
  if (current->next) std::cout << " ";
  current = current->next;
}
std::cout << std::endl;
    return 0;
}
