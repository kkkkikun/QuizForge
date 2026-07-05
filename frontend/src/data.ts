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
        "id": 20,
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
        "id": 67,
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
  }
];
