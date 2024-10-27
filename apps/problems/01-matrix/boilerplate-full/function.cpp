#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>



//##USER_CODE_HERE


int main() {
    int m_mat;
std::cin >> m_mat;
int n_mat;
std::cin >> n_mat;
std::vector<std::vector<int>> mat(m_mat, std::vector<int>(n_mat));

for(int i = 0; i < m_mat; ++i) {
    for(int j = 0; j < n_mat; ++j) {
        std::cin >> mat[i][j];
    }
}
    Solution obj;
    std::vector<std::vector<int>> result = obj.matrix(mat);
    
for (const auto& row : result) {
  for (const auto& item : row) {
      std::cout << item << " ";
  }
  std::cout << std::endl;
}
    return 0;
}
