export class ProblemDefinitionParser {
  problemName: string = "";
  className: string = "Solution"; 
  functionName: string = "";
  inputFields: { type: string; name: string }[] = [];
  outputType: string = "";

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
        if (field) {
          this.inputFields.push(field);
        }
      } else if (line.startsWith("Output Field:")) {
        const field = this.extractField(line.replace("Output Field:", "Field:"));
        if (field) {
          this.outputType = field.type;
        }
      }
    }
  }

  extractQuotedValue(line: string): string {
    const match = line.match(/: "(.*)"$/);
    return match ? match[1] : "";
  }

  extractValue(line: string): string {
    const match = line.match(/: (.+)$/);
    return match ? match[1] : "";
  }

  extractField(line: string): { type: string; name: string } | null {
    const match = line.match(/Field: ([^\s]+) (\w+)$/);
    return match ? { type: match[1], name: match[2] } : null;
  }

  generateCpp(): string {
    const className = this.sanitizeName(this.className || "Solution");
    const functionName = this.sanitizeName(this.functionName || "functionName");
    const outputType = this.mapTypeToCpp(this.outputType);
    const inputParams = this.inputFields
      .map(field => {
          const type = this.mapTypeToCpp(field.type);
          const isPassByReference = this.shouldPassByReferenceCpp(type);
          return `${type}${isPassByReference ? ' &' : ''} ${field.name}`;
      })
      .join(", ");
    
    return `class ${className} {
public:
    ${outputType} ${functionName}(${inputParams}) {
        // Your code goes here
        return ${this.getDefaultReturnValueCpp(outputType)};
    }
    // You can add more methods here.
};`;
  }

  shouldPassByReferenceCpp(type: string): boolean {
    const cppType = type;
    return cppType === "std::vector<char>" || 
           cppType === "std::vector<std::vector<char>>" || 
           cppType === "std::string" || 
           cppType === "std::vector<std::string>";
  }

  generateJava(): string {
    const className = this.sanitizeName(this.className || "Solution");
    const functionName = this.sanitizeName(this.functionName || "functionName");
    const outputType = this.mapTypeToJava(this.outputType);
    const inputParams = this.inputFields
      .map(field => `${this.mapTypeToJava(field.type)} ${field.name}`)
      .join(", ");

    return `class ${className} {
    public ${outputType} ${functionName}(${inputParams}) {
        // Your code goes here
        return ${this.getDefaultReturnValueJava(outputType)};
    }
    // You can add more methods here.
}`;
  }

  generateJs(): string {
    const functionName = this.sanitizeName(this.functionName || "functionName");
    const inputParams = this.inputFields.map(field => field.name).join(", ");
    const paramComments = this.inputFields
      .map(field => ` * @param {${field.type}} ${field.name}`)
      .join("\n");
  
    return `/**
    ${paramComments}
    */
    var ${functionName} = function(${inputParams}) {
      // Your code goes here
      return ${this.getDefaultReturnValueJs(this.outputType)};
    }
    // You can add more methods here.
  `;
  }

  generateRust(): string {
    const className = this.sanitizeName(this.className || "Solution");
    const functionName = this.sanitizeName(this.functionName || "function_name");
    const outputType = this.mapTypeToRust(this.outputType);
    const inputParams = this.inputFields
      .map(field => `${field.name}: ${this.mapTypeToRust(field.type)}`)
      .join(", ");

    return `struct ${className};

impl ${className} {
    fn ${functionName}(${inputParams}) -> ${outputType} {
        // Your code goes here
        return ${this.getDefaultReturnValueRust(outputType)};
    }
    // You can add more methods here.
}`;
  }

  sanitizeName(name: string): string {
    return name.replace(/[^a-zA-Z0-9_]/g, '');
  }

  getDefaultReturnValueCpp(type: string): string {
    if (type.startsWith('std::vector') || type.endsWith('[]')) {
      return '{}';
    } else if (type === 'int' || type === 'double' || type === 'float') {
      return '0';
    } else if (type === 'bool') {
      return 'false';
    } else if (type === 'std::string') {
      return '""';
    } else if (type.endsWith('*')) {
      return 'nullptr';
    } else {
      return '{}';
    }
  }

  getDefaultReturnValueJava(type: string): string {
    if (type.endsWith('[]') || type.startsWith('List<')) {
      return 'new ' + type.replace('[]', '[0]').replace('List<', 'ArrayList<').replace('>', '>()');
    } else if (type === 'int' || type === 'float' || type === 'double') {
      return '0';
    } else if (type === 'boolean') {
      return 'false';
    } else if (type === 'String') {
      return '""';
    } else if (type === 'ListNode' || type === 'TreeNode') {
      return 'null';
    } else {
      return 'null';
    }
  }

  getDefaultReturnValueJs(type: string): string {
    if (type.endsWith('[]') || type.startsWith('Array') || type.startsWith('list<')) {
      return '[]';
    } else if (['int', 'float', 'double', 'number'].includes(type)) {
      return '0';
    } else if (type === 'bool' || type === 'boolean') {
      return 'false';
    } else if (type === 'string') {
      return '""';
    } else if (type === 'ListNode' || type === 'TreeNode') {
      return 'null';
    } else {
      return 'null';
    }
  }

  getDefaultReturnValueRust(type: string): string {
    if (type.startsWith('Vec<')) {
      return 'Vec::new()';
    } else if (['i32', 'f64'].includes(type)) {
      return '0';
    } else if (type === 'bool') {
      return 'false';
    } else if (type === 'String') {
      return 'String::new()';
    } else if (type.startsWith('Option')) {
      return 'None';
    } else {
      return '()';
    }
  }

  mapTypeToCpp(type: string): string {
    switch (type) {
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
      case "ListNode":
        return "ListNode*";
      case "TreeNode":
        return "TreeNode*";
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

  mapTypeToJava(type: string): string {
    switch (type) {
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
        return "String";
      case "bool":
        return "boolean";
      case "ListNode":
        return "ListNode";
      case "TreeNode":
        return "TreeNode";
      case "int[]":
        return "int[]";
      case "float[]":
        return "float[]";
      case "double[]":
        return "double[]";
      case "long[]":
        return "long[]";
      case "char[]":
        return "char[]";
      case "string[]":
        return "String[]";
      case "bool[]":
        return "boolean[]";
      case "int[][]":
        return "int[][]";
      case "float[][]":
        return "float[][]";
      case "double[][]":
        return "double[][]";
      case "long[][]":
        return "long[][]";
      case "char[][]":
        return "char[][]";
      case "string[][]":
        return "String[][]";
      case "bool[][]":
        return "boolean[][]";
      case "list<int>":
        return "List<Integer>";
      case "list<float>":
        return "List<Float>";
      case "list<double>":
        return "List<Double>";
      case "list<long>":
        return "List<Long>";
      case "list<char>":
        return "List<Character>";
      case "list<string>":
        return "List<String>";
      case "list<bool>":
        return "List<Boolean>";
      case "list<list<int>>":
        return "List<List<Integer>>";
      case "list<list<float>>":
        return "List<List<Float>>";
      case "list<list<double>>":
        return "List<List<Double>>";
      case "list<list<long>>":
        return "List<List<Long>>";
      case "list<list<char>>":
        return "List<List<Character>>";
      case "list<list<string>>":
        return "List<List<String>>";
      case "list<list<bool>>":
        return "List<List<Boolean>>";
      default:
        return "unknown";
    }
  }

  mapTypeToRust(type: string): string {
    switch (type) {
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
      case "ListNode":
        return "Option<Box<ListNode>>";
      case "TreeNode":
        return "Option<Rc<RefCell<TreeNode>>>";
      case "int[]":
        return "Vec<i32>";
      case "float[]":
        return "Vec<f64>";
      case "double[]":
        return "Vec<f64>";
      case "long[]":
        return "Vec<i64>";
      case "char[]":
        return "Vec<char>";
      case "string[]":
        return "Vec<String>";
      case "bool[]":
        return "Vec<bool>";
      case "int[][]":
        return "Vec<Vec<i32>>";
      case "float[][]":
        return "Vec<Vec<f64>>";
      case "double[][]":
        return "Vec<Vec<f64>>";
      case "long[][]":
        return "Vec<Vec<i64>>";
      case "char[][]":
        return "Vec<Vec<char>>";
      case "string[][]":
        return "Vec<Vec<String>>";
      case "bool[][]":
        return "Vec<Vec<bool>>";
      case "list<int>":
        return "Vec<i32>";
      case "list<float>":
        return "Vec<f64>";
      case "list<double>":
        return "Vec<f64>";
      case "list<long>":
        return "Vec<i64>";
      case "list<char>":
        return "Vec<char>";
      case "list<string>":
        return "Vec<String>";
      case "list<bool>":
        return "Vec<bool>";
      case "list<list<int>>":
        return "Vec<Vec<i32>>";
      case "list<list<float>>":
        return "Vec<Vec<f64>>";
      case "list<list<double>>":
        return "Vec<Vec<f64>>";
      case "list<list<long>>":
        return "Vec<Vec<i64>>";
      case "list<list<char>>":
        return "Vec<Vec<char>>";
      case "list<list<string>>":
        return "Vec<Vec<String>>";
      case "list<list<bool>>":
        return "Vec<Vec<bool>>";
      default:
        return "unknown";
    }
  }
}