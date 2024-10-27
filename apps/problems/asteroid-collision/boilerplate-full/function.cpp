#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>



//##USER_CODE_HERE


int main() {
    int m_asteroids;
std::cin >> m_asteroids;
std::vector<int> asteroids(m_asteroids);

for(int i = 0; i < m_asteroids; ++i) {
    std::cin >> asteroids[i];
}
    Solution obj;
    std::vector<int> result = obj.collision(asteroids);
    
for (const auto& item : result) {
  std::cout << item << " ";
}
std::cout << std::endl;
    return 0;
}
