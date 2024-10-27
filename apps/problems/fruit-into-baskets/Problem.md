## Fruit into Baskets

You are given an integer array `fruits` where `fruits[i]` is the type of fruit the `i`-th tree produces.

You want to collect as much fruit as possible. However, the restriction is that each basket can only hold one type of fruit, and you only have two baskets. Starting from any tree, pick fruits until you cannot pick from any further trees without violating this restriction.

Return the maximum number of fruits you can collect in one contiguous section of the trees.

**Example:**

```
Input

fruits = [1,2,1]

Output

3

Input

fruits = [0,1,2,2]

Output

3

Input

fruits = [1,2,3,2,2]

Output

4
```