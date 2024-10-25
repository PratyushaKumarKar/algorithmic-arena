#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>

//##USER_CODE_HERE##


int main() {
    int m_board;
std::cin >> m_board;
int n_board;
std::cin >> n_board;
std::vector<std::vector<char>> board(m_board, std::vector<char>(n_board));

for(int i = 0; i < m_board; ++i) {
    for(int j = 0; j < n_board; ++j) {
        std::cin >> board[i][j];
    }
}
std::string word;
std::cin >> word;
    Solution obj;
    bool result = obj.exist(board, word);
    std::cout << (result ? "true" : "false") << std::endl;
    return 0;
}
