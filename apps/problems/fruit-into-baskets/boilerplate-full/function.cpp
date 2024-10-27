#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>



//##USER_CODE_HERE


int main() {
    int m_fruits;
std::cin >> m_fruits;
std::vector<int> fruits(m_fruits);

for(int i = 0; i < m_fruits; ++i) {
    std::cin >> fruits[i];
}
    Solution obj;
    int result = obj.totalFruit(fruits);
    std::cout << result << std::endl;
    return 0;
}
