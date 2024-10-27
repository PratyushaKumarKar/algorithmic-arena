#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>



//##USER_CODE_HERE


int main() {
    int m_arr;
std::cin >> m_arr;
std::vector<int> arr(m_arr);

for(int i = 0; i < m_arr; ++i) {
    std::cin >> arr[i];
}
    Solution obj;
    int result = obj.maxElement(arr);
    std::cout << result << std::endl;
    return 0;
}
