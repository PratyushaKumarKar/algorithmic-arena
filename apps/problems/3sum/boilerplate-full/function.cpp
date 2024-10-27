#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>



//##USER_CODE_HERE


int main() {
    int m_nums;
std::cin >> m_nums;
std::vector<int> nums(m_nums);

for(int i = 0; i < m_nums; ++i) {
    std::cin >> nums[i];
}
    Solution obj;
    std::vector<std::vector<int>> result = obj.threeSum(nums);
    
for (const auto& row : result) {
  for (const auto& item : row) {
      std::cout << item << " ";
  }
  std::cout << std::endl;
}
    return 0;
}
