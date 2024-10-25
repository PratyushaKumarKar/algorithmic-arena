#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>

//##USER_CODE_HERE##


int main() {
    int num1;
std::cin >> num1;
int num2;
std::cin >> num2;
    Solution obj;
    int result = obj.sum(num1, num2);
    std::cout << result << std::endl;
    return 0;
}
