#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>



//##USER_CODE_HERE


int main() {
    int m_height;
std::cin >> m_height;
std::vector<int> height(m_height);

for(int i = 0; i < m_height; ++i) {
    std::cin >> height[i];
}
    Solution obj;
    int result = obj.trap(height);
    std::cout << result << std::endl;
    return 0;
}
