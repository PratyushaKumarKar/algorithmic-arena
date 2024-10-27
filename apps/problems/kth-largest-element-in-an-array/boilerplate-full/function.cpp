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
int k;
std::cin >> k;
    Solution obj;
    int result = obj.findKthLargest(nums, k);
    std::cout << result << std::endl;
    return 0;
}
