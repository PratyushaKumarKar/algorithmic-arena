#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>



//##USER_CODE_HERE


int main() {
    std::string s;
std::cin >> s;
std::string t;
std::cin >> t;
    Solution obj;
    bool result = obj.isIsomorphic(s, t);
    std::cout << (result ? "true" : "false") << std::endl;
    return 0;
}
