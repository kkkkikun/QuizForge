import { Quiz } from './types';

export const QUIZZES: Quiz[] = [
  {
    "id": "db",
    "title": "数据库原理题库",
    "questions": [
      {
        "id": 1,
        "type": "choice",
        "question": "数据库技术的核心是",
        "options": [
          "A. 数据",
          "B. 数据库管理系统",
          "C. 操作系统",
          "D. 应用程序"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 2,
        "type": "choice",
        "question": "数据库系统阶段相比文件系统阶段，不具备的特点是",
        "options": [
          "A. 数据结构化",
          "B. 数据共享性高",
          "C. 数据冗余度高",
          "D. 数据独立性高"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 3,
        "type": "choice",
        "question": "数据库三级模式结构中，描述全体数据的全局逻辑结构和特征的是",
        "options": [
          "A. 外模式",
          "B. 模式",
          "C. 内模式",
          "D. 用户模式"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 4,
        "type": "choice",
        "question": "SQL Server 2008是一个＿＿＿型数据库系统",
        "options": [
          "A. 网状",
          "B. 层次",
          "C. 关系",
          "D. 以上都不是"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 5,
        "type": "choice",
        "question": "下列选项中，不属于概念模型基本概念的是",
        "options": [
          "A. 实体",
          "B. 属性",
          "C. 码",
          "D. 存储结构"
        ],
        "answer": "D",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 6,
        "type": "choice",
        "question": "学生与课程之间的选课联系属于",
        "options": [
          "A. 1:1联系",
          "B. 1:n联系",
          "C. m:n联系",
          "D. 无联系"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 7,
        "type": "choice",
        "question": "在SELECT语句的WHERE子句中，可以匹配0个到多个字符的通配符是＿＿＿",
        "options": [
          "A. *",
          "B. %",
          "C. _",
          "D. ?"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 8,
        "type": "choice",
        "question": "关系模型中，二维表的行称为",
        "options": [
          "A. 属性",
          "B. 元组",
          "C. 域",
          "D. 码"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 9,
        "type": "choice",
        "question": "下列不属于关系性质的是",
        "options": [
          "A. 同一列的数据类型必须相同",
          "B. 任意两个元组不能完全重复",
          "C. 列的顺序可以任意交换",
          "D. 属性可以进一步拆分"
        ],
        "answer": "D",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 10,
        "type": "choice",
        "question": "关系数据库管理系统应能实现的专门关系运算包括",
        "options": [
          "A. 选择、投影、连接",
          "B. 排序、索引、统计",
          "C. 关联、更新、排序",
          "D. 显示、打印、制表"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 11,
        "type": "choice",
        "question": "若属性F是基本关系R的外码，参照基本关系S的主码K，则R中每个元组在F上的值",
        "options": [
          "A. 必须等于S中某个元组的主码值",
          "B. 必须取空值",
          "C. 要么取空值，要么等于S中某个元组的主码值",
          "D. 可以取任意值"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 12,
        "type": "choice",
        "question": "关系代数中，从关系中选取满足条件的元组的操作是",
        "options": [
          "A. 投影",
          "B. 选择",
          "C. 连接",
          "D. 笛卡尔积"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 13,
        "type": "choice",
        "question": "关系代数中，从关系中选取若干列组成新关系的操作是",
        "options": [
          "A. 投影",
          "B. 选择",
          "C. 连接",
          "D. 并"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 14,
        "type": "choice",
        "question": "函数依赖中，若Y函数依赖于X，且Y不是X的子集，则称为",
        "options": [
          "A. 平凡函数依赖",
          "B. 非平凡函数依赖",
          "C. 完全函数依赖",
          "D. 传递函数依赖"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 15,
        "type": "choice",
        "question": "若X→Y，且X的真子集不能决定Y，则Y对X是",
        "options": [
          "A. 部分函数依赖",
          "B. 完全函数依赖",
          "C. 传递函数依赖",
          "D. 平凡依赖"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 16,
        "type": "choice",
        "question": "关系模式满足1NF的要求是",
        "options": [
          "A. 每个属性都是不可再分的原子值",
          "B. 不存在部分函数依赖",
          "C. 不存在传递函数依赖",
          "D. 没有数据冗余"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 17,
        "type": "choice",
        "question": "SELECT语句中要使用HAVING子句必须使用＿＿＿子句",
        "options": [
          "A. ORDER BY",
          "B. WHERE",
          "C. GROUP BY",
          "D. 无需配合"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 18,
        "type": "choice",
        "question": "概念结构设计最常用的方法是",
        "options": [
          "A. 自顶向下法",
          "B. 自底向上法",
          "C. 逐步扩张法",
          "D. 混合策略法"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 19,
        "type": "choice",
        "question": "E-R图转换为关系模型时，m:n联系需要",
        "options": [
          "A. 转换为一个独立的关系模式",
          "B. 与任意一端合并",
          "C. 与n端合并",
          "D. 直接删除"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 20,
        "type": "choice",
        "question": "SQL Server 2008中，用于存储数据库日志的文件后缀是",
        "options": [
          "A. .mdf",
          "B. .ndf",
          "C. .ldf",
          "D. .sql"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 21,
        "type": "choice",
        "question": "在关系数据库中，关于主键的说法正确的是",
        "options": [
          "A. 用于唯一的标识一个元组",
          "B. 一个表允许有多个主键",
          "C. 创建唯一的索引,允许取空值",
          "D. 只允许以表中的首属性建立"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 22,
        "type": "choice",
        "question": "定义表结构时，设置某列值不能为空的关键字是",
        "options": [
          "A. UNIQUE",
          "B. PRIMARY KEY",
          "C. NOT NULL",
          "D. CHECK"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 23,
        "type": "choice",
        "question": "若要限制某列的取值范围在1~100之间，应使用＿＿＿约束",
        "options": [
          "A. PRIMARY KEY",
          "B. FOREIGN KEY",
          "C. CHECK",
          "D. DEFAULT"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 24,
        "type": "choice",
        "question": "向表中插入数据的SQL语句是",
        "options": [
          "A. INSERT",
          "B. UPDATE",
          "C. DELETE",
          "D. SELECT"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 25,
        "type": "choice",
        "question": "自然连接是构成新关系的有效方法，一般情况下当对关系R和S使用自然连接时，要求R和S有一个或多个共有的",
        "options": [
          "A. 元组",
          "B. 行",
          "C. 记录",
          "D. 属性"
        ],
        "answer": "D",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 26,
        "type": "choice",
        "question": "聚合函数中，用于统计行数的是",
        "options": [
          "A. SUM()",
          "B. AVG()",
          "C. COUNT()",
          "D. MAX()"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 27,
        "type": "choice",
        "question": "分组查询中，用于筛选分组后结果的关键字是",
        "options": [
          "A. WHERE",
          "B. HAVING",
          "C. GROUP BY",
          "D. ORDER BY"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 28,
        "type": "choice",
        "question": "内连接的关键字是",
        "options": [
          "A. INNER JOIN",
          "B. LEFT JOIN",
          "C. RIGHT JOIN",
          "D. FULL JOIN"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 29,
        "type": "choice",
        "question": "数据库中只存放视图的＿＿＿",
        "options": [
          "A. 操作",
          "B. 对应的数据",
          "C. 定义",
          "D. 限制"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 30,
        "type": "choice",
        "question": "视图是",
        "options": [
          "A. 真实存储数据的表",
          "B. 从基本表导出的虚表",
          "C. 索引的另一种称呼",
          "D. 存储过程的别名"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 31,
        "type": "choice",
        "question": "创建视图的SQL语句是",
        "options": [
          "A. CREATE VIEW",
          "B. ALTER VIEW",
          "C. DROP VIEW",
          "D. CREATE INDEX"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 32,
        "type": "choice",
        "question": "索引的主要作用是",
        "options": [
          "A. 减少数据冗余",
          "B. 加快数据查询速度",
          "C. 保证数据完整性",
          "D. 实现表间连接"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 33,
        "type": "choice",
        "question": "声明局部变量的关键字是",
        "options": [
          "A. DECLARE",
          "B. SET",
          "C. SELECT",
          "D. PRINT"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 34,
        "type": "choice",
        "question": "流程控制语句中，用于条件判断的是",
        "options": [
          "A. BEGIN...END",
          "B. IF...ELSE",
          "C. WHILE",
          "D. GOTO"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 35,
        "type": "choice",
        "question": "用户定义函数中，返回单个值的是",
        "options": [
          "A. 标量函数",
          "B. 内嵌表值函数",
          "C. 多语句表值函数",
          "D. 存储过程"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 36,
        "type": "choice",
        "question": "在创建索引时要用到下列哪个关键字",
        "options": [
          "A. AS",
          "B. ON",
          "C. INTO",
          "D. SET"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 37,
        "type": "choice",
        "question": "触发器是＿＿＿时自动执行的存储过程",
        "options": [
          "A. 用户手动调用",
          "B. 特定事件触发",
          "C. 定时执行",
          "D. 数据库启动时"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 38,
        "type": "choice",
        "question": "DML触发器不包括",
        "options": [
          "A. INSERT触发器",
          "B. UPDATE触发器",
          "C. DELETE触发器",
          "D. CREATE触发器"
        ],
        "answer": "D",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 39,
        "type": "choice",
        "question": "事务的四大特性不包括",
        "options": [
          "A. 原子性",
          "B. 一致性",
          "C. 隔离性",
          "D. 并发性"
        ],
        "answer": "D",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 40,
        "type": "choice",
        "question": "学生关系(学号，姓名，性别，年龄，系号，系名)中，“系名”对主关键字“学号”的函数依赖是＿＿＿",
        "options": [
          "A. 平凡函数依赖",
          "B. 完全函数依赖",
          "C. 部分函数依赖",
          "D. 传递函数依赖"
        ],
        "answer": "D",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 41,
        "type": "choice",
        "question": "共享锁的作用是",
        "options": [
          "A. 允许其他事务读取数据，禁止修改",
          "B. 禁止其他事务读取和修改",
          "C. 允许其他事务修改数据",
          "D. 只适用于索引"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 42,
        "type": "choice",
        "question": "死锁发生后，SQL Server会",
        "options": [
          "A. 自动回滚优先级最低的事务",
          "B. 等待用户手动处理",
          "C. 重启数据库",
          "D. 忽略死锁"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 43,
        "type": "choice",
        "question": "SQL Server的身份验证模式不包括",
        "options": [
          "A. Windows身份验证",
          "B. 混合身份验证",
          "C. SQL Server身份验证",
          "D. 指纹身份验证"
        ],
        "answer": "D",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 44,
        "type": "choice",
        "question": "在一个满足1NF的关系中，不存在部分函数依赖，那么该关系模式至少属于＿＿＿",
        "options": [
          "A. 4NF",
          "B. 3NF",
          "C. 2NF",
          "D. BCNF"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 45,
        "type": "choice",
        "question": "授予用户权限的SQL语句是",
        "options": [
          "A. GRANT",
          "B. REVOKE",
          "C. DENY",
          "D. REMOVE"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 46,
        "type": "choice",
        "question": "撤销用户权限的SQL语句是",
        "options": [
          "A. GRANT",
          "B. REVOKE",
          "C. DENY",
          "D. DELETE"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 47,
        "type": "choice",
        "question": "数据库设计的最终目标是",
        "options": [
          "A. 生成E-R图",
          "B. 建立符合需求的数据库及应用系统",
          "C. 编写存储过程",
          "D. 创建索引"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 48,
        "type": "choice",
        "question": "下列属于系统数据库的是",
        "options": [
          "A. master",
          "B. teaching",
          "C. inventory",
          "D. student"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ]
      }
    ]
  },
  {
    "id": "net",
    "title": "2026年重点复习题库",
    "questions": [
      {
        "id": 1,
        "type": "choice",
        "question": "在OSI七层参考模型中，下面一层为上层提供（ ）",
        "options": [
          "A. 协议",
          "B. 服务",
          "C. 介质",
          "D. 接口"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 2,
        "type": "choice",
        "question": "关于分组交换与电路交换的描述，错误的是（ ）",
        "options": [
          "A. 分组交换采用存储转发方式",
          "B. 每个分组独立选择路由",
          "C. 分组到达目的端时可能乱序",
          "D. 分组交换通信前必须建立专用物理通路"
        ],
        "answer": "D",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 3,
        "type": "choice",
        "question": "某信道带宽为4kHz，信噪比为30dB，根据香农定理，极限数据传输速率约为（ ）",
        "options": [
          "A. 4 kbps",
          "B. 40 kbps",
          "C. 120 kbps",
          "D. 400 kbps"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 4,
        "type": "choice",
        "question": "哪种编码方式在每个比特周期中间都有电平跳变，可自带时钟同步信息（ ）。",
        "options": [
          "A. NRZ编码",
          "B. 曼彻斯特编码",
          "C. 4B 编码",
          "D. 5B编码"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 5,
        "type": "choice",
        "question": "以太网交换机收到数据帧后，若目的MAC地址不在MAC地址表中，交换机会（ ）。",
        "options": [
          "A. 丢弃该帧",
          "B. 向所有端口（除入端口外）泛洪该帧",
          "C. 向入端口返回差错报文",
          "D. 缓存该帧直到学习到目的MAC地址"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 6,
        "type": "choice",
        "question": "关于CRC循环冗余校验的描述，正确的是（ ）。",
        "options": [
          "A. CRC可以纠正传输中的比特差错",
          "B. CRC的检错能力与生成多项式的选取有关",
          "C. CRC校验和的长度固定为32位",
          "D. CRC需要接收方发送确认帧才能生效"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 7,
        "type": "choice",
        "question": "某主机IP地址为172.16.10.65，子网掩码为255.255.255.192，该主机所在子网的网络地址是（ ）。",
        "options": [
          "A. 172.16.10.0",
          "B. 172.16.10.64",
          "C. 172.16.10.128",
          "D. 172.16.10.192"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 8,
        "type": "choice",
        "question": "TCP协议中，用于流量控制的机制是（ ）。",
        "options": [
          "A. 三次握手",
          "B. 滑动窗口",
          "C. 拥塞避免",
          "D. 超时重传"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 9,
        "type": "choice",
        "question": "以下属于对称加密算法的是（ ）。",
        "options": [
          "A. RSA",
          "B. ECC",
          "C. AES",
          "D. MD5"
        ],
        "answer": "C",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 10,
        "type": "choice",
        "question": "在eNSP中查看mac-address的信息时，命令是（ ）。",
        "options": [
          "A. display mac-address命令",
          "B. area命令",
          "C. ospf enable命令",
          "D. interface命令"
        ],
        "answer": "A",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 11,
        "type": "choice",
        "question": "TCP/IP参考模型中，负责处理不同网络之间数据分组转发的是（ ）。",
        "options": [
          "A. 网络接口层",
          "B. 网络层",
          "C. 传输层",
          "D. 应用层"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 12,
        "type": "choice",
        "question": "在以下网络拓扑结构中，可靠性最高、容错能力最强的是（）。",
        "options": [
          "A. 总线型",
          "B. 星型",
          "C. 环型",
          "D. 网状型"
        ],
        "answer": "D",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 13,
        "type": "choice",
        "question": "若某信道波特率为2400 Baud，采用8种不同的码元进行调制，则数据传输速率为（ ）。",
        "options": [
          "A. 2400 bit/s",
          "B. 4800 bit/s",
          "C. 7200 bit/s",
          "D. 9600 bit/s"
        ],
        "answer": "C",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 14,
        "type": "choice",
        "question": "以下设备中，工作在数据链路层的是（ ）。",
        "options": [
          "A. 集线器",
          "B. 交换机",
          "C. 路由器",
          "D. 调制解调器"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 15,
        "type": "choice",
        "question": "生成多项式G(x)=x⁴+x+1，若待发送数据为1011011，则CRC冗余码的位数为（ ）。",
        "options": [
          "A. 1位",
          "B. 4位",
          "C. 5位",
          "D. 7位"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 16,
        "type": "choice",
        "question": "IP地址192.168.5.130/26所在子网的广播地址是（ ）。",
        "options": [
          "A. 192.168.5.127",
          "B. 192.168.5.191",
          "C. 192.168.5.255",
          "D. 192.168.5.128"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 17,
        "type": "choice",
        "question": "路由器进行路由选择时，依据的原则是（ ）。",
        "options": [
          "A. 最短路径优先",
          "B. 最长前缀匹配",
          "C. 最先到达优先",
          "D. 负载均衡优先"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 18,
        "type": "choice",
        "question": "TCP三次握手过程中，第二次握手时SYN和ACK标志位的状态分别是（ ）。",
        "options": [
          "A. SYN=0, ACK=0",
          "B. SYN=0, ACK=1",
          "C. SYN=1, ACK=0",
          "D. SYN=1, ACK=1"
        ],
        "answer": "D",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 19,
        "type": "choice",
        "question": "数字签名技术主要利用（ ）来实现发送方身份认证和消息完整性验证。",
        "options": [
          "A. 对称加密算法",
          "B. 哈希函数和公钥加密",
          "C. 防火墙技术",
          "D. 入侵检测系统"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 21,
        "type": "choice",
        "question": "计算机网络最核心的功能是（ ）。",
        "options": [
          "A. 预防病毒",
          "B. 数据通信和资源共享",
          "C. 信息浏览",
          "D. 下载文件"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 22,
        "type": "choice",
        "question": "TCP/IP协议包括网络接口层、网际层、传输层和（ ）。",
        "options": [
          "A. 物理层",
          "B. 表示层",
          "C. 会话层",
          "D. 应用层"
        ],
        "answer": "D",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 23,
        "type": "choice",
        "question": "假如某个信道在同一时刻，发送方和接收方能够同时向对方传送数据，那么该信道的通信方式是（ ）。",
        "options": [
          "A. 单工",
          "B. 半双工",
          "C. 全双工",
          "D. 以上都不是"
        ],
        "answer": "C",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 24,
        "type": "choice",
        "question": "通过为多个信道分配互不重叠的时间片来实现多路复用技术的是（ ）。",
        "options": [
          "A. 频分多路复用",
          "B. 时分多路复用",
          "C. 码分多路复用",
          "D. 波分多路复用"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 25,
        "type": "choice",
        "question": "TCP/IP模型中，哪一层负责在网络中的两个节点之间建立、维护和终止连接？（ ）",
        "options": [
          "A. 应用层",
          "B. 传输层",
          "C. 网络层",
          "D. 数据链路层"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 26,
        "type": "choice",
        "question": "物理层的主要功能是什么？（ ）",
        "options": [
          "A. 确保数据的正确顺序和完整性",
          "B. 定义数据传输的规则和标准",
          "C. 将数据转换为信号在物理媒介上传输",
          "D. 管理网络中的流量和拥塞"
        ],
        "answer": "C",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 27,
        "type": "choice",
        "question": "以下哪个选项不属于物理层传输介质？（ ）",
        "options": [
          "A. 双绞线",
          "B. 同轴电缆",
          "C. 无线电波",
          "D. 以太网帧"
        ],
        "answer": "D",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 28,
        "type": "choice",
        "question": "假如一个设备的发送波特率为2K Baud，并使用8相调制，则它的发送速率是（ ）。",
        "options": [
          "A. 2K bit/s",
          "B. 6K bit/s",
          "C. 8K bit/s",
          "D. 16K bit/s"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 29,
        "type": "choice",
        "question": "以下设备中，哪个用于将数字信号转换为模拟信号？（ ）",
        "options": [
          "A. 调制解调器",
          "B. 集线器",
          "C. 网桥",
          "D. 中继器"
        ],
        "answer": "A",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 30,
        "type": "multiple",
        "question": "如果两台主机连接在同一个交换机上，但是它们无法直接通信，可能的原因是（ ）。",
        "options": [
          "A. 它们不在一个IP子网中",
          "B. 它们没有正确的MAC地址",
          "C. 交换机端口配置错误或故障",
          "D. 两台计算机的IP地址冲突"
        ],
        "answer": [
          "A",
          "C"
        ],
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 31,
        "type": "choice",
        "question": "在数据链路层，为什么要对数据帧进行封装和解封装？（ ）",
        "options": [
          "A. 为了在网络中传输数据",
          "B. 为了实现错误检测和纠正",
          "C. 为了传输电信号",
          "D. 为了实现路由选择"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 32,
        "type": "choice",
        "question": "在设计一个网络时，如何利用数据链路层技术来优化网络性能？（ ）",
        "options": [
          "A. 配置更高的传输速率来提高网络带宽",
          "B. 使用流量整形技术来管理网络流量",
          "C. 通过交换机来减少冲突域",
          "D. 通过使用路由器来隔离广播域"
        ],
        "answer": "C",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 33,
        "type": "choice",
        "question": "以下不属于NAT（网络地址转换）的主要作用的选项是（ ）。",
        "options": [
          "A. 提供网络地址的唯一性",
          "B. 允许多个设备共享一个公共IP地址",
          "C. 降低内部主机受攻击的概率",
          "D. 减少数据传输错误"
        ],
        "answer": "D",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 34,
        "type": "choice",
        "question": "在IPv4中，如果一个网络的子网掩码是255.255.255.192，那么这个网络有多少个可用的主机地址？（ ）",
        "options": [
          "A. 62",
          "B. 30",
          "C. 16",
          "D. 8"
        ],
        "answer": "A",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 35,
        "type": "choice",
        "question": "以下IP地址中，哪个不能在公共互联网上路由？（ ）",
        "options": [
          "A. 39.156.66.18",
          "B. 142.250.77.4",
          "C. 111.30.178.240",
          "D. 192.168.1.2"
        ],
        "answer": "D",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 36,
        "type": "choice",
        "question": "如果一个网络应用需要在数据传输中减少延迟，即使牺牲一些可靠性，它可能会选择哪个协议？（ ）",
        "options": [
          "A. TCP",
          "B. UDP",
          "C. IP",
          "D. ICMP"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 37,
        "type": "choice",
        "question": "网络中如果出现了大量的重复数据包，这可能是由哪个传输层协议的特性引起的？（ ）",
        "options": [
          "A. TCP的重传机制",
          "B. UDP的无连接特性",
          "C. IP的路由选择",
          "D. ICMP错误报告"
        ],
        "answer": "A",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 38,
        "type": "choice",
        "question": "在TCP连接中，如果接收方的接收窗口大小减小，发送方应该如何调整其发送行为？（ ）",
        "options": [
          "A. 增加发送速率",
          "B. 减少发送速率",
          "C. 改变数据包大小",
          "D. 忽略窗口变化"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 39,
        "type": "choice",
        "question": "以下选项中用于网页浏览的协议是（ ）。",
        "options": [
          "A. FTP",
          "B. SMTP",
          "C. DNS",
          "D. HTTP"
        ],
        "answer": "D",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 40,
        "type": "choice",
        "question": "在设计一个网络应用时，如果需要在数据传输中实现流量控制，应该依赖哪个传输层协议的特性？（ ）",
        "options": [
          "A. TCP滑动窗口机制",
          "B. UDP的无连接特性",
          "C. IP的路由选择",
          "D. ICMP错误报告"
        ],
        "answer": "A",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 41,
        "type": "choice",
        "question": "物理层定义了\"比特0、1\"在媒介上的哪种特性？（ ）",
        "options": [
          "A. 语法结构",
          "B. 电气/光学信号表示",
          "C. 路由算法",
          "D. 进程接口"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 42,
        "type": "choice",
        "question": "下列哪一项最能描述物理层的基本作用？（ ）",
        "options": [
          "A. 提供流量控制",
          "B. 进行差错纠正",
          "C. 在介质上传输比特流",
          "D. 选择最佳路由"
        ],
        "answer": "C",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 43,
        "type": "choice",
        "question": "数据链路层使用CRC的主要目的是？（ ）",
        "options": [
          "A. 检测帧在传输过程中是否出现比特差错",
          "B. 加快传输速率",
          "C. 进行路由选择",
          "D. 对数据进行加密"
        ],
        "answer": "A",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 44,
        "type": "choice",
        "question": "数据链路层采用CRC校验时，若生成多项式G(x)的次数为n，则帧校验序列FCS的长度应为？（ ）",
        "options": [
          "A. n-1位",
          "B. n位",
          "C. n+1位",
          "D. 固定32位"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 45,
        "type": "choice",
        "question": "以下哪个设备无法隔离冲突域？（ ）。",
        "options": [
          "A. 集线器",
          "B. 交换机",
          "C. 路由器",
          "D. 网桥"
        ],
        "answer": "A",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 46,
        "type": "choice",
        "question": "当主机第一次访问外网，需要把私网地址转成公网地址，这功能称为（ ）",
        "options": [
          "A. ARP",
          "B. NAT",
          "C. DHCP",
          "D. VLAN"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 47,
        "type": "choice",
        "question": "默认网关的作用是（ ）",
        "options": [
          "A. 转换MAC地址",
          "B. 为不同子网间转发IP分组"
        ],
        "answer": "B",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 48,
        "type": "choice",
        "question": "若某信道的波特率为2400Baud，采用四相调制，则数据速率约为（ ）",
        "options": [
          "A. 2400 bit/s",
          "B. 3600 bit/s",
          "C. 4800 bit/s",
          "D. 9600 bit/s"
        ],
        "answer": "C",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 49,
        "type": "choice",
        "question": "在URL https://www.example.com/中，“https”指明了（ ）",
        "options": [
          "A. 主机域名",
          "B. 服务端口号",
          "C. 应用层协议",
          "D. 资源路径"
        ],
        "answer": "C",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 50,
        "type": "choice",
        "question": "200.100.50.0/28 的可用主机地址个数是（ ）",
        "options": [
          "A. 14",
          "B. 16",
          "C. 30",
          "D. 32"
        ],
        "answer": "A",
        "tags": [
          "选择题"
        ]
      },
      {
        "id": 51,
        "type": "blank",
        "question": "OSI参考模型从低到高分为物理层、数据链路层、[网络]层、传输层、会话层、表示层和应用层。",
        "answer": [
          "网络"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 52,
        "type": "blank",
        "question": "根据香农定理，信道极限数据传输速率 C = W × log₂(1+[S/N/信噪比])。",
        "answer": [
          "S/N/信噪比"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 53,
        "type": "blank",
        "question": "以太网交换机通过查找[MAC]地址表来决定数据帧的转发端口。",
        "answer": [
          "MAC"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 54,
        "type": "blank",
        "question": "子网掩码255.255.255.192表示网络前缀长度为[26]位。",
        "answer": [
          "26"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 55,
        "type": "blank",
        "question": "TCP协议通过[三/3]次握手建立连接。",
        "answer": [
          "三/3"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 56,
        "type": "blank",
        "question": "在公钥密码体制中，加密密钥是公开的，解密密钥必须由用户[秘密/私有/自己]保存。",
        "answer": [
          "秘密/私有/自己"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 57,
        "type": "blank",
        "question": "在华为eNSP中，从用户视图进入系统视图的命令是[system-view]。",
        "answer": [
          "system-view"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 58,
        "type": "blank",
        "question": "[NAT/网络地址转换]技术可以将私网IP地址转换为公网IP地址，有效解决IPv4地址不足的问题。",
        "answer": [
          "NAT/网络地址转换"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 59,
        "type": "blank",
        "question": "在华为eNSP中，保存当前设备配置的命令是[save]。",
        "answer": [
          "save"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 60,
        "type": "blank",
        "question": "VLAN技术可以在[交换机]上将一个物理局域网划分为多个独立的广播域。",
        "answer": [
          "交换机"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 61,
        "type": "blank",
        "question": "TCP/IP参考模型从下到上依次为网络接口层、网络层、[传输]层和应用层。",
        "answer": [
          "传输"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 62,
        "type": "blank",
        "question": "曼彻斯特编码的显著特点是每个码元的中间都有[电平]跳变，因此可以自带时钟同步信息。",
        "answer": [
          "电平"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 63,
        "type": "blank",
        "question": "CRC循环冗余校验中，冗余码的位数等于生成多项式的[阶数/最高次幂/次数]。",
        "answer": [
          "阶数/最高次幂/次数"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 64,
        "type": "blank",
        "question": "IP地址192.168.1.0/26的子网掩码为[255.255.255.192]。",
        "answer": [
          "255.255.255.192"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 65,
        "type": "blank",
        "question": "TCP协议使用[滑动]窗口机制实现流量控制。",
        "answer": [
          "滑动"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 66,
        "type": "blank",
        "question": "数字签名技术主要利用哈希函数和[公钥/非对称]加密来实现身份认证和消息完整性验证。",
        "answer": [
          "公钥/非对称"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 68,
        "type": "blank",
        "question": "防火墙按照实现技术可划分为包过滤防火墙、[状态检测]防火墙和应用层代理防火墙三大类。",
        "answer": [
          "状态检测"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 69,
        "type": "blank",
        "question": "路由器进行路由选择时，依据[最长]前缀匹配原则来确定最佳路由。",
        "answer": [
          "最长"
        ],
        "tags": [
          "填空题"
        ]
      },
      {
        "id": 70,
        "type": "blank",
        "question": "以太网采用[CSMA/CD]协议来解决总线型网络中多个站点同时发送数据产生的冲突问题。",
        "answer": [
          "CSMA/CD"
        ],
        "tags": [
          "填空题"
        ]
      }
    ]
  },
  {
    "id": "cet4",
    "title": "大英四级速记（CET-4）",
    "questions": [
      {
        "id": 1,
        "type": "group",
        "question": "Unit 1 · News report 1",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. A live broadcast",
              "B. Design software",
              "C. A business deal",
              "D. A communication product"
            ],
            "answer": "D"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. It has got an attractive name",
              "B. It is available to general users",
              "C. It runs without traditional phone lines",
              "D. It makes large-scale meetings possible"
            ],
            "answer": "D"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. To remove possible plug-ins from its software",
              "B. To conduct business with up to 10,000 partners",
              "C. To attract more enterprises to use Skype for Business",
              "D. To allow meeting organizers to use most Web browsers"
            ],
            "answer": "C"
          },
          {
            "question": "第 4 题",
            "options": [
              "A. Seek out software bugs",
              "B. Invite the audience to debate",
              "C. See the images of the audience",
              "D. Respond to live feedback in real time"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 6,
        "type": "group",
        "question": "Unit 1 · News report 2",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. Rejecting others' invitation",
              "B. Correcting grammar of the message",
              "C. Giving out-of-date information periodically",
              "D. Putting a period at the end of each sentence"
            ],
            "answer": "D"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. A slight hesitation",
              "B. An informal refusal",
              "C. A close relationship",
              "D. An interest in the invitation"
            ],
            "answer": "D"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. To write emails properly",
              "B. To convey subtle meaning",
              "C. To deliver messages quickly",
              "D. To imitate face-to-face communication"
            ],
            "answer": "B"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 10,
        "type": "group",
        "question": "Unit 1 · Conversation",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. One's ID number",
              "B. One's occupation",
              "C. One's political views",
              "D. One's family background"
            ],
            "answer": "C"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. One's openness and circle of friends",
              "B. One's love for curly fries and intelligence",
              "C. One's religious beliefs and gender identity",
              "D. One's age and liking for Hello Kitty products"
            ],
            "answer": "B"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. To rate customers",
              "B. To increase their sales",
              "C. To know more about their competitors",
              "D. To sell users' information to companies"
            ],
            "answer": "B"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 14,
        "type": "group",
        "question": "Unit 1 · Passage",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. People can't get a high salary",
              "B. People are not allowed to smoke",
              "C. People can't contact their family or friends",
              "D. People don't stand a chance of promotion"
            ],
            "answer": "C"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. People are separated from the public",
              "B. People feel uncomfortable in institutions",
              "C. People like to send emails and text messages",
              "D. People often communicate with about six people they are closest to"
            ],
            "answer": "D"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. There was great difficulty in job hunting",
              "B. Private life was disconnected from work",
              "C. The time of leaving school was recorded",
              "D. People seldom communicated with others"
            ],
            "answer": "B"
          },
          {
            "question": "第 4 题",
            "options": [
              "A. Privacy",
              "B. Communication",
              "C. Intimacy",
              "D. Learning"
            ],
            "answer": "C"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 19,
        "type": "group",
        "question": "Unit 4 · News report 1",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. An opening of a store",
              "B. A light festival in Sydney",
              "C. A doughnut-eating contest",
              "D. A gathering of famous bakers"
            ],
            "answer": "B"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. Glonut",
              "B. Black Star",
              "C. Glowing Nut",
              "D. Glow-in-the-dark"
            ],
            "answer": "A"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 22,
        "type": "group",
        "question": "Unit 4 · News report 2",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. Vote on the best service of Muji",
              "B. Comment on the service of Muji",
              "C. Contribute ideas to Muji products",
              "D. Commit to buying Muji products online"
            ],
            "answer": "C"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. Its online community is getting larger",
              "B. Customers' suggestions have decreased",
              "C. It becomes more difficult to predict customer tastes",
              "D. The management no longer decides what to produce"
            ],
            "answer": "A"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. When an open process is started",
              "B. After it has been sold out for some time",
              "C. After enough customers have voted for it",
              "D. When there are more than 300 orders for it"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 26,
        "type": "group",
        "question": "Unit 4 · Conversation",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. He can't find a place to work",
              "B. He doesn't like his present job",
              "C. He wants to try a new lifestyle",
              "D. He feels lonely working at home"
            ],
            "answer": "D"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. Investment in small enterprises",
              "B. Advice on business and creativity",
              "C. Free work spaces and office supplies",
              "D. Meaningful and productive group work"
            ],
            "answer": "C"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. By working hard and achieving success",
              "B. By changing their home into a Hoffice community",
              "C. By bringing more friends to the Hoffice community",
              "D. By contributing their personal resources to the group"
            ],
            "answer": "D"
          },
          {
            "question": "第 4 题",
            "options": [
              "A. They announce their plans for the day",
              "B. They work by themselves for 40 minutes",
              "C. They ask other members about their goals",
              "D. They seek advice from other members about their work"
            ],
            "answer": "A"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 31,
        "type": "group",
        "question": "Unit 4 · Passage",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. It usually won't be born from frustration",
              "B. It is mostly not about real-world problems",
              "C. It paves the way for companies to succeed",
              "D. It has various forms and serves various purposes"
            ],
            "answer": "D"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. In the late 1980s",
              "B. After the birth of the Internet",
              "C. After the invention of ChangeGuard",
              "D. When it started to invest in a new business"
            ],
            "answer": "A"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. It helps customers get the lowest price",
              "B. It helps customers pay less for changing tickets",
              "C. It saves customers $30,000 on average every year",
              "D. It provides better service than other travel agencies"
            ],
            "answer": "B"
          },
          {
            "question": "第 4 题",
            "options": [
              "A. It is a threat to his company",
              "B. His company has to accept it",
              "C. It won't destroy an entire industry",
              "D. Some companies have to abandon it"
            ],
            "answer": "B"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 36,
        "type": "group",
        "question": "Unit 5 · News report 1",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. To help cities prepare for shocks",
              "B. To support cities in developing tourism",
              "C. To inspire cites to promote their strengths",
              "D. To encourage cities to improve their environment"
            ],
            "answer": "A"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. To offer an example of slower-burning stresses",
              "B. To stress the importance of solving this problem",
              "C. To compare this issue with environmental pollution",
              "D. To illustrate problems related to booming populations"
            ],
            "answer": "A"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. Politics and culture",
              "B. Economy and society",
              "C. Health and well-being",
              "D. Leadership and strategy"
            ],
            "answer": "A"
          },
          {
            "question": "第 4 题",
            "options": [
              "A. 4",
              "B. 12",
              "C. 52",
              "D. 156"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 41,
        "type": "group",
        "question": "Unit 5 · News report 2",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. Raise its tourist tax",
              "B. Promote a comfortable lifestyle",
              "C. Attract people to hang out in the city",
              "D. Open shopping malls for luxury items"
            ],
            "answer": "A"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. 5 percent",
              "B. 6 percent",
              "C. 15 percent",
              "D. 17 percent"
            ],
            "answer": "A"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. The growing tension among locals",
              "B. The rising price of household products",
              "C. The increasing pressure on city resources",
              "D. The possible damage to the local culture"
            ],
            "answer": "C"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 45,
        "type": "group",
        "question": "Unit 5 · Conversation",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. Awkward",
              "B. Excited",
              "C. Pleased",
              "D. Indifferent"
            ],
            "answer": "C"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. Chat with his friends",
              "B. Play with his phone",
              "C. Do some reading",
              "D. Observe passengers"
            ],
            "answer": "B"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. To make the wearers look cool",
              "B. To advocate the use of public transport",
              "C. To show the willingness to talk to strangers",
              "D. To be easily recognized by the wearers' friends"
            ],
            "answer": "C"
          },
          {
            "question": "第 4 题",
            "options": [
              "A. They are pressed for time",
              "B. They are on guard for possible threats",
              "C. They are interested in their own business",
              "D. They don't want to invade others' privacy"
            ],
            "answer": "B"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 50,
        "type": "group",
        "question": "Unit 5 · Passage",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. Urban space",
              "B. Medieval castles",
              "C. Modern features",
              "D. Separate monuments"
            ],
            "answer": "D"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. In the 16th century",
              "B. In the 17th century",
              "C. In the 18th century",
              "D. In the 19th century"
            ],
            "answer": "B"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. It was the first city to build public parks",
              "B. It was the first walking city in the world",
              "C. It was the first city to introduce theaters",
              "D. It was the first city to remove its fortifications"
            ],
            "answer": "D"
          },
          {
            "question": "第 4 题",
            "options": [
              "A. It started to become the capital of fashion",
              "B. It was not as beautiful and exciting as it is today",
              "C. It gave people reasons to go to their dream destination",
              "D. It changed people's idea about what urban life was like"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 55,
        "type": "group",
        "question": "Unit 6 · News report 1",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. It is a must-see art event in a gallery",
              "B. It will display several painters' paintings",
              "C. It will present some works from the Sunflowers series",
              "D. It is a reunion of all van Gogh's most famous paintings"
            ],
            "answer": "C"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. He will host the art show",
              "B. He will share his personal memories of one of the paintings",
              "C. He has seen all the sunflower paintings in his parents' home",
              "D. He thinks more highly of the Sunflowers series than Mona Lisa"
            ],
            "answer": "B"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. They were painted before 1888",
              "B. They were once reunited in an exhibition",
              "C. They were painted in the north of France",
              "D. They are now distributed around the world"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 59,
        "type": "group",
        "question": "Unit 6 · News report 2",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. It reminds us of formulas",
              "B. It is rarely used in our daily life",
              "C. It can be displayed with software",
              "D. It is only learned in high school"
            ],
            "answer": "B"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. He is an art student",
              "B. He is an animal lover",
              "C. He uses formulas to create artworks",
              "D. He uses math concepts to create sculptures"
            ],
            "answer": "C"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. It is newly established",
              "B. It is known by many people",
              "C. It is discussed in ancient Greece",
              "D. It is shown in one of da Vinci's works"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 63,
        "type": "group",
        "question": "Unit 6 · Conversation",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. It helps a lot to take a better photo",
              "B. It may distract others at art galleries",
              "C. It has caused problems around the world",
              "D. It is banned when taking photos of sculptures"
            ],
            "answer": "B"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. It is a risky decision for most museums",
              "B. It is first enforced by the Palace of Versailles",
              "C. It is issued mainly for the safety of the paintings",
              "D. It is not adopted by the National Gallery in London"
            ],
            "answer": "B"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. Many of them are young people",
              "B. They contribute to the spread of art",
              "C. They are cautious about using selfie sticks",
              "D. They are completely engaged in social media"
            ],
            "answer": "A"
          },
          {
            "question": "第 4 题",
            "options": [
              "A. Positive",
              "B. Worried",
              "C. Opposed",
              "D. Objective"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 68,
        "type": "group",
        "question": "Unit 6 · Passage",
        "answer": "",
        "subQuestions": [
          {
            "question": "第 1 题",
            "options": [
              "A. It is no longer as popular as before",
              "B. It is questioned by more and more universities",
              "C. It can't replace majors of classics or art history",
              "D. It promotes arts in science and technology education"
            ],
            "answer": "C"
          },
          {
            "question": "第 2 题",
            "options": [
              "A. To show that a coder can hardly be a tech hero",
              "B. To exemplify that tech elites can also be artistic",
              "C. To emphasize that technology makes our hearts sing",
              "D. To illustrate the importance of integrating sciences with arts"
            ],
            "answer": "D"
          },
          {
            "question": "第 3 题",
            "options": [
              "A. It reveals the importance of liberal arts education",
              "B. It aims to examine the goal of liberal arts education",
              "C. It points to the importance of expertise in the specific major",
              "D. It's about the relationship between employers and employees"
            ],
            "answer": "A"
          }
        ],
        "tags": [
          "听力"
        ]
      },
      {
        "id": 72,
        "type": "blank",
        "question": "Ten years of the Belt and Road Initiative\n1 It's been 10 years since the Belt and Road Initiative (BRI) was launched in 2013. And later this month, China will host the third Belt and Road Forum for International Cooperation, marking an important milestone of the initiative. The forum is to be attended by representatives from 151 countries and 41 international organizations.\n2 Journalists and scholars from around the world have been reflecting on the 10 years of the BRI. It is generally agreed that the last decade has demonstrated that the initiative is a broad and prosperous way for China and the world to share opportunities and seek common development.\n3 The BRI is a long-term, transnational, and systematic global initiative of the 21st century that has a clear path for implementation. Over the past 10 years, the BRI has improved China's international trade structure, which had previously been overly reliant on other countries, and gradually promoted the rebalancing of China's economic focus. It has also reshaped the perspective of the Chinese people, fostering, among them, a more complete world view.\n4 To take a wider perspective, it can be argued that the changes the BRI has brought to the world are even more valuable than the changes it has brought to China. In fact, while the BRI promotes the rebalancing of China's economic and trade structure, it has also helped foster a new type of international relations and brought about changes in the world.\n5 In terms of real development, the initiative has significantly improved people's overall well-being, especially in the countries participating in the BRI. For these countries, their interconnectedness with China has also been significantly boosted. As of now, more than 150 countries and 30 international organizations have signed BRI cooperation agreements with China, yielding a range of signature projects and impactful, albeit small-scale, projects.\n6 In Africa, China has participated in the construction of more than 6,000 km of railways, 6,000 km of roads, and multiple major infrastructure projects such as ports, airports, power stations, schools, and hospitals. Europe stands as another prime investment destination for the BRI. In just a decade, the China–Europe Railway Express, a flagship project reaching more than 200 cities across 25 European countries and regions, has shipped goods valued at over $340 billion. In the past 10 years, China's annual outbound investment has remained at a high level, with more funds flowing into BRI partner countries.\n7 According to a 2019 World Bank study, the BRI is expected to add real income gains of between 1.2 and 3.4 percent for countries along the route. A significant number of projects – including the Mombasa–Nairobi Standard Gauge Railway, the China–Laos Railway, and the Jakarta–Bandung High-Speed Railway – are completed and operational, and are already bringing great benefit to the local communities.\n8 The BRI has provided an alternative development model for developing countries. In the past, developing nations often regarded the Washington Consensus as the only point of reference for their development path. However, it is much more likely that the Chinese economic experience, with a focus on prioritizing infrastructure, would be more applicable to up-and-coming countries. The achievements of the last 10 years of the BRI make this point even more salient for these nations.\n9 More importantly, China's capacity for infrastructure production and its successes in trade investment, accompanied by an operation framework that ranges from planning and design to financing and operation, have enabled developing countries that have been trapped by a lack of technology and capital to catch up. Ten years of the Belt and Road cooperation have encouraged developing countries to strive for a better future, thereby improving the balance and fairness of the international community in technology and trade.\n10 Ten years of the BRI have also enabled developed countries to adjust and reflect on their own international strategies. They are now making a greater effort to work more closely with developing countries. Potentially, the benefits of this effort will echo the ultimate goal of the BRI – mutual development for all mankind.\n11 In retrospect, the last 10 years of the BRI have proven that the rise of China can happen in a spirit of cooperation rather than competition. The Belt and Road cooperation, characterized by the guiding principle of \"planning together, building together, and benefiting together,\" transcends distinctions between civilizations, cultures, social systems, and stages of development. It has forged a new avenue for interactions among nations and set up a fresh framework for international cooperation. To put it another way, the BRI has proven to be an outstanding platform for global cooperation, and an important global public good that promotes peaceful coexistence and a shared future.\n12 It is foreseeable that the BRI will stand as a testament to global unity and shared progress. It will continue to be a beacon of collaborative efforts, fostering mutual understanding and prosperity among the diverse nations involved. As this vision materializes, the world may witness a new era of cooperation, where the BRI plays a pivotal role in shaping a more interconnected and harmonious global community.\n\n1、Evidence of the BRI’s economic benefits through World Bank research.\n2、The BRI’s role in helping developing countries overcome technological and capital shortages.\n3、The number of countries and organizations participating in the upcoming forum.\n4、The BRl’s influence on developed countries’international strategies.\n5、Examples of completed infrastructure projects and their local benefits.\n6、The BRl as a platform for peaceful coexistence and a shared future.\n7、The BRI’s impact on China's trade structure and people’s worldview.\n8、The BRI’s investment in Africa and Europe.\n9、The BRI’s long-term vision for global unity and cooperation.\n10、The BRl as an alternative to Washington Consensus for developing nations.",
        "answer": [
          "7 9 1 10 7 11 3 6 12 8"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 73,
        "type": "blank",
        "question": "The new old river: Qingming Shanghe Tu as epic\n1 Can you step in the same river twice? According to Greek philosopher Heraclitus, it is an impossible task. However, he did not reckon with the creativity and ingenuity of Chinese artists in the 21st century.\n2 The moving masterpiece of Qingming Shanghe Tu, which was titled A Moving Masterpiece: The Song Dynasty as Living Art, was the main attraction at the China Pavilion during the Shanghai World Expo 2010, where it drew record crowds. This digital marvel has already traveled to several cities where it has been viewed by over 10 million people.\n3 The recreation of the Song Dynasty (960—1279) Qingming Shanghe Tu, or Life Along the Bian River at the Pure Brightness Festival, is an animated scroll of epic proportions, standing 110 meters in length and 6 meters in height. Enormously ambitious, it took two years and 2,000 people to create, resulting in 1,068 characters that move in a four-minute loop, depicting a city as it transits from day to night.\n4 This rendition of Zhang Zeduan's masterpiece deliberately links the China of today to the China of a previous golden age, the Northern Song Dynasty. Not only is the epic nature of the work evident in its scale, but also in the sheer effort expended.\n5 The animated masterpiece is also technologically ambitious, encompassing both time and space, employing both sight and sound, and even extending into the third dimension by engaging the viewer through an interactive river of light which flows alongside the scroll. It is a spectacular fusion of ancient art and modern technology, and a new immersion experience. Whereas previous iterations of Qingming Shanghe Tu have been admiring copies of the work, this recreation is a more perfect fulfillment of the original, bringing it to new heights.\n6 The original painting depicted a utopian cityscape that scholars have failed to pinpoint on any map. It was meant to represent a timeless city based on Bianjing, then the capital of the Song Dynasty – a vision of an ideal city. The artists in this recreation project have gone one step further and included the fourth dimension of time. Originally, they even intended the animation to loop through the four seasons in order to present a timeless cycle.\n7 It is in times of surging national confidence and prosperity that epic works are commissioned and produced.\n8 Epic has always been a genre tied to nationhood. Monumental epics necessarily require the prosperity, infrastructure, and patronage system of a confident power to produce, and this often means they are commissioned by a sovereign or nation. Their appearance usually marks a cultural and economic renaissance, heralding a new golden age.\n9 The national epic of Rome, the Aeneid, was commissioned to celebrate the golden age of the Roman Empire under the reign of Augustus Caesar. It traces the trials and tribulations of the founding father of Rome, Aeneas. Similarly, the new Qingming Shanghe Tu also depicts the past. It harks back to an earlier golden age of China, the Northern Song Dynasty.\n10 But, while the epic of Augustan Rome traces the journey of a single man, Qingming Shanghe Tu is a comprehensive picture of the society in Bianjing, offering a fascinating cross-section of it. The focus on the city is significant, as are the ideas behind the recreation.\n11 How can a modern city achieve its ideals? The recreation of Bianjing is a place where city and country are in harmony, the languid village coexisting on the right side of the scroll with the booming city on the left. Nature and urban life are inextricably linked through the carrying of coal by donkeys. Conflicts – such as the boat nearly crashing into the bridge – are resolved by everyone pitching in.\n12 Technology and innovation are embraced – the Song Dynasty saw the invention of movable type, the compass, gunpowder, paper money, night markets, and professional storytelling, as well as a bloom of high art and culture – all this in an architecturally advanced, well-governed, orderly, and prosperous state.\n13 The ideal city is characterized by orderly and harmonious flow, just like the river the painting is named for – with an entrepreneurial and upward-moving spirit, scientific and cultural advancement, harmony between the diverse occupations and nationalities, and openness to international trade and ideas.\n14 This is found not just in the animation itself, but also in the process of the recreation. A diverse group of Chinese artists came together to cooperate on A Moving Masterpiece: The Song Dynasty as Living Art. The team infused new life through a technology first prefigured in Egyptian wall drawings, then perfected in America first with the rotoscope, and then brought to its artistic height and commercial success in animation studios.\n15 Unlike Augustan Rome, the Song Dynasty that inspired Qingming Shanghe Tu exerted a different kind of power. Rather than relying on military force and conquest, the Song Dynasty exercised a kind of far-reaching soft power. Its entrepreneurs and scholars invented technologies still in use today, technologies that enabled widespread education, encouraged trade and travel, inspired artistic excellence, and not only tolerated but also encouraged diversity and openness.\n\n1、3D technology enables viewers to interact with the masterpiece.\n2、The inventions in the Song Dynasty show a society that embraced technology and innovation.\n3、From epics, we can infer that they were produced in prosperous times, with the support of a powerful nation.\n4、Qingming Shanghe Tu depicts how people from various walks of life spent their day.\n5、With its soft power, the Song Dynasty has exerted far-reaching influence even on today's world.\n6、Many people have viewed the animated version of Qingming Shanghe Tu.\n7、The recreation of Qingming Shanghe Tu has allowed more than 1,000 characters to move in the work.\n8、Because of the scale of the work and the effort involved, the animation of Qingming Shanghe Tu is an epic.\n9、Similar to the Roman epic, the animated Qingming Shanghe Tu also shows the glory of the past age.\n10、One of the features of the ideal city is that all kinds of occupations can harmoniously coexist.",
        "answer": [
          "5 12 8 10 15 2 3 4 9 13"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 74,
        "type": "blank",
        "question": "From Galileo to Cassini\n1 In 1609, Galileo introduced to the world his new invention, the astronomical telescope. It opened up new opportunities to explore a territory that all prior generations had regarded as familiar – the night sky. In short order, he was making major discoveries. But the sky is very big, and Galileo's telescope was very small. He had to choose his targets carefully.\n2 In that context, Saturn was nothing special, the least of the known planets, just a bright point in a black sky. A year elapsed before he finally peered at Saturn for the first time in 1610.\n3 Galileo immediately realized that this was something new and different, but he was unable to make sense of the view in his tiny eyepiece. He described Saturn as \"triune\" in form, mistaking Saturn and its rings for a planet straddled by two close moons. They resemble Mickey Mouse ears in his sketch.\n4 Anyone who has ever looked through a telescope will remember their first view of Saturn. Galileo's other early discoveries retain their allure: the mountains of the moon, Venus as a waxing and waning crescent, and Jupiter with its four little companion moons. But we have seen other mountains, other crescents, and other moons. The rings of Saturn remain something different, something truly unearthly.\n5 Galileo's notes and sketches survive from that night in 1610. They capture his thoughts but probably not his emotions. We scientists are taught to write dispassionately and preferably in the passive voice. \"The planet was observed ...,\" not \"What the ... is this‽\" The interrobang never appears in the scientific literature.\n6 It took the world's astronomers another half-century to figure out exactly what they all were seeing. In 1659, Dutch astronomer Christiaan Huygens was the first to describe Saturn's rings as a flat, circular disk, and the concept of a ringed planet first entered the human imagination.\n7 Today, I think we have become a bit spoiled. NASA's Cassini spacecraft has been orbiting Saturn since July 2004. Every day, it sends back remarkable new data describing the planet and its retinue of rings and moons. It has revealed plumes of dust venting from cracks in the surface of the moon Enceladus. It has shown us sunlight glinting off the smooth surface of a lake on Titan. We have seen the flashes of meteorites hitting the rings. With Saturn's new-found familiarity, we sometimes forget to be amazed.\n8 Let me revisit one of the most famous images from the Cassini mission. It was taken a few years ago as Cassini flew through the shadow of Saturn. The view is stunning. A thin fringe of sunlight encircles an otherwise dark planet. The rings, lit from behind, show startling colors and contrast. Surrounding it all is the faint bluish glow of the fine dust ejected by Enceladus. The picture is a mosaic of smaller images, painstakingly assembled by Cassini's imaging scientists. It is flawless.\n9 On the left side of the mosaic, just above the rings, is a little dot. In the picture, it is nothing special, just a bright pixel in a black sky. But we know better. This is planet Earth, seen from the far side of the rings of Saturn. In 1610, Galileo pointed his hand-made telescope out from the Earth to see Saturn for the first time. About 400 years later, we have a telescope of our own, far more sophisticated but still built by hand, out at Saturn, looking back.\n10 I sometimes wonder if the flawlessness is the problem. When Cassini's images are processed to digital perfection, we unconsciously begin to regard them as the creations of some mad artist, not photographs from a real camera orbiting a real planet.\n11 As an amateur photographer, I know what happens when I point my camera toward the sun. I get lens flare, those circles of light that appear in so many of our snapshots from the beach or the ballpark. Too much sunlight bounces around inside the optics, following paths that the lens-makers did not intend, and leaving behind extraneous circles of light on the sensor or film.\n12 Cassini's cameras are no different, and many of the images from Saturn's shadow show these familiar patterns of lens flare and saturation. These tiles were left out when the mosaic was assembled. However, they reveal a different truth, one not about Saturn but about the camera. It is imperfect. It was built by human hands.\n13 Once in a while, it will be easy to repeat Galileo's experiment. Shortly after sunset, look toward the west, and you might see three planets in a line. The brightest is Venus. Above it and to the left is Mars, distinctly reddish but much fainter. And just beyond that, Saturn. Check them out. Any pair of binoculars has lenses far superior to the ones in Galileo's invention. But be warned – what you see will not resemble the latest releases from the Cassini mission. If you are very lucky, you might make out Saturn's rings. Or maybe you will just see Mickey's ears. Or maybe just a fuzzy dot. But, no matter, because you will be seeing it with your own eyes. That alone ought to be enough to inspire an interrobang or two.\n\n1、Galileo’s initial sketch of Saturn mistakenly showed it with two close moons on either sido.\n2、Tho author suggests that the over-processing of Cassin’s images makes them look like artistic creations rather than real photographs.\n3、Huygons was the first astronomer to correctly identify Satum’s rings as a flat disk surrounding tho planet.\n4、The author recommends using binoculars to observe Saturn, noting that even a fuzzy view can be inspiring.\n5、A famous Cassini mosaic shows Earth as a tiny dot seen from beyond Saturn’s rings.\n6、Galileo deliborately chose which celestial objects to observe because his telescopo was limited.\n7、Scientists are trained to write objectively, avoiding emotional language in their observations.\n8、Cassin’s cameras, like any other, produce lens flare when pointed toward the sun.\n9、The Cassini mission has revealed active geological features on Saturn’s moons, Including Enceladus and Titan.\n10、Galileo did not immediately observe Saturn after inventing his telescope; nearly a year passed before heturned it toward the planet.",
        "answer": [
          "3 10 6 13 9 1 5 11 7 2"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 75,
        "type": "blank",
        "question": "Is it OK to kick a robot dog?\n1 Last Saturday night, a young woman out on the town in Brisbane saw a dog- shaped robot trotting toward her. Out of panic, she gave it a solid kick in the head.\n2 After all, who hasn't thought about lashing out at \"intelligent\" technologies, given their tendency often to frustrate us as much as they serve us? Even if one disapproves of the young woman's action, one cannot be 100 percent sure that they would not do the same were they in the woman's situation.\n3 More and more people today intuitively feel that violence toward robots is immoral. However, as some research has shown, the ethics of kicking a robot dog are more complicated than might be expected.\n4 Were robots ever to become sentient – capable of thinking and feeling – then it would be just as beyond the pale to kick a robot dog as it would be to kick a real dog, or perhaps even a human being. Of course, the robots we have today are just machines, and cannot \"feel\" per se, so some may argue that causing the robot to suffer cannot be a good reason to criticize people who kick them.\n5 Moreover, we still don't know what makes us conscious and have no idea about how to produce sentience in a robot. Therefore, for the foreseeable future, we don't need to worry about making robots suffer.\n6 However, one obvious reason to criticize those who act violently toward robots is that the robots are often the property of another person, who may well be dismayed when their robot is damaged. This fails to distinguish damaging robots from damaging cars or bicycles, and cannot rationalize why we might feel disturbed when we encounter someone abusing a robot they own.\n7 The fact that other people would feel upset when they see someone kicking a robot dog gives people some incentive not to do it, albeit not a very powerful one. After all, anything one does could upset someone, including some things that are clearly the right thing to do.\n8 Some philosophers have argued that violence toward robots is wrong because it makes it more likely that the perpetrator, or perhaps witnesses, will behave violently toward entities that can suffer. They argue that abuse of robots may, in turn, lower the barriers to abuse of humans and animals.\n9 This line of argument, which has also been rolled out to criticize \"violent\" video games, was actually originated by the 18th-century German philosopher, Immanuel Kant, to explain why (he thought) cruelty to animals was wrong. Kant worried that people who abused animals would develop \"cruel habits,\" and that these habits would consequently cause them to behave badly toward human beings. How we treat robots that represent people and animals might therefore have implications for how we treat the things they represent.\n10 It's hard not to feel the appeal of this line of thought. After all, the advertising industry is built on the idea that getting people to associate representations of things or actions with pleasure can change their behavior. Therefore, it is feasible to assume that someone who derives pleasure from kicking a robot dog may be more likely to kick a real dog in the future.\n11 The problem with this argument is that it often doesn't bear out in real life when we look at the evidence. We know that adults who enjoy watching violent action movies are not necessarily more likely to imitate violence in real life.\n12 An alternative line of criticism of violence toward robots focuses on what our treatment of robots expresses here and now, rather than on how it might determine our behavior in the future.\n13 How we treat robots may say something about how we feel about the things that the robots represent. It may also say something about us. To see this, imagine you meet someone who always yells at robots whenever angry. This pattern of behavior may tell us that this person has some problems in emotional management. Or, imagine that you find your friend leaving a robot unattended. It would be hard not to think that this said something about how they would treat their own belongings or even children.\n14 It doesn't matter whether these actions make the people who perform them more likely to behave badly in the future. The actions express attitudes that are morally inappropriate in themselves. As Aristotle argued in the Nicomachean Ethics, one way to decide how we should act is to ask: \"What sort of person would do that?\"\n15 When we think about the ethics of our treatment of robots, we should think about the sort of people it reveals us to be. So, when kicking a robot dog, we may also be kicking away our civil behavior and decency. This might be a reason to control our tempers even in our relations with machines. That is also why technological inventions, while innovating our way of life, also pose challenges to our traditional values, providing us with a new perspective toward who we are and where we should go in the new era.\n\n1、Abusing animals may eventually lead people to treat human beings badly, as it fosters cruel habits and behavior.\n2、The pleasure one gets from certain behavior may cause one to continue to do that.\n3、Watching others behave violently does not necessarily lead to violent behavior in real life.\n4、Shouting at a robot may reveal that the person has difficulty controlling their emotions.\n5、The author believes that the real problem with violence toward robots is that it reveals a person's immoral attitude toward things.\n6、The woman kicked the robot dog because she was scared when it was moving toward her.\n7、If a robot dog could think and feel, it would be unacceptable to kick it, just like kicking a real dog.\n8、One of the reasons that we cannot kick a robot dog is that this will upset its owner.\n9、That kicking a robot dog will upset other people is not very strong evidence for not kicking the robot.\n10、The new inventions in technology may pose a challenge to our old values, and we may need to reconsider our moral principles.",
        "answer": [
          "9 11 10 13 15 1 4 6 7 15"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 76,
        "type": "group",
        "question": "Stargazers at 4,410 meters",
        "answer": "",
        "subQuestions": [
          {
            "question": "What is the main purpose of the LHAASO project?",
            "options": [
              "A. To observe the night sky for tourism",
              "B. To detect cosmic rays and study the universe's origin",
              "C. To test the endurance of young researchers",
              "D. To build the world's largest water tank"
            ],
            "answer": "B"
          },
          {
            "question": "When did the LHAASO become fully operational?",
            "options": [
              "A. In 2017",
              "B. In 2021",
              "C. In 2020",
              "D. In 2022"
            ],
            "answer": "B"
          },
          {
            "question": "What challenge do the researchers face according to paragraph 5?",
            "options": [
              "A. They have to work in white coats in labs",
              "B. They suffer from lack of oxygen and high physical activity",
              "C. They have to navigate boats in complete darkness",
              "D. They are required to publish papers in Nature"
            ],
            "answer": "B"
          },
          {
            "question": "The phrase \"steel army\" in paragraph 5 refers to the researchers' ________.",
            "options": [
              "A. strong determination and endurance",
              "B. use of steel equipment",
              "C. military background",
              "D. large number of members"
            ],
            "answer": "A"
          },
          {
            "question": "What can be inferred about the LHAASO team from the passage?",
            "options": [
              "A. Most members are experienced scientists over 35",
              "B. They work indoors in comfortable conditions",
              "C. They have made significant contributions to cosmic-ray research",
              "D. They primarily focus on tourism development"
            ],
            "answer": "C"
          }
        ],
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 82,
        "type": "group",
        "question": "For whom",
        "answer": "",
        "subQuestions": [
          {
            "question": "What role did Chinese soldiers and police play during the 1998 floods?",
            "options": [
              "A. They mainly provided financial support",
              "B. They helped build dykes and rescue affected people",
              "C. They were responsible for rebuilding houses",
              "D. They only assisted in transportation"
            ],
            "answer": "B"
          },
          {
            "question": "What does the reconstruction after the 2008 Wenchuan earthquake demonstrate?",
            "options": [
              "A. The government focused only on urban areas",
              "B. The recovery process was slow and inefficient",
              "C. China was able to rebuild quickly and improve infrastructure",
              "D. International organizations led the rebuilding efforts"
            ],
            "answer": "C"
          },
          {
            "question": "What was a significant change in China's emergency management system in 2018?",
            "options": [
              "A. The establishment of the Ministry of Emergency Management",
              "B. The introduction of the first disaster relief law",
              "C. The cancellation of all local rescue teams",
              "D. The replacement of soldiers with civilian volunteers"
            ],
            "answer": "A"
          },
          {
            "question": "What is the main advantage of using AI technology in emergency management?",
            "options": [
              "A. It replaces human rescuers entirely",
              "B. It helps predict disasters years in advance",
              "C. It enables real-time monitoring and early warnings",
              "D. It is only used after a disaster occurs"
            ],
            "answer": "C"
          },
          {
            "question": "What is the fundamental philosophy behind China's disaster response efforts?",
            "options": [
              "A. Economic development comes first",
              "B. Military power should be expanded",
              "C. The people's safety and well-being are the top priority",
              "D. International cooperation is the only solution"
            ],
            "answer": "C"
          }
        ],
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 88,
        "type": "group",
        "question": "China's new wave of innovation",
        "answer": "",
        "subQuestions": [
          {
            "question": "What is the estimated market size of China's low-altitude economy by 2030?",
            "options": [
              "A. Over 500 billion yuan",
              "B. 2 trillion yuan",
              "C. 800 billion yuan",
              "D. 2.3 trillion yuan"
            ],
            "answer": "A"
          },
          {
            "question": "Which of the following is mentioned as an example of China's marine science breakthroughs?",
            "options": [
              "A. The launch of the Long March-12 carrier rocket",
              "B. The development of \"flying cars\" in Shenzhen",
              "C. Deep-sea manned submersibles accomplishing half of the world's manned deep-dive missions",
              "D. The production of 12.9 million new energy vehicles"
            ],
            "answer": "C"
          },
          {
            "question": "What can be inferred from the passage about the significance of new quality productive forces?",
            "options": [
              "A. They primarily focus on traditional manufacturing industries",
              "B. They have had limited impact on the global economy",
              "C. They combine technological innovation with sustainable development to drive economic growth",
              "D. They rely entirely on foreign technology"
            ],
            "answer": "C"
          },
          {
            "question": "The word \"underpinned\" in paragraph 9 is closest in meaning to ________.",
            "options": [
              "A. endangered",
              "B. weakened",
              "C. supported",
              "D. ignored"
            ],
            "answer": "C"
          },
          {
            "question": "What is the main purpose of this passage?",
            "options": [
              "A. To introduce China's traditional industries",
              "B. To describe how China is leading global innovation through multiple cutting-edge sectors",
              "C. To compare different transportation methods in China",
              "D. To explain the history of China's economic development"
            ],
            "answer": "B"
          }
        ],
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 94,
        "type": "group",
        "question": "The tide of change: Embracing the industries of the future",
        "answer": "",
        "subQuestions": [
          {
            "question": "What characterized the First Industrial Revolution in Britain?",
            "options": [
              "A. Widespread use of electricity and oil",
              "B. Introduction of computers and the Internet",
              "C. Application of steam engines powered by coal",
              "D. Development of artificial intelligence systems"
            ],
            "answer": "C"
          },
          {
            "question": "According to the passage, the industries of the future mainly focus on which of the following three areas?",
            "options": [
              "A. Digital intelligence, sustainability, and education",
              "B. Digital intelligence, sustainability, and healthcare",
              "C. Automation, green energy, and biotechnology",
              "D. Manufacturing, transportation, and communication"
            ],
            "answer": "B"
          },
          {
            "question": "What is the main idea of the passage?",
            "options": [
              "A. The history of industrial revolutions from the 18th century to today",
              "B. Traditional industries will be completely replaced by emerging technologies",
              "C. Smart factories are the only future of global manufacturing",
              "D. The passage discusses future industries and how nations should embrace them"
            ],
            "answer": "D"
          },
          {
            "question": "The word \"architects\" in the last paragraph is closest in meaning to ________.",
            "options": [
              "A. people who build houses",
              "B. people who design and create",
              "C. people who watch and wait",
              "D. people who benefit from something"
            ],
            "answer": "B"
          },
          {
            "question": "What can be inferred about the relationship between traditional and emerging industries?",
            "options": [
              "A. Traditional industries should be completely abandoned",
              "B. Emerging technologies should be integrated with traditional industries for transformation and upgrading",
              "C. Traditional industries and emerging technologies are completely unrelated",
              "D. Smart factories have nothing to do with traditional manufacturing"
            ],
            "answer": "B"
          }
        ],
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 100,
        "type": "group",
        "question": "Tea's remarkable journey began…",
        "answer": "",
        "subQuestions": [
          {
            "question": "What was the earliest use of tea?",
            "options": [
              "A. A daily drink",
              "B. A medicinal drink",
              "C. A religious offering",
              "D. A trade commodity"
            ],
            "answer": "B"
          },
          {
            "question": "Which of the following became a symbol of wealth and status when tea became popular?",
            "options": [
              "A. An elaborate tea set",
              "B. High-grade tea",
              "C. An expensive tea pot",
              "D. Knowledge of tea culture"
            ],
            "answer": "A"
          },
          {
            "question": "What does the passage say about the global tea trade?",
            "options": [
              "A. It helped Europeans have a comfortable and wealthy life",
              "B. It encouraged European powers to build the tea industry",
              "C. It made it possible for visitors to travel to the West",
              "D. It improved economic growth and promoted cultural exchange"
            ],
            "answer": "D"
          },
          {
            "question": "How did the establishment of sea trade routes by European powers affect the tea trade?",
            "options": [
              "A. It greatly expanded global markets and shaped the world economy",
              "B. It restricted the tea trade to Europe",
              "C. It increased the demand for tea in the West",
              "D. It shifted the focus of the tea trade from land routes to sea routes"
            ],
            "answer": "A"
          },
          {
            "question": "Which aspect of tea does the passage emphasize the most?",
            "options": [
              "A. The different flavors of tea in the world",
              "B. The complex web of tea trade routes",
              "C. The economic and cultural impacts of tea",
              "D. The modern advertising strategies for tea sales"
            ],
            "answer": "C"
          }
        ],
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 106,
        "type": "group",
        "question": "The \"Silk Road of the Sea\" (or…",
        "answer": "",
        "subQuestions": [
          {
            "question": "What does the Maritime Silk Road refer to?",
            "options": [
              "A. The East China Sea Silk Route",
              "B. The traditional Silk Road",
              "C. The trade routes opened up by Zheng He",
              "D. Both the East China Sea Silk Route and the South China Sea Silk Route"
            ],
            "answer": "D"
          },
          {
            "question": "Which of the following was imported to China through the Maritime Silk Road?",
            "options": [
              "A. Indian tea",
              "B. Various flowers",
              "C. Stained glass",
              "D. Western porcelain"
            ],
            "answer": "B"
          },
          {
            "question": "What was the consequence of the opening of new sea-lanes?",
            "options": [
              "A. It made shipbuilding technology develop more slowly",
              "B. It expanded the types of goods that could be traded",
              "C. It expanded the scope of the Maritime Silk Road",
              "D. It caused conflicts between different trading ports"
            ],
            "answer": "C"
          },
          {
            "question": "What led to the decline of the Maritime Silk Road?",
            "options": [
              "A. Wars in the Western Regions",
              "B. The An-Shi Rebellion",
              "C. Technological advances",
              "D. Bans on maritime trade"
            ],
            "answer": "D"
          },
          {
            "question": "What is the passage mainly about?",
            "options": [
              "A. The importance of a new sea route",
              "B. The ups and downs of some dynasties",
              "C. The history of the Maritime Silk Road",
              "D. The traditional Silk Road and the Maritime Silk Road"
            ],
            "answer": "C"
          }
        ],
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 112,
        "type": "group",
        "question": "The word \"digital\" refers to…",
        "answer": "",
        "subQuestions": [
          {
            "question": "What does the author say about art?",
            "options": [
              "A. It is the arrangement of items intended to arouse thoughts and emotions",
              "B. It is anything that can be deliberately expressed in numbers",
              "C. It is a product that is widely used with many open meanings",
              "D. It is a process that can influence one's emotional intelligence"
            ],
            "answer": "A"
          },
          {
            "question": "What is the current relationship between digital technology and art?",
            "options": [
              "A. Digital tools are favored by artists",
              "B. They are actually far from each other",
              "C. They are combined with each other",
              "D. Art is redefining digital technology"
            ],
            "answer": "C"
          },
          {
            "question": "How can digital technology affect art?",
            "options": [
              "A. It has brought about more innovative areas",
              "B. It has helped the exploration of new tools",
              "C. It has speeded up the creative process",
              "D. It has changed the form of human expressions"
            ],
            "answer": "D"
          },
          {
            "question": "Why are digital technologies widely used in the field of entertainment and advertising?",
            "options": [
              "A. To make products look more advanced",
              "B. To create more works of art",
              "C. To attract intended customers",
              "D. To hide the commercial purpose of the works"
            ],
            "answer": "C"
          },
          {
            "question": "What point does the author make about \"digital art\"?",
            "options": [
              "A. It has never been considered contemporary art",
              "B. It aims to disseminate and share the existing technology",
              "C. It may be applied in expanding the community",
              "D. It is a very complex matter in a broader sense"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 118,
        "type": "group",
        "question": "To answer our most fundamental…",
        "answer": "",
        "subQuestions": [
          {
            "question": "What was the inner part of an atom like according to the classical model?",
            "options": [
              "A. It was like a small sun",
              "B. It was like a small universe",
              "C. It was like many small stars",
              "D. It was like a small solar system"
            ],
            "answer": "D"
          },
          {
            "question": "What does the author say about Niels Bohr?",
            "options": [
              "A. He was a great painter",
              "B. He liked drawing cubes",
              "C. He was an intellectual historian",
              "D. He might have been a fan of cubism"
            ],
            "answer": "D"
          },
          {
            "question": "What did Niels Bohr think of electrons?",
            "options": [
              "A. Electrons should be described with poetic words",
              "B. Electrons took the form of the classical model",
              "C. The electron world was like a cubist world",
              "D. Electrons were visible when you stared at them"
            ],
            "answer": "C"
          },
          {
            "question": "Who claimed that electrons might have properties of particles and waves?",
            "options": [
              "A. Picasso",
              "B. Niels Bohr",
              "C. De Broglie",
              "D. Arthur Miller"
            ],
            "answer": "C"
          },
          {
            "question": "What do we learn from the passage?",
            "options": [
              "A. Artists should learn from science",
              "B. Many scientists are fascinated by artworks",
              "C. Art and science must be combined in physics",
              "D. Artworks might have inspired the development of science"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 124,
        "type": "group",
        "question": "The Earth aside, Mars is the…",
        "answer": "",
        "subQuestions": [
          {
            "question": "What is the main reason that Mars is the most-studied planet in the solar system, apart from the Earth?",
            "options": [
              "A. Mars is the closest planet to the Earth in Biosphere 2",
              "B. People hope that Mars may support or have supported life",
              "C. People believe that Mars is the only planet worth exploring",
              "D. Mars is easy to reach with current technology and rocketry"
            ],
            "answer": "B"
          },
          {
            "question": "Why should those wishing to investigate Mars tread lightly?",
            "options": [
              "A. Because of the disruption of the sterile ecosystem on Mars",
              "B. Because of the existence of lowly bacteria on Mars",
              "C. Because of the contamination by earthly bugs during the investigation",
              "D. Because of moral and scientific considerations associated with the possible existence of Martians"
            ],
            "answer": "D"
          },
          {
            "question": "What is the current situation regarding rules for dealing with contamination risks?",
            "options": [
              "A. The Outer Space Treaty of 1967 provides detailed guidelines",
              "B. The Outer Space Treaty of 1967 sets up formal and global rules",
              "C. More countries have come up with their own formal rules",
              "D. Individual space agencies have their own rules"
            ],
            "answer": "D"
          },
          {
            "question": "What does the passage say about Mars exploration?",
            "options": [
              "A. The exploration of Mars is a long-term project and requires global efforts",
              "B. More countries are cooperating with each other in the exploration of Mars",
              "C. International cooperation can reduce the cost of the exploration of Mars",
              "D. International cooperation can accelerate the exploration of Mars"
            ],
            "answer": "A"
          },
          {
            "question": "What does the author imply about the search for life on Mars?",
            "options": [
              "A. It aims to find a new home for humans",
              "B. It is a complex and multi-faceted endeavor",
              "C. It should be halted due to the difficulties and risks",
              "D. It costs too much because of the lack of technology"
            ],
            "answer": "B"
          }
        ],
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 130,
        "type": "group",
        "question": "By the end of the second…",
        "answer": "",
        "subQuestions": [
          {
            "question": "How many countries had human spaceflight capability at the end of 2020?",
            "options": [
              "A. About 40 countries",
              "B. Only three countries",
              "C. More than 20 countries",
              "D. 10 developed countries"
            ],
            "answer": "B"
          },
          {
            "question": "Why is human spaceflight considered expensive?",
            "options": [
              "A. It requires a large number of launchers and astronauts",
              "B. Providing support systems and ensuring safety require a lot of money",
              "C. Providing support systems requires plenty of costly equipment",
              "D. The crash and breakup of a spacecraft may cause extra costs"
            ],
            "answer": "B"
          },
          {
            "question": "What is the opinion of those who are against human spaceflight?",
            "options": [
              "A. It is too dangerous for astronauts to do experiments in space",
              "B. Human space missions are a waste of time and money",
              "C. Robots can do equally well or better with lower costs in space missions",
              "D. The human presence in space produces no scientific results"
            ],
            "answer": "C"
          },
          {
            "question": "What do supporters say about the role of humans in space missions?",
            "options": [
              "A. Astronauts will explore and settle down on other locations in the solar system",
              "B. Astronauts act as role models for individuals with the ambition to fly in space",
              "C. Humans are more intelligent than robots and can achieve greater scientific results",
              "D. Humans have unmatched intelligence, flexibility and reliability in space missions"
            ],
            "answer": "D"
          },
          {
            "question": "What can be learned about human spaceflight from the passage?",
            "options": [
              "A. It is a highly risky field with only a few countries interested",
              "B. The benefits of sending humans into space outweigh the risks and the costs",
              "C. People hold different views regarding human presence in space missions",
              "D. Human spaceflight has only a negative impact due to its high risks and costs"
            ],
            "answer": "C"
          }
        ],
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 136,
        "type": "group",
        "question": "Despite their advantages…",
        "answer": "",
        "subQuestions": [
          {
            "question": "development?",
            "options": [
              "A. The advantages of these technologies are underestimated",
              "B. Children do not benefit from these assistive technologies",
              "C. The aim of using these technologies has sometimes changed",
              "D. There are negative impacts of these technologies on children"
            ],
            "answer": "D"
          },
          {
            "question": "Which has a negative impact on children's ability to cultivate social emotions?",
            "options": [
              "A. Children seldom play games with parents",
              "B. Children do not have enough empathy",
              "C. Children seldom socialize with others in group settings",
              "D. Children are taught in a traditional learning setting"
            ],
            "answer": "C"
          },
          {
            "question": "Which is a reason for the violation of children's privacy?",
            "options": [
              "A. Some smart devices used by children cause data leaks",
              "B. Irresponsible parents like showing off themselves on social media",
              "C. Children's personal information is shared online without parental consent",
              "D. Children are not old enough to protect their own privacy"
            ],
            "answer": "A"
          },
          {
            "question": "What was the project in Los Angeles County?",
            "options": [
              "A. It used algorithms to identify children in abusive environments",
              "B. It used an algorithmic tool to create a series of moral standards",
              "C. It used an algorithmic tool to help children get out of dilemmas",
              "D. It used algorithms to provide recommendations for abused children"
            ],
            "answer": "A"
          },
          {
            "question": "What does the author imply about the use of algorithms?",
            "options": [
              "A. People will be free of all the possible risks with algorithmic tools",
              "B. It is necessary to take action in advance according to predictive analytics",
              "C. Algorithms would accurately help identify some problems in advance",
              "D. In some cases it is difficult to judge whether we should take action based on algorithms"
            ],
            "answer": "D"
          }
        ],
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 142,
        "type": "group",
        "question": "The alignment problem of AI is…",
        "answer": "",
        "subQuestions": [
          {
            "question": "What is the alignment problem of AI according to the passage?",
            "options": [
              "A. The concern that AI will choose to avoid unintended harmful actions",
              "B. The concern that AI will not pursue a worthwhile goal as instructed",
              "C. The concern that AI will become self-aware and have harmful intentions",
              "D. The concern that AI will possibly escape human control and harm humans"
            ],
            "answer": "D"
          },
          {
            "question": "What is the main cause of the alignment problem of AI?",
            "options": [
              "A. The inability to build an AI that can avoid all the problems humans foresee",
              "B. AI's inability to take human feelings into account when performing tasks",
              "C. AI's inability to avoid interference from external factors",
              "D. The inability to accurately and comprehensively define human purposes for AI"
            ],
            "answer": "D"
          },
          {
            "question": "Why might it be hard to turn off a powerful AI?",
            "options": [
              "A. Because it can set its own goal and pursue it",
              "B. Because it has no system for being switched off",
              "C. Because it will try to prevent itself from being turned off",
              "D. Because it will change the system and choose to resist"
            ],
            "answer": "C"
          },
          {
            "question": "What makes the proper control of AI urgent?",
            "options": [
              "A. AI has already begun to harm humans",
              "B. The rapid development of AI increases the risks",
              "C. AI has become too powerful to control",
              "D. The intelligence of AI has exceeded that of humans"
            ],
            "answer": "B"
          },
          {
            "question": "What benefits could transformative AI bring if we manage to avoid its risks?",
            "options": [
              "A. Better job opportunities",
              "B. Further development of technology",
              "C. Progress in solving major problems",
              "D. Accelerated scientific discovery"
            ],
            "answer": "C"
          }
        ],
        "tags": [
          "综合训练"
        ]
      }
    ]
  },
  {
    "id": "thermal",
    "title": "热物理在工程技术中的应用",
    "questions": [
      {
        "id": 1,
        "type": "choice",
        "question": "某热机的高温热源温度为500K，低温热源温度为300K，其最大效率为 (   )",
        "options": [
          "A. 40%",
          "B. 50%",
          "C. 60%",
          "D. 20%"
        ],
        "answer": "A",
        "tags": [
          "单选题："
        ],
        "explanation": "无答案"
      },
      {
        "id": 2,
        "type": "blank",
        "images": [
          "data:image/png;base64,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"
        ],
        "question": "图示为电除尘气体电离和导电的伏安曲线图（1.20），若提高除尘效果，延长[ ]段的时间。",
        "answer": [],
        "tags": [
          "单选题"
        ],
        "explanation": "填空无答案；解析存疑，请核对"
      },
      {
        "id": 3,
        "type": "choice",
        "question": "下列关于静电复印机（N 型感光鼓）工作过程的说法正确的是（  ）",
        "options": [
          "A. 充电时让感光鼓表面带正电",
          "B. 感光鼓静电潜像带正电",
          "C. 墨粉带正电",
          "D. 复印过程白纸不带电"
        ],
        "answer": "D",
        "tags": [
          "单选题"
        ],
        "explanation": "无答案"
      },
      {
        "id": 4,
        "type": "choice",
        "images": [
          "data:image/png;base64,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",
          "data:image/png;base64,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"
        ],
        "question": "图示为静电除尘的原理示意图（1.19）. 尘埃在电场中通过某种机制带电，在静电力作用下向集尘极迁移并沉积，以达到除尘的目的，下列表述正确的是（  ）",
        "options": [
          "A. 到达集尘极的尘埃可带正电，也可带负电",
          "B. 电场方向由集尘极指向放电极",
          "C. 放电极和集尘极间的电场是匀强电场",
          "D. 尘埃到达集尘极的过程中受力方向与电场方向相同"
        ],
        "answer": "A",
        "tags": [
          "单选题"
        ],
        "explanation": "无答案"
      },
      {
        "id": 5,
        "type": "choice",
        "question": "光纤的损耗包括哪些因素？",
        "options": [
          "A. 介质吸收",
          "B. 散射损耗",
          "C. 辐射损耗",
          "D. 以上三项都包括"
        ],
        "answer": "D",
        "tags": [
          "单选题"
        ],
        "explanation": "无答案"
      },
      {
        "id": 6,
        "type": "choice",
        "question": "光纤通信中，信号传输过程中的损耗是指光信号的（  ）特性的减弱.",
        "options": [
          "A. 速度",
          "B. 频率",
          "C. 强度",
          "D. 相位"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ],
        "explanation": "无答案"
      },
      {
        "id": 7,
        "type": "choice",
        "question": "第一根具有实用通信价值的光纤由美国康宁玻璃公司在（  ）年拉制成功的。",
        "options": [
          "A. 1966年",
          "B. 1970年",
          "C. 1980年",
          "D. 1992年"
        ],
        "answer": "B",
        "tags": [
          "单选题"
        ],
        "explanation": "无答案"
      },
      {
        "id": 8,
        "type": "group",
        "question": "高于20000Hz",
        "answer": "",
        "subQuestions": [
          {
            "question": "与频谱多普勒相比，彩色多普勒血流成像的优点是（  ）",
            "options": [
              "A. 显示血流速度的范围",
              "B. 显示高速血流时无混叠",
              "C. 计算流速更准确",
              "D. 切面上可直观显示血流情况"
            ],
            "answer": "D"
          },
          {
            "question": "超声波是一种(   )",
            "options": [
              "A. 电磁波",
              "B. 机械波",
              "C. 物质波",
              "D. 引力波"
            ],
            "answer": "B"
          },
          {
            "question": "已知某个环境噪声的声强级为 60 dB，如果另一个声音源产生的声强是该噪声声强的100 倍，那么这个声音源的声强级为多少？",
            "options": [
              "A. 60 dB",
              "B. 70 dB",
              "C. 80 dB",
              "D. 90 dB"
            ],
            "answer": "C"
          }
        ],
        "tags": [
          "单选题"
        ]
      },
      {
        "id": 12,
        "type": "choice",
        "question": "已知某个环境噪声的声强级为 65 dB，如果另一个声音源产生的声强是该噪声声强的100 倍，那么这个声音源的声强级为多少？",
        "options": [
          "A. 65 dB",
          "B. 75 dB",
          "C. 85 dB",
          "D. 95 dB"
        ],
        "answer": "C",
        "tags": [
          "单选题"
        ],
        "explanation": "无答案"
      }
    ]
  }
];
