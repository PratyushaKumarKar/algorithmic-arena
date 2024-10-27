export class FullProblemDefinitionParser {
  problemName: string = "";
  className: string = "Solution";
  functionName: string = "";
  outputType: string = "";
  inputFields: { type: string; name: string }[] = [];
  outputFields: { type: string; name: string }[] = [];

  parse(input: string): void {
    const lines = input.split("\n").map((line) => line.trim());
    let currentSection: string | null = null;

    for (const line of lines) {
      if (line.startsWith("Problem Name:")) {
        this.problemName = this.extractQuotedValue(line);
      } else if (line.startsWith("Class Name:")) {
        this.className = this.extractValue(line);
      } else if (line.startsWith("Function Name:")) {
        this.functionName = this.extractValue(line);
      } else if (line.startsWith("Input Structure:")) {
        currentSection = "input";
      } else if (line.startsWith("Output Structure:")) {
        currentSection = "output";
      } else if (line.startsWith("Input Field:")) {
        const field = this.extractField(line.replace("Input Field:", "Field:"));
        if (field) this.inputFields.push(field);
      } else if (line.startsWith("Output Field:")) {
        const field = this.extractField(line.replace("Output Field:", "Field:"));
        if (field) this.outputType = field.type;
      }
    }
  }

  extractQuotedValue(line: string): string {
    const match = line.match(/: "(.*)"$/);
    return match ? match[1] : "";
  }

  extractValue(line: string): string {
    const match = line.match(/: (\w+)$/);
    return match ? match[1] : "";
  }

  extractField(line: string): { type: string; name: string } | null {
    const match = line.match(/Field: (list<list<[^>]+>>|list<[^>]+>|[\w]+(?:\[\])*) (\w+)$/);
    return match ? { type: match[1], name: match[2] } : null;
  }

  generateCpp(): string {
    const className = this.sanitizeName(this.className);
    const functionName = this.sanitizeName(this.functionName);
    const outputType = this.mapTypeToCpp(this.outputType);
    const inputParams = this.inputFields
        .map((field) => `${this.mapTypeToCpp(field.type)} ${field.name}`)
        .join(", ");

    const requiresTreeNode = this.inputFields.some(field => field.type === 'TreeNode') || this.outputType === 'TreeNode';
    const requiresListNode = this.inputFields.some(field => field.type === 'ListNode') || this.outputType === 'ListNode';

    const mainFunction = `
int main() {
    ${this.generateCppInputReads()}
    ${className} obj;
    ${outputType} result = obj.${functionName}(${this.inputFields.map(field => field.name).join(", ")});
    ${this.generateCppOutputWrite('result')}
    return 0;
}`;

    let typeDefinitions = '';
    if (requiresTreeNode) {
        typeDefinitions += `
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};`;
    }
    if (requiresListNode) {
        typeDefinitions += `
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};`;
    }

    return `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <climits>

${typeDefinitions}

//##USER_CODE_HERE

${mainFunction}
`;
}

generateCppInputReads(): string {
    return this.inputFields.map(field => this.getCppInputRead(field)).join("\n");
}

generateCppOutputWrite(varName: string): string {
    const cppOutputType = this.mapTypeToCpp(this.outputType);
    if (cppOutputType === 'bool') {
        return `std::cout << (${varName} ? "true" : "false") << std::endl;`;
    } else if (cppOutputType === 'ListNode*') {
        return `
ListNode* current = ${varName};
while (current) {
    std::cout << current->val;
    if (current->next) std::cout << " ";
    current = current->next;
}
std::cout << std::endl;`;
    } else if (cppOutputType === 'TreeNode*') {
        return `
void printTree(TreeNode* root) {
    // Implement a method to print TreeNode
}

printTree(${varName});`;
    } else {
        return `std::cout << ${varName} << std::endl;`;
    }
}

getCppInputRead(field: { type: string; name: string }): string {
    const cppType = this.mapTypeToCpp(field.type);

    if (cppType === 'TreeNode*') {
        return `
int n;
std::cin >> n;
std::vector<TreeNode*> nodes(n, nullptr);
std::vector<int> left_indices(n, -1);
std::vector<int> right_indices(n, -1);

for (int i = 0; i < n; ++i) {
    int val, l, r;
    std::cin >> val >> l >> r;
    nodes[i] = new TreeNode(val);
    left_indices[i] = l;
    right_indices[i] = r;
}

for (int i = 0; i < n; ++i) {
    if (left_indices[i] != -1) {
        nodes[i]->left = nodes[left_indices[i]];
    }
    if (right_indices[i] != -1) {
        nodes[i]->right = nodes[right_indices[i]];
    }
}

TreeNode* ${field.name} = nodes[0];
`;
    } else if (cppType === 'ListNode*') {
        return `
int n;
std::cin >> n;
ListNode* ${field.name} = nullptr;
ListNode* tail = nullptr;
for (int i = 0; i < n; ++i) {
    int val;
    std::cin >> val;
    ListNode* newNode = new ListNode(val);
    if (${field.name} == nullptr) {
        ${field.name} = newNode;
        tail = newNode;
    } else {
        tail->next = newNode;
        tail = newNode;
    }
}
`;
    } else if (cppType.startsWith('std::vector<std::vector<char>>')) {
        return `int m_${field.name};
std::cin >> m_${field.name};
int n_${field.name};
std::cin >> n_${field.name};
std::vector<std::vector<char>> ${field.name}(m_${field.name}, std::vector<char>(n_${field.name}));

for(int i = 0; i < m_${field.name}; ++i) {
    for(int j = 0; j < n_${field.name}; ++j) {
        std::cin >> ${field.name}[i][j];
    }
}`;
    } else if (cppType.startsWith('std::vector<char>')) {
        return `int m_${field.name};
std::cin >> m_${field.name};
std::vector<char> ${field.name}(m_${field.name});

for(int i = 0; i < m_${field.name}; ++i) {
    std::cin >> ${field.name}[i];
}`;
    } else if (cppType.startsWith('std::vector<std::vector')) {
        const innerType = this.getInnerTypeCpp(this.getInnerTypeCpp(cppType));
        return `int m_${field.name};
std::cin >> m_${field.name};
int n_${field.name};
std::cin >> n_${field.name};
${cppType} ${field.name}(m_${field.name}, std::vector<${innerType}>(n_${field.name}));

for(int i = 0; i < m_${field.name}; ++i) {
    for(int j = 0; j < n_${field.name}; ++j) {
        std::cin >> ${field.name}[i][j];
    }
}`;
    } else if (cppType.startsWith('std::vector')) {
        const innerType = this.getInnerTypeCpp(cppType);
        return `int m_${field.name};
std::cin >> m_${field.name};
${cppType} ${field.name}(m_${field.name});

for(int i = 0; i < m_${field.name}; ++i) {
    std::cin >> ${field.name}[i];
}`;
    } else {
        return `${cppType} ${field.name};
std::cin >> ${field.name};`;
    }
}

getDefaultReturnValueCpp(type: string): string {
    if (type.startsWith('std::vector')) {
        return '{}';
    } else if (type === 'int' || type === 'double' || type === 'float') {
        return '0';
    } else if (type === 'bool') {
        return 'false';
    } else if (type === 'std::string') {
        return '""';
    } else {
        return '{}';
    }
}

getInnerTypeCpp(type: string): string {
    const match = type.match(/std::vector<(.+)>/);
    return match ? match[1] : type;
}

mapTypeToCpp(type: string): string {
    switch (type) {
        case "TreeNode":
            return "TreeNode*";
        case "ListNode":
            return "ListNode*";
        case "int":
            return "int";
        case "float":
            return "float";
        case "double":
            return "double";
        case "long":
            return "long";
        case "char":
            return "char";
        case "string":
            return "std::string";
        case "bool":
            return "bool";
        case "int[]":
            return "std::vector<int>";
        case "float[]":
            return "std::vector<float>";
        case "double[]":
            return "std::vector<double>";
        case "long[]":
            return "std::vector<long>";
        case "char[]":
            return "std::vector<char>";
        case "string[]":
            return "std::vector<std::string>";
        case "bool[]":
            return "std::vector<bool>";
        case "int[][]":
            return "std::vector<std::vector<int>>";
        case "float[][]":
            return "std::vector<std::vector<float>>";
        case "double[][]":
            return "std::vector<std::vector<double>>";
        case "long[][]":
            return "std::vector<std::vector<long>>";
        case "char[][]":
            return "std::vector<std::vector<char>>";
        case "string[][]":
            return "std::vector<std::vector<std::string>>";
        case "bool[][]":
            return "std::vector<std::vector<bool>>";
        case "list<int>":
            return "std::vector<int>";
        case "list<float>":
            return "std::vector<float>";
        case "list<double>":
            return "std::vector<double>";
        case "list<long>":
            return "std::vector<long>";
        case "list<char>":
            return "std::vector<char>";
        case "list<string>":
            return "std::vector<std::string>";
        case "list<bool>":
            return "std::vector<bool>";
        case "list<list<int>>":
            return "std::vector<std::vector<int>>";
        case "list<list<float>>":
            return "std::vector<std::vector<float>>";
        case "list<list<double>>":
            return "std::vector<std::vector<double>>";
        case "list<list<long>>":
            return "std::vector<std::vector<long>>";
        case "list<list<char>>":
            return "std::vector<std::vector<char>>";
        case "list<list<string>>":
            return "std::vector<std::vector<std::string>>";
        case "list<list<bool>>":
            return "std::vector<std::vector<bool>>";
        default:
            return "unknown";
    }
}
generateJava(): string {
  const className = this.sanitizeName(this.className);
  const functionName = this.sanitizeName(this.functionName);
  const outputType = this.mapTypeToJava(this.outputType);
  
  const mainFunction = `
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      ${this.generateJavaInputReads()}
      ${className} obj = new ${className}();
      ${outputType} result = obj.${functionName}(${this.inputFields.map(field => field.name).join(", ")});
      ${this.generateJavaOutputWrite('result')}
      br.close();
    }`;

  const requiresListNode = this.inputFields.some(field => this.mapTypeToJava(field.type) === 'ListNode') || outputType === 'ListNode';
  const requiresTreeNode = this.inputFields.some(field => this.mapTypeToJava(field.type) === 'TreeNode') || outputType === 'TreeNode';

  let typeDefinitions = '';

  if (requiresListNode) {
    typeDefinitions += `
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}
`;
  }

  if (requiresTreeNode) {
    typeDefinitions += `
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
`;
  }

  let helperMethods = '';

  if (requiresListNode) {
    helperMethods += `
  static ListNode buildListNode(String[] data) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    for (String s : data) {
      current.next = new ListNode(Integer.parseInt(s));
      current = current.next;
    }
    return dummy.next;
  }

  static void printListNode(ListNode head) {
    ListNode current = head;
    while (current != null) {
      System.out.print(current.val);
      if (current.next != null) {
        System.out.print(" ");
      }
      current = current.next;
    }
    System.out.println();
  }
`;
  }

  if (requiresTreeNode) {
    helperMethods += `
  static TreeNode buildTreeNode(String data) {
    // Implement tree building logic here
    return null;
  }

  static void printTreeNode(TreeNode root) {
    // Implement tree printing logic here
  }
`;
  }

  return `
    import java.io.*;
    import java.util.*;

    ${typeDefinitions}

    //##USER_CODE_HERE##

    public class Main {
      ${mainFunction}
      ${helperMethods}
    }
  `;
}
  
  generateJavaInputReads(): string {
    return this.inputFields.map(field => this.getJavaInputRead(field)).join("\n");
  }
  
  generateJavaOutputWrite(varName: string): string {
    const outputType = this.mapTypeToJava(this.outputType);
    if (outputType === 'ListNode') {
      return `printListNode(${varName});`;
    } else if (outputType === 'TreeNode') {
      return `printTreeNode(${varName});`;
    } else {
      return `System.out.println(${varName});`;
    }
  }
  
  getJavaInputRead(field: { type: string; name: string }): string {
    const javaType = this.mapTypeToJava(field.type);
  
    if (javaType.startsWith('List<List<')) {
      const innerType = this.getInnerTypeJava(this.getInnerTypeJava(javaType));
      const boxedInnerType = this.boxPrimitiveType(innerType);
      return `int m_${field.name} = Integer.parseInt(br.readLine().trim());
      int n_${field.name} = Integer.parseInt(br.readLine().trim());
      List<List<${boxedInnerType}>> ${field.name} = new ArrayList<>();
      for (int i = 0; i < m_${field.name}; i++) {
        List<${boxedInnerType}> innerList = new ArrayList<>();
        String[] row = br.readLine().trim().split("\\\\s+");
        for (int j = 0; j < n_${field.name}; j++) {
          innerList.add(${this.generateJavaNext(innerType, 'row[j]')});
        }
        ${field.name}.add(innerList);
      }`;
    } else if (javaType.startsWith('List<')) {
      const innerType = this.getInnerTypeJava(javaType);
      const boxedInnerType = this.boxPrimitiveType(innerType);
      return `int size_${field.name} = Integer.parseInt(br.readLine().trim());
      List<${boxedInnerType}> ${field.name} = new ArrayList<>();
      String[] items_${field.name} = br.readLine().trim().split("\\\\s+");
      for (int i = 0; i < size_${field.name}; i++) {
        ${field.name}.add(${this.generateJavaNext(innerType, 'items_' + field.name + '[i]')});
      }`;
    } else if (javaType.endsWith('[][]')) {
      const innerType = javaType.replace('[][]', '');
      if (innerType === 'char') {
        return `int rows_${field.name} = Integer.parseInt(br.readLine().trim());
        int cols_${field.name} = Integer.parseInt(br.readLine().trim());
        char[][] ${field.name} = new char[rows_${field.name}][cols_${field.name}];
        for (int i = 0; i < rows_${field.name}; i++) {
          String line = br.readLine().trim().replace(" ", "");
          for (int j = 0; j < cols_${field.name}; j++) {
            ${field.name}[i][j] = line.charAt(j);
          }
        }`;
      } else {
        return `int rows_${field.name} = Integer.parseInt(br.readLine().trim());
        int cols_${field.name} = Integer.parseInt(br.readLine().trim());
        ${innerType}[][] ${field.name} = new ${innerType}[rows_${field.name}][cols_${field.name}];
        for (int i = 0; i < rows_${field.name}; i++) {
          String[] row = br.readLine().trim().split("\\\\s+");
          for (int j = 0; j < cols_${field.name}; j++) {
            ${field.name}[i][j] = ${this.generateJavaNext(innerType, 'row[j]')};
          }
        }`;
      }
    } else if (javaType.endsWith('[]')) {
      const innerType = javaType.replace('[]', '');
      if (innerType === 'char') {
        return `int size_${field.name} = Integer.parseInt(br.readLine().trim());
        char[] ${field.name} = new char[size_${field.name}];
        String line = br.readLine().trim().replace(" ", "");
        for (int i = 0; i < size_${field.name}; i++) {
          ${field.name}[i] = line.charAt(i);
        }`;
      } else {
        return `int size_${field.name} = Integer.parseInt(br.readLine().trim());
        ${innerType}[] ${field.name} = new ${innerType}[size_${field.name}];
        String[] items_${field.name} = br.readLine().trim().split("\\\\s+");
        for (int i = 0; i < size_${field.name}; i++) {
          ${field.name}[i] = ${this.generateJavaNext(innerType, 'items_' + field.name + '[i]')};
        }`;
      }
    } else if (javaType === 'ListNode') {
      return `
      int n_${field.name} = Integer.parseInt(br.readLine().trim());
      String[] listData_${field.name} = br.readLine().trim().split("\\\\s+");
      ListNode ${field.name} = buildListNode(listData_${field.name});
      `;
    } else if (javaType === 'TreeNode') {
      return `
      String treeData_${field.name} = br.readLine().trim();
      TreeNode ${field.name} = buildTreeNode(treeData_${field.name});
      `;
    } else if (javaType === 'String') {
      return `String ${field.name} = br.readLine().trim();`;
    } else if (javaType === 'char' || javaType === 'Character') {
      return `char ${field.name} = br.readLine().trim().charAt(0);`;
    } else {
      return `${javaType} ${field.name} = ${this.generateJavaNext(javaType, 'br.readLine().trim()')};`;
    }
  }
  generateJavaNext(type: string, value: string): string {
    switch (type) {
      case 'int':
      case 'Integer':
        return `Integer.parseInt(${value})`;
      case 'double':
      case 'Double':
        return `Double.parseDouble(${value})`;
      case 'float':
      case 'Float':
        return `Float.parseFloat(${value})`;
      case 'long':
      case 'Long':
        return `Long.parseLong(${value})`;
      case 'boolean':
      case 'Boolean':
        return `Boolean.parseBoolean(${value})`;
      case 'String':
        return `${value}`;
      case 'char':
      case 'Character':
        return `${value}.charAt(0)`;
      default:
        return `${value}`; 
    }
}

  getDefaultReturnValueJava(type: string): string {
    if (type.startsWith('List')) {
      return 'new ArrayList<>()';
    } else if (type.endsWith('[]') || type.endsWith('[][]')) {
      const innerType = type.replace(/\[\]/g, '');
      return `new ${innerType}[0]`; 
    } else if (['int', 'double', 'float', 'long', 'short', 'byte'].includes(type)) {
      return '0';
    } else if (type === 'boolean') {
      return 'false';
    } else if (type === 'String') {
      return '""';
    } else if (type === 'char' || type === 'Character') {
      return "'\u0000'"; 
    } else {
      return 'null';
    }
  }
  
  getInnerTypeJava(type: string): string {
    const match = type.match(/List<(.+)>/);
    if (match) {
      return match[1].trim();
    }
    return type;
  }
  
  mapTypeToJava(type: string): string {
    switch (type) {
      case 'int':
        return 'int';
      case 'float':
        return 'float';
      case 'double':
        return 'double';
      case 'long':
        return 'long';
      case 'char':
        return 'char';
      case 'string':
      case 'String':
        return 'String';
      case 'bool':
      case 'boolean':
        return 'boolean';
      case 'ListNode':
        return 'ListNode';
      case 'TreeNode':
        return 'TreeNode';
      case 'void':
        return 'void';
      default:
        if (type.startsWith('list<')) {
          const innerType = type.substring(5, type.length - 1).trim();
          return `List<${this.boxPrimitiveType(this.mapTypeToJava(innerType))}>`;
        } else if (type.endsWith('[]')) {
          const innerType = type.replace('[]', '').trim();
          return `${this.mapTypeToJava(innerType)}[]`;
        } else if (type.endsWith('[][]')) {
          const innerType = type.replace('[][]', '').trim();
          return `${this.mapTypeToJava(innerType)}[][]`;
        } else {
          return 'Object'; 
        }
    }
  }

  boxPrimitiveType(type: string): string {
    switch (type) {
      case 'int':
        return 'Integer';
      case 'double':
        return 'Double';
      case 'float':
        return 'Float';
      case 'long':
        return 'Long';
      case 'char':
        return 'Character';
      case 'boolean':
        return 'Boolean';
      default:
        return type;
    }
  }
  
  sanitizeName(name: string): string {
    return name.replace(/[^a-zA-Z0-9_]/g, '_');
  }
     
  generateJs(): string {
    const inputReads = this.inputFields
      .map((field) => this.mapTypeToJs(field.type, field.name))
      .join("\n  ");

    const functionCall = `const result = ${this.functionName}(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = this.generateJsOutputWrite('result');

    const requiresListNode = this.inputFields.some(field => field.type === 'ListNode') || this.outputType === 'ListNode';
    const requiresTreeNode = this.inputFields.some(field => field.type === 'TreeNode') || this.outputType === 'TreeNode';

    let typeDefinitions = '';
    if (requiresListNode) {
        typeDefinitions += `
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function buildListNode(values) {
    let dummy = new ListNode();
    let current = dummy;
    values.forEach(val => {
        current.next = new ListNode(parseInt(val, 10));
        current = current.next;
    });
    return dummy.next;
}

function printListNode(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    console.log(result.join(' '));
}
`;
    }
    if (requiresTreeNode) {
        typeDefinitions += `
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function buildTreeNode(values) {
    if (!values.length) return null;
    const root = new TreeNode(parseInt(values[0], 10));
    const queue = [root];
    let i = 1;
    while (queue.length && i < values.length) {
        const node = queue.shift();
        if (values[i] !== 'null') {
            node.left = new TreeNode(parseInt(values[i], 10));
            queue.push(node.left);
        }
        i++;
        if (i < values.length && values[i] !== 'null') {
            node.right = new TreeNode(parseInt(values[i], 10));
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

function printTreeNode(root) {
    const result = [];
    const queue = [root];
    while (queue.length) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push('null');
        }
    }
    console.log(result.join(' '));
}
`;
    }

    return `
    ${typeDefinitions}

    //##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/${this.problemName.toLowerCase().replace(" ", "-")}/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\\n').join(' ').split(' ');
${inputReads}
${functionCall}
${outputWrite}
    `;
  }

    generateRust(): string {
      const requiresListNode = this.inputFields.some(field => field.type === 'ListNode') || this.outputType === 'ListNode';
      const requiresTreeNode = this.inputFields.some(field => field.type === 'TreeNode') || this.outputType === 'TreeNode';
    
      const inputReads = this.inputFields
        .map((field) => {
          if (field.type === 'ListNode') {
            return `
      let n_${field.name}: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
      let ${field.name} = build_list_node(&mut lines, n_${field.name});`;
          } else if (field.type === 'TreeNode') {
            return `
      let tree_values_${field.name}: Vec<Option<i32>> = lines.next().unwrap_or("").split_whitespace()
          .map(|s| if s == "null" { None } else { s.parse::<i32>().ok() }).collect();
      let ${field.name} = build_tree_node(&tree_values_${field.name});`;
          } else if (field.type.startsWith("list<list<char>") || field.type.startsWith("char[][]")) {
            return `let size_${field.name}_outer: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
      let mut ${field.name}: Vec<Vec<char>> = vec![];
      for _ in 0..size_${field.name}_outer {
        let row = lines.next().unwrap_or("").chars().collect::<Vec<char>>();
        ${field.name}.push(row);
      }`;
          } else if (field.type.startsWith("list<list<char>") || field.type.startsWith( "char[][]")) {
            return `let size_${field.name}_outer: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
    let mut ${field.name}: Vec<Vec<char>> = vec![];
    for _ in 0..size_${field.name}_outer {
      let row = lines.next().unwrap_or("").chars().collect::<Vec<char>>();
      ${field.name}.push(row);
    }`;
          } else if (field.type.startsWith("list<list<")) {
            return `let size_${field.name}_outer: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
    let mut ${field.name}: ${this.mapTypeToRust(field.type)} = vec![];
    for _ in 0..size_${field.name}_outer {
      let size_inner = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
      ${field.name}.push(parse_${this.getParsingFunctionSuffix(field.type)}_matrix(&mut lines, size_inner));
    }`;
          } else if (field.type.startsWith("list<")) {
            return `let size_${field.name}: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
    let ${field.name}: ${this.mapTypeToRust(field.type)} = parse_${this.getParsingFunctionSuffix(field.type)}(&mut lines, size_${field.name});`;
          } else if (field.type.endsWith("[]")) {
            return `let size_${field.name}: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
    let ${field.name}: Vec<${this.mapTypeToRust(field.type.replace("[]", ""))}> = parse_${this.getParsingFunctionSuffix(field.type)}(&mut lines, size_${field.name});`;
          } else if (field.type.endsWith("[][]")) {
            return `let size_${field.name}_outer: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
    let size_${field.name}_inner: usize = lines.next().and_then(|line| line.parse().ok()).unwrap_or(0);
    let mut ${field.name}: ${this.mapTypeToRust(field.type)} = vec![];
    for _ in 0..size_${field.name}_outer {
      ${field.name}.push(parse_${this.getParsingFunctionSuffix(field.type)}_matrix(&mut lines, size_${field.name}_inner));
    }`;
          } else if (field.type === "string") {
            return `let ${field.name}: ${this.mapTypeToRust(field.type)} = lines.next().unwrap().to_string();`;
          } else if (field.type === "char") {
            return `let ${field.name}: char = lines.next().unwrap().chars().next().unwrap();`;
          } else if (field.type === "bool") {
            return `let ${field.name}: bool = lines.next().unwrap() == "true";`;
          } else {
            return `let ${field.name}: ${this.mapTypeToRust(field.type)} = lines.next().unwrap().parse().unwrap();`;
          }
        })
        .join("\n  ");
    
      const containsVector = this.inputFields.some((field) =>
        field.type.startsWith("list<") || field.type.endsWith("[]") || field.type.endsWith("[][]")
      );
    
      const functionCall = `let result = Solution::${this.functionName}(${this.inputFields
        .map((field) => field.name)
        .join(", ")});`;
       
      let outputWrite = '';
        if (this.outputType === 'ListNode') {
          outputWrite = `print_list_node(&result);`;
        } else if (this.outputType === 'TreeNode') {
          outputWrite = `print_tree_node(result);`;
        } else {
          outputWrite = `println!("{}", result);`;
        }
    
        let typeDefinitions = '';
        if (requiresListNode) {
          typeDefinitions += `
      #[derive(Debug)]
      struct ListNode {
          val: i32,
          next: Option<Box<ListNode>>,
      }
      
      impl ListNode {
          fn new(val: i32) -> Self {
              ListNode { val, next: None }
          }
      }
      `;
        }
      
        if (requiresTreeNode) {
          typeDefinitions += `
      #[derive(Debug)]
      struct TreeNode {
          val: i32,
          left: Option<Rc<RefCell<TreeNode>>>,
          right: Option<Rc<RefCell<TreeNode>>>,
      }
      
      impl TreeNode {
          fn new(val: i32) -> Self {
              TreeNode { val, left: None, right: None }
          }
      }
      `;
        }
      
        let helperFunctions = '';
      
        if (requiresListNode) {
          helperFunctions += `
      fn build_list_node(lines: &mut Lines, n: usize) -> Option<Box<ListNode>> {
          let mut head: Option<Box<ListNode>> = None;
          let mut tail = &mut head;
          if let Some(line) = lines.next() {
              for val_str in line.split_whitespace().take(n) {
                  if let Ok(val) = val_str.parse::<i32>() {
                      let new_node = Box::new(ListNode::new(val));
                      if tail.is_none() {
                          *tail = Some(new_node);
                      } else {
                          tail.as_mut().unwrap().next = Some(new_node);
                          tail = &mut tail.as_mut().unwrap().next;
                      }
                  }
              }
          }
          head
      }
      
      fn print_list_node(head: &Option<Box<ListNode>>) {
          let mut current = head;
          while let Some(node) = current {
              print!("{}", node.val);
              if node.next.is_some() {
                  print!(" ");
              }
              current = &node.next;
          }
          println!();
      }
      `;
        }
      
        if (requiresTreeNode) {
          helperFunctions += `
      fn build_tree_node(values: &[Option<i32>]) -> Option<Rc<RefCell<TreeNode>>> {
          if values.is_empty() || values[0].is_none() {
              return None;
          }
          let root = Rc::new(RefCell::new(TreeNode::new(values[0].unwrap())));
          let mut queue = std::collections::VecDeque::new();
          queue.push_back(root.clone());
          let mut i = 1;
          while !queue.is_empty() && i < values.len() {
              let current = queue.pop_front().unwrap();
              if let Some(Some(val)) = values.get(i) {
                  let left_node = Rc::new(RefCell::new(TreeNode::new(*val)));
                  current.borrow_mut().left = Some(left_node.clone());
                  queue.push_back(left_node);
              }
              i += 1;
              if let Some(Some(val)) = values.get(i) {
                  let right_node = Rc::new(RefCell::new(TreeNode::new(*val)));
                  current.borrow_mut().right = Some(right_node.clone());
                  queue.push_back(right_node);
              }
              i += 1;
          }
          Some(root)
      }
      
      fn print_tree_node(root: Option<Rc<RefCell<TreeNode>>>) {
          if root.is_none() {
              println!("null");
              return;
          }
          let mut result = Vec::new();
          let mut queue = std::collections::VecDeque::new();
          queue.push_back(root);
          while !queue.is_empty() {
              let node_option = queue.pop_front().unwrap();
              if let Some(node_rc) = node_option {
                  let node = node_rc.borrow();
                  result.push(node.val.to_string());
                  queue.push_back(node.left.clone());
                  queue.push_back(node.right.clone());
              } else {
                  result.push("null".to_string());
              }
          }
          while result.last() == Some(&"null".to_string()) {
              result.pop();
          }
          println!("{}", result.join(" "));
      }
      `;
        }

      return `use std::fs::read_to_string;
        use std::io::{self};
        use std::str::Lines;
       ${requiresTreeNode ? 'use std::rc::Rc;\nuse std::cell::RefCell;' : ''}
    
       ${typeDefinitions}

    //##USER_CODE_HERE##

    fn main() -> io::Result<()> {
      let input = read_to_string("/dev/problems/${this.problemName
        .toLowerCase()
        .replace(
          " ",
          "-"
        )}/tests/inputs/##INPUT_FILE_INDEX##.txt")?;
      let mut lines = input.lines();
      ${inputReads}
      ${functionCall}
      ${outputWrite}
      Ok(())
    }${helperFunctions}
    ${
      containsVector ? `\n${this.generateParsingFunctions()}` : ''
    }
`;
}
   
    mapTypeToRust(type: string): string {
      switch (type) {
        case "ListNode":
          return "Option<Box<ListNode>>";
        case "TreeNode":
          return "Option<Rc<RefCell<TreeNode>>>";
        case "int":
          return "i32";
        case "float":
        case "double":
          return "f64";
        case "long":
          return "i64";
        case "char":
          return "char";
        case "string":
          return "String";
        case "bool":
          return "bool";
        default:
          if (type.startsWith("list<")) {
            const innerType = type.slice(5, -1).trim(); 
            return `Vec<${this.mapTypeToRust(innerType)}>`;
          } else if (type.endsWith("[]")) {
            const innerType = type.replace("[]", "").trim();
            return `Vec<${this.mapTypeToRust(innerType)}>`;
          } else if (type.endsWith("[][]")) {
            const innerType = type.replace("[][]", "").trim();
            return `Vec<Vec<${this.mapTypeToRust(innerType)}>>`;
          }
          return "unknown";
      }
    }

    getInnermostType(type: string): string {
      let currentType = type;
      while (currentType.startsWith("list<")) {
        currentType = currentType.slice(5, -1).trim();
      }
      return currentType;
    }

    getParsingFunctionSuffix(type: string): string {
      const innermostType = this.getInnermostType(type);
      const rustType = this.mapTypeToRust(innermostType);
      switch (rustType) {
        case "i32":
          return "input";
        case "f64":
          return "float";
        case "char":
          return "char";
        case "String":
          return "string";
        case "bool":
          return "bool";
        default:
          return "input"; 
      }
    }

    generateParsingFunctions(): string {
      return `fn parse_input(lines: &mut Lines, size_arr: usize) -> Vec<i32> {
        lines.next()
            .unwrap_or_default()
            .split_whitespace()
            .filter_map(|x| x.parse::<i32>().ok())
            .collect()
    }
    
    fn parse_float(lines: &mut Lines, size_arr: usize) -> Vec<f64> {
        lines.next()
            .unwrap_or_default()
            .split_whitespace()
            .filter_map(|x| x.parse::<f64>().ok())
            .collect()
    }
    
    fn parse_char(lines: &mut Lines, size_arr: usize) -> Vec<char> {
        lines.next()
            .unwrap_or("")
            .chars()
            .collect()
    }
    
    fn parse_string(lines: &mut Lines, size_arr: usize) -> Vec<String> {
        lines.next()
            .unwrap_or("")
            .split_whitespace()
            .map(|x| x.to_string())
            .collect()
    }
    
    fn parse_bool(lines: &mut Lines, size_arr: usize) -> Vec<bool> {
        lines.next()
            .unwrap_or("")
            .split_whitespace()
            .map(|x| x == "true")
            .collect()
    }
    
    fn parse_input_matrix(lines: &mut Lines, size_arr: usize) -> Vec<i32> {
        parse_input(lines, size_arr)
    }
    
    fn parse_float_matrix(lines: &mut Lines, size_arr: usize) -> Vec<f64> {
        parse_float(lines, size_arr)
    }
    
    fn parse_char_matrix(lines: &mut Lines, size_arr: usize) -> Vec<char> {
        parse_char(lines, size_arr)
    }
    
    fn parse_string_matrix(lines: &mut Lines, size_arr: usize) -> Vec<String> {
        parse_string(lines, size_arr)
    }
    
    fn parse_bool_matrix(lines: &mut Lines, size_arr: usize) -> Vec<bool> {
        parse_bool(lines, size_arr)
    }`;
    }

    mapTypeToJs(type: string, name: string): string {
      switch (type) {
        case "ListNode":
          return `const ${name} = buildListNode(input.splice(0, parseInt(input.shift() || "0")));`;
        case "TreeNode":
          return `const ${name} = buildTreeNode(input);`;
  
        case "int":
          return `const ${name} = parseInt(input.shift() || "0");`;
        case "float":
        case "double":
          return `const ${name} = parseFloat(input.shift() || "0.0");`;
        case "long":
          return `const ${name} = BigInt(input.shift() || "0");`;
        case "char":
          return `const ${name} = (input.shift() || "").charAt(0);`;
        case "string":
          return `const ${name} = input.shift() || "";`;
        case "bool":
          return `const ${name} = (input.shift() || "false") === 'true';`;
  
        case "int[]":
        case "list<int>":
          return `const size_${name} = parseInt(input.shift() || "0");
        const ${name} = input.splice(0, size_${name}).map(x => parseInt(x));`;
        case "float[]":
        case "double[]":
        case "list<float>":
        case "list<double>":
          return `const size_${name} = parseInt(input.shift() || "0");
        const ${name} = input.splice(0, size_${name}).map(x => parseFloat(x));`;
        case "char[]":
        case "list<char>":
          return `const size_${name} = parseInt(input.shift() || "0");
        const ${name} = input.splice(0, size_${name}).map(x => x.charAt(0));`;
        case "string[]":
        case "list<string>":
          return `const size_${name} = parseInt(input.shift() || "0");
        const ${name} = input.splice(0, size_${name});`;
        case "bool[]":
        case "list<bool>":
          return `const size_${name} = parseInt(input.shift() || "0");
        const ${name} = input.splice(0, size_${name}).map(x => x === 'true');`;
  
        case "int[][]":
        case "list<list<int>>":
          return `const size_${name}_outer = parseInt(input.shift() || "0");
        const ${name} = [];
        for (let i = 0; i < size_${name}_outer; i++) {
          const size_${name}_inner = parseInt(input.shift() || "0");
          ${name}.push(input.splice(0, size_${name}_inner).map(x => parseInt(x)));
        }`;
        case "float[][]":
        case "double[][]":
        case "list<list<float>>":
        case "list<list<double>>":
          return `const size_${name}_outer = parseInt(input.shift() || "0");
        const ${name} = [];
        for (let i = 0; i < size_${name}_outer; i++) {
          const size_${name}_inner = parseInt(input.shift() || "0");
          ${name}.push(input.splice(0, size_${name}_inner).map(x => parseFloat(x)));
        }`;
        case "char[][]":
        case "list<list<char>>":
          return `const size_${name}_outer = parseInt(input.shift() || "0");
        const ${name} = [];
        for (let i = 0; i < size_${name}_outer; i++) {
          const size_${name}_inner = parseInt(input.shift() || "0");
          ${name}.push(input.splice(0, size_${name}_inner).map(x => x.charAt(0)));
        }`;
        case "string[][]":
        case "list<list<string>>":
          return `const size_${name}_outer = parseInt(input.shift() || "0");
        const ${name} = [];
        for (let i = 0; i < size_${name}_outer; i++) {
          const size_${name}_inner = parseInt(input.shift() || "0");
          ${name}.push(input.splice(0, size_${name}_inner));
        }`;
        case "bool[][]":
        case "list<list<bool>>":
          return `const size_${name}_outer = parseInt(input.shift() || "0");
        const ${name} = [];
        for (let i = 0; i < size_${name}_outer; i++) {  
          const size_${name}_inner = parseInt(input.shift() || "0");
          ${name}.push(input.splice(0, size_${name}_inner).map(x => x === 'true'));
        }`;
  
        default:
          return `const ${name} = input.shift(); // Unknown type`;
      }
    }
  
    generateJsOutputWrite(varName: string): string {
      switch (this.outputType) {
        case 'ListNode':
          return `printListNode(${varName});`;
        case 'TreeNode':
          return `printTreeNode(${varName});`;
        default:
          return `console.log(${varName});`;
      }
    }
}