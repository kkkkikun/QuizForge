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
          },
          {
            "question": "Conversation",
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
          },
          {
            "question": "Passage",
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
        "id": 17,
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
        "id": 20,
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
          },
          {
            "question": "Conversation",
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
          },
          {
            "question": "Passage",
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
        "id": 32,
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
        "id": 37,
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
          },
          {
            "question": "Conversation",
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
          },
          {
            "question": "Passage",
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
        "id": 49,
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
        "id": 53,
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
          },
          {
            "question": "Conversation",
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
          },
          {
            "question": "Passage",
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
        "id": 64,
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
        "id": 65,
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
        "id": 66,
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
        "id": 67,
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
        "id": 68,
        "type": "group",
        "question": "理解当代中国",
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
        "id": 74,
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
        "id": 80,
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
        "id": 86,
        "type": "group",
        "question": "The tide of change: Embracing ",
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
        "id": 92,
        "type": "group",
        "question": "Tea's remarkable journey began",
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
        "id": 98,
        "type": "group",
        "question": "The \"Silk Road of the Sea\" (or",
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
        "id": 104,
        "type": "group",
        "question": "The word \"digital\" refers to d",
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
        "id": 110,
        "type": "group",
        "question": "To answer our most fundamental",
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
        "id": 116,
        "type": "group",
        "question": "The Earth aside, Mars is the m",
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
        "id": 122,
        "type": "group",
        "question": "By the end of the second decad",
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
        "id": 128,
        "type": "group",
        "question": "Despite their advantages, tech",
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
        "id": 134,
        "type": "group",
        "question": "The alignment problem of AI is",
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
  }
];
