#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>



//##USER_CODE_HERE


int main() {
    int m_matrix;
std::cin >> m_matrix;
int n_matrix;
std::cin >> n_matrix;
std::vector<std::vector<int>> matrix(m_matrix, std::vector<int>(n_matrix));

for(int i = 0; i < m_matrix; ++i) {
    for(int j = 0; j < n_matrix; ++j) {
        std::cin >> matrix[i][j];
    }
}
int target;
std::cin >> target;
    Solution obj;
    bool result = obj.searchMatrix(matrix, target);
    std::cout << (result ? "true" : "false") << std::endl;
    return 0;
}
