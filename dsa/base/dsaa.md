最近在复习数据结构，经常会遇到很多英文及其缩写，它们分布不同，意义不同，有时也就很难记忆，在此我将其整理出来，方便记忆和使用。

### 第一章 算法分析
ADT:抽象数据类型
T（n）=O（f（n））
f(n)：算法问题规模关于n的函数
T(n):算法所有语句的频度（重复执行次数）之和
O(n):是T（n）的数量级

### 第2章 线性表
2.1.2
Init_List：线性表的初始化（initial 初始的，initialize 初始化）
Length_List：求线性表的长度（length 长度，long 长的）
Get_List：取表中某个元素
Locate_List：查找一个值为给定值X的数据元素（locate查找…的地点）
Insert_List：插入操作（insert 插入）
Delete_List：删除操作（delete 删除）

2.2.1
typedef struct：定义结构类型（type 类型，define 下定义，definition定义，structure 结构）
SeqList：顺序表（sequence顺序，list 表）
malloc：分配内存（memory存储、记忆装置，allocation分配）

2.2.2
Location_SeqList：顺序表的按值查找（location定位、寻找）

2.2.3
merge：合并
compare：比较
Node：结点
LinkList：链表（link链接）
Creat_LinkList1：建立单链表（create建立）

2.3.4
s→next：后继
s→prior：前趋（prior优先的）

### 第3章 栈

3.1.1
stack：栈
top：栈顶（top顶部）
bottom：栈底（bottom底部）

3.1.2
Init_Stack：栈的初始化（initialize，initialization初始化）
Empty_Stack：判别是否空栈（empty空的）
Push_Stack：入栈操作（push推）
Pop_Stack：出栈操作（pop出现点）
FILO:即First In Last Out缩写，是堆栈的先进后出表示
FIFO:即First In First Out 的缩写,是队列的先进先出表示

### 第4章 队列

4.1.1
queue：队列
rear：队尾（rear后面、后部）
front队头（front）

4.1.2
In_Queue：入队
Out_Queue：出队

### 第5章 串

5.1.2
StrLength：求串长（string串、字符串）
StrAssign：串赋值（assign赋值）
StrConcat：串连接（concatenate使…成串地连接起来）
SubStr：求子串（sub附属的、次级的）
StrCmp：串比较（compare比较）
StrIndex：子串定位（index索引）
StrInsert：串插入
StrDelete：串删除
StrRep：串替换（replace代替）

### 第6章 数组、特殊矩阵和广义表

6.1.2
saddle：鞍点（saddle鞍）

6.3.1
SPMatrix：稀疏矩阵（sparse稀疏的，matrix矩阵）

6.3.2
MulSMatrix：乘积算法（multiply乘）

6.4.1
head：表头（head头）
tail：表尾（tail尾）
enum：枚举（enumerate枚举）
Union：联合
### 第7章 树和二叉树

7.1.1
tree：树
root：根
degree：结点的度
leaf：叶子
sibling：兄弟

7.1.2
Array数组

7.2.3
BiTree：二叉树（bi-表示“二”）
Search：查找
Traverse：遍历

7.3.1
PreOrder：先序（pre-表示“前、先”，order顺序）
InOrder：中序
PostOrder：后序（post-表示“后”）
LevelOrder：层次遍历（level水平、级别）

### 第8章 图

8.1.1
graph：图
vertex：顶点
8.1.2
undigraph：无向图（undirected非定向的）
digraph：有向图（directed定向的）
complete graph：无向完全图
dense graph：稠密图
sparse graph：稀疏图
weight：权
Subg-raph：子图
edge：边
arc：弧
path：路径
connected graph：连通图（connected连接的）
connected component：连通分量（component成分的、分量的）
8.1.3
DestroyGraph：销毁图（destroy毁坏）

8.2.1
adjacency matrix：邻接矩阵（adjacency邻接）

8.2.2
adjacency list：邻接表

8.3
traversing graph：图的遍历（traversing遍历）
depth-first search：深度优先搜索（depth深度，deep深的，first第一的，search搜索）

8.3.2
breadth_first search：广度优先搜索（breadth广度）

8.4.3
minimum cost spanning tree：最小代价生成树（minimum最小的，cost花费，spanning生成）

8.6.1
directed acycline graph：有向无环图（acyclic非循环的）

### 第9章 排序


D_InsertSort直接插入排序（Direct直接的，insert插入，sort排序）


B_InsertionSort折半插入排序（bin search折半查找，bin二进制）


Bubble_Sort冒泡排序（bubble冒泡）


partition划分
Qsort快速排序（Quick快速的）


Select_Sort选择排序（select选择）


adjust调整
HeapSort堆排序