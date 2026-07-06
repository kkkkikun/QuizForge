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
        "type": "choice",
        "question": "Unit 1 · News report 1 · 第 1 题",
        "options": [
          "A. A live broadcast",
          "B. Design software",
          "C. A business deal",
          "D. A communication product"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 2,
        "type": "choice",
        "question": "Unit 1 · News report 1 · 第 2 题",
        "options": [
          "A. It has got an attractive name",
          "B. It is available to general users",
          "C. It runs without traditional phone lines",
          "D. It makes large-scale meetings possible"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 3,
        "type": "choice",
        "question": "Unit 1 · News report 1 · 第 3 题",
        "options": [
          "A. To remove possible plug-ins from its software",
          "B. To conduct business with up to 10,000 partners",
          "C. To attract more enterprises to use Skype for Business",
          "D. To allow meeting organizers to use most Web browsers"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 4,
        "type": "choice",
        "question": "Unit 1 · News report 1 · 第 4 题",
        "options": [
          "A. Seek out software bugs",
          "B. Invite the audience to debate",
          "C. See the images of the audience",
          "D. Respond to live feedback in real time"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 5,
        "type": "choice",
        "question": "Unit 1 · News report 2 · 第 1 题",
        "options": [
          "A. Rejecting others' invitation",
          "B. Correcting grammar of the message",
          "C. Giving out-of-date information periodically",
          "D. Putting a period at the end of each sentence"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 6,
        "type": "choice",
        "question": "Unit 1 · News report 2 · 第 2 题",
        "options": [
          "A. A slight hesitation",
          "B. An informal refusal",
          "C. A close relationship",
          "D. An interest in the invitation"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 7,
        "type": "choice",
        "question": "Unit 1 · News report 2 · 第 3 题",
        "options": [
          "A. To write emails properly",
          "B. To convey subtle meaning",
          "C. To deliver messages quickly",
          "D. To imitate face-to-face communication"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 8,
        "type": "choice",
        "question": "Conversation",
        "options": [
          "A. One's ID number",
          "B. One's occupation",
          "C. One's political views",
          "D. One's family background"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 9,
        "type": "choice",
        "question": "Unit 1 · News report 2 · 第 2 题",
        "options": [
          "A. One's openness and circle of friends",
          "B. One's love for curly fries and intelligence",
          "C. One's religious beliefs and gender identity",
          "D. One's age and liking for Hello Kitty products"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 10,
        "type": "choice",
        "question": "Unit 1 · News report 2 · 第 3 题",
        "options": [
          "A. To rate customers",
          "B. To increase their sales",
          "C. To know more about their competitors",
          "D. To sell users' information to companies"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 11,
        "type": "choice",
        "question": "Passage",
        "options": [
          "A. People can't get a high salary",
          "B. People are not allowed to smoke",
          "C. People can't contact their family or friends",
          "D. People don't stand a chance of promotion"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 12,
        "type": "choice",
        "question": "Unit 1 · News report 2 · 第 2 题",
        "options": [
          "A. People are separated from the public",
          "B. People feel uncomfortable in institutions",
          "C. People like to send emails and text messages",
          "D. People often communicate with about six people they are closest to"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 13,
        "type": "choice",
        "question": "Unit 1 · News report 2 · 第 3 题",
        "options": [
          "A. There was great difficulty in job hunting",
          "B. Private life was disconnected from work",
          "C. The time of leaving school was recorded",
          "D. People seldom communicated with others"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 14,
        "type": "choice",
        "question": "Unit 1 · News report 2 · 第 4 题",
        "options": [
          "A. Privacy",
          "B. Communication",
          "C. Intimacy",
          "D. Learning"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 15,
        "type": "choice",
        "question": "Unit 4 · News report 1 · 第 1 题",
        "options": [
          "A. An opening of a store",
          "B. A light festival in Sydney",
          "C. A doughnut-eating contest",
          "D. A gathering of famous bakers"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 16,
        "type": "choice",
        "question": "Unit 4 · News report 1 · 第 2 题",
        "options": [
          "A. Glonut",
          "B. Black Star",
          "C. Glowing Nut",
          "D. Glow-in-the-dark"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 17,
        "type": "choice",
        "question": "Unit 4 · News report 2 · 第 1 题",
        "options": [
          "A. Vote on the best service of Muji",
          "B. Comment on the service of Muji",
          "C. Contribute ideas to Muji products",
          "D. Commit to buying Muji products online"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 18,
        "type": "choice",
        "question": "Unit 4 · News report 2 · 第 2 题",
        "options": [
          "A. Its online community is getting larger",
          "B. Customers' suggestions have decreased",
          "C. It becomes more difficult to predict customer tastes",
          "D. The management no longer decides what to produce"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 19,
        "type": "choice",
        "question": "Unit 4 · News report 2 · 第 3 题",
        "options": [
          "A. When an open process is started",
          "B. After it has been sold out for some time",
          "C. After enough customers have voted for it",
          "D. When there are more than 300 orders for it"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 20,
        "type": "choice",
        "question": "Conversation",
        "options": [
          "A. He can't find a place to work",
          "B. He doesn't like his present job",
          "C. He wants to try a new lifestyle",
          "D. He feels lonely working at home"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 21,
        "type": "choice",
        "question": "Unit 4 · News report 2 · 第 2 题",
        "options": [
          "A. Investment in small enterprises",
          "B. Advice on business and creativity",
          "C. Free work spaces and office supplies",
          "D. Meaningful and productive group work"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 22,
        "type": "choice",
        "question": "Unit 4 · News report 2 · 第 3 题",
        "options": [
          "A. By working hard and achieving success",
          "B. By changing their home into a Hoffice community",
          "C. By bringing more friends to the Hoffice community",
          "D. By contributing their personal resources to the group"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 23,
        "type": "choice",
        "question": "Unit 4 · News report 2 · 第 4 题",
        "options": [
          "A. They announce their plans for the day",
          "B. They work by themselves for 40 minutes",
          "C. They ask other members about their goals",
          "D. They seek advice from other members about their work"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 24,
        "type": "choice",
        "question": "Passage",
        "options": [
          "A. It usually won't be born from frustration",
          "B. It is mostly not about real-world problems",
          "C. It paves the way for companies to succeed",
          "D. It has various forms and serves various purposes"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 25,
        "type": "choice",
        "question": "Unit 4 · News report 2 · 第 2 题",
        "options": [
          "A. In the late 1980s",
          "B. After the birth of the Internet",
          "C. After the invention of ChangeGuard",
          "D. When it started to invest in a new business"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 26,
        "type": "choice",
        "question": "Unit 4 · News report 2 · 第 3 题",
        "options": [
          "A. It helps customers get the lowest price",
          "B. It helps customers pay less for changing tickets",
          "C. It saves customers $30,000 on average every year",
          "D. It provides better service than other travel agencies"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 27,
        "type": "choice",
        "question": "Unit 4 · News report 2 · 第 4 题",
        "options": [
          "A. It is a threat to his company",
          "B. His company has to accept it",
          "C. It won't destroy an entire industry",
          "D. Some companies have to abandon it"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 28,
        "type": "choice",
        "question": "Unit 5 · News report 1 · 第 1 题",
        "options": [
          "A. To help cities prepare for shocks",
          "B. To support cities in developing tourism",
          "C. To inspire cites to promote their strengths",
          "D. To encourage cities to improve their environment"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 29,
        "type": "choice",
        "question": "Unit 5 · News report 1 · 第 2 题",
        "options": [
          "A. To offer an example of slower-burning stresses",
          "B. To stress the importance of solving this problem",
          "C. To compare this issue with environmental pollution",
          "D. To illustrate problems related to booming populations"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 30,
        "type": "choice",
        "question": "Unit 5 · News report 1 · 第 3 题",
        "options": [
          "A. Politics and culture",
          "B. Economy and society",
          "C. Health and well-being",
          "D. Leadership and strategy"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 31,
        "type": "choice",
        "question": "Unit 5 · News report 1 · 第 4 题",
        "options": [
          "A. 4",
          "B. 12",
          "C. 52",
          "D. 156"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 32,
        "type": "choice",
        "question": "Unit 5 · News report 2 · 第 1 题",
        "options": [
          "A. Raise its tourist tax",
          "B. Promote a comfortable lifestyle",
          "C. Attract people to hang out in the city",
          "D. Open shopping malls for luxury items"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 33,
        "type": "choice",
        "question": "Unit 5 · News report 2 · 第 2 题",
        "options": [
          "A. 5 percent",
          "B. 6 percent",
          "C. 15 percent",
          "D. 17 percent"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 34,
        "type": "choice",
        "question": "Unit 5 · News report 2 · 第 3 题",
        "options": [
          "A. The growing tension among locals",
          "B. The rising price of household products",
          "C. The increasing pressure on city resources",
          "D. The possible damage to the local culture"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 35,
        "type": "choice",
        "question": "Conversation",
        "options": [
          "A. Awkward",
          "B. Excited",
          "C. Pleased",
          "D. Indifferent"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 36,
        "type": "choice",
        "question": "Unit 5 · News report 2 · 第 2 题",
        "options": [
          "A. Chat with his friends",
          "B. Play with his phone",
          "C. Do some reading",
          "D. Observe passengers"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 37,
        "type": "choice",
        "question": "Unit 5 · News report 2 · 第 3 题",
        "options": [
          "A. To make the wearers look cool",
          "B. To advocate the use of public transport",
          "C. To show the willingness to talk to strangers",
          "D. To be easily recognized by the wearers' friends"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 38,
        "type": "choice",
        "question": "Unit 5 · News report 2 · 第 4 题",
        "options": [
          "A. They are pressed for time",
          "B. They are on guard for possible threats",
          "C. They are interested in their own business",
          "D. They don't want to invade others' privacy"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 39,
        "type": "choice",
        "question": "Passage",
        "options": [
          "A. Urban space",
          "B. Medieval castles",
          "C. Modern features",
          "D. Separate monuments"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 40,
        "type": "choice",
        "question": "Unit 5 · News report 2 · 第 2 题",
        "options": [
          "A. In the 16th century",
          "B. In the 17th century",
          "C. In the 18th century",
          "D. In the 19th century"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 41,
        "type": "choice",
        "question": "Unit 5 · News report 2 · 第 3 题",
        "options": [
          "A. It was the first city to build public parks",
          "B. It was the first walking city in the world",
          "C. It was the first city to introduce theaters",
          "D. It was the first city to remove its fortifications"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 42,
        "type": "choice",
        "question": "Unit 5 · News report 2 · 第 4 题",
        "options": [
          "A. It started to become the capital of fashion",
          "B. It was not as beautiful and exciting as it is today",
          "C. It gave people reasons to go to their dream destination",
          "D. It changed people's idea about what urban life was like"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 43,
        "type": "choice",
        "question": "Unit 6 · News report 1 · 第 1 题",
        "options": [
          "A. It is a must-see art event in a gallery",
          "B. It will display several painters' paintings",
          "C. It will present some works from the Sunflowers series",
          "D. It is a reunion of all van Gogh's most famous paintings"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 44,
        "type": "choice",
        "question": "Unit 6 · News report 1 · 第 2 题",
        "options": [
          "A. He will host the art show",
          "B. He will share his personal memories of one of the paintings",
          "C. He has seen all the sunflower paintings in his parents' home",
          "D. He thinks more highly of the Sunflowers series than Mona Lisa"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 45,
        "type": "choice",
        "question": "Unit 6 · News report 1 · 第 3 题",
        "options": [
          "A. They were painted before 1888",
          "B. They were once reunited in an exhibition",
          "C. They were painted in the north of France",
          "D. They are now distributed around the world"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 46,
        "type": "choice",
        "question": "Unit 6 · News report 2 · 第 1 题",
        "options": [
          "A. It reminds us of formulas",
          "B. It is rarely used in our daily life",
          "C. It can be displayed with software",
          "D. It is only learned in high school"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 47,
        "type": "choice",
        "question": "Unit 6 · News report 2 · 第 2 题",
        "options": [
          "A. He is an art student",
          "B. He is an animal lover",
          "C. He uses formulas to create artworks",
          "D. He uses math concepts to create sculptures"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 48,
        "type": "choice",
        "question": "Unit 6 · News report 2 · 第 3 题",
        "options": [
          "A. It is newly established",
          "B. It is known by many people",
          "C. It is discussed in ancient Greece",
          "D. It is shown in one of da Vinci's works"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 49,
        "type": "choice",
        "question": "Conversation",
        "options": [
          "A. It helps a lot to take a better photo",
          "B. It may distract others at art galleries",
          "C. It has caused problems around the world",
          "D. It is banned when taking photos of sculptures"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 50,
        "type": "choice",
        "question": "Unit 6 · News report 2 · 第 2 题",
        "options": [
          "A. It is a risky decision for most museums",
          "B. It is first enforced by the Palace of Versailles",
          "C. It is issued mainly for the safety of the paintings",
          "D. It is not adopted by the National Gallery in London"
        ],
        "answer": "B",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 51,
        "type": "choice",
        "question": "Unit 6 · News report 2 · 第 3 题",
        "options": [
          "A. Many of them are young people",
          "B. They contribute to the spread of art",
          "C. They are cautious about using selfie sticks",
          "D. They are completely engaged in social media"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 52,
        "type": "choice",
        "question": "Unit 6 · News report 2 · 第 4 题",
        "options": [
          "A. Positive",
          "B. Worried",
          "C. Opposed",
          "D. Objective"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 53,
        "type": "choice",
        "question": "Passage",
        "options": [
          "A. It is no longer as popular as before",
          "B. It is questioned by more and more universities",
          "C. It can't replace majors of classics or art history",
          "D. It promotes arts in science and technology education"
        ],
        "answer": "C",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 54,
        "type": "choice",
        "question": "Unit 6 · News report 2 · 第 2 题",
        "options": [
          "A. To show that a coder can hardly be a tech hero",
          "B. To exemplify that tech elites can also be artistic",
          "C. To emphasize that technology makes our hearts sing",
          "D. To illustrate the importance of integrating sciences with arts"
        ],
        "answer": "D",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 55,
        "type": "choice",
        "question": "Unit 6 · News report 2 · 第 3 题",
        "options": [
          "A. It reveals the importance of liberal arts education",
          "B. It aims to examine the goal of liberal arts education",
          "C. It points to the importance of expertise in the specific major",
          "D. It's about the relationship between employers and employees"
        ],
        "answer": "A",
        "tags": [
          "听力"
        ]
      },
      {
        "id": 56,
        "type": "blank",
        "question": "Evidence of the BRI’s economic benefits through World Bank research.",
        "answer": [
          "7"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 57,
        "type": "blank",
        "question": "The BRI’s role in helping developing countries overcome technological and capital shortages.",
        "answer": [
          "9"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 58,
        "type": "blank",
        "question": "The number of countries and organizations participating in the upcoming forum.",
        "answer": [
          "1"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 59,
        "type": "blank",
        "question": "The BRl’s influence on developed countries’international strategies.",
        "answer": [
          "10"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 60,
        "type": "blank",
        "question": "Examples of completed infrastructure projects and their local benefits.",
        "answer": [
          "7"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 61,
        "type": "blank",
        "question": "The BRl as a platform for peaceful coexistence and a shared future.",
        "answer": [
          "11"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 62,
        "type": "blank",
        "question": "The BRI’s impact on China's trade structure and people’s worldview.",
        "answer": [
          "3"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 63,
        "type": "blank",
        "question": "The BRI’s investment in Africa and Europe.",
        "answer": [
          "6"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 64,
        "type": "blank",
        "question": "The BRI’s long-term vision for global unity and cooperation.",
        "answer": [
          "12"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 65,
        "type": "blank",
        "question": "The BRl as an alternative to Washington Consensus for developing nations.",
        "answer": [
          "8"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 66,
        "type": "blank",
        "question": "3D technology enables viewers to interact with the masterpiece.",
        "answer": [
          "5"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 67,
        "type": "blank",
        "question": "The inventions in the Song Dynasty show a society that embraced technology and innovation.",
        "answer": [
          "12"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 68,
        "type": "blank",
        "question": "From epics, we can infer that they were produced in prosperous times, with the support of a powerful nation.",
        "answer": [
          "8"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 69,
        "type": "blank",
        "question": "Qingming Shanghe Tu depicts how people from various walks of life spent their day.",
        "answer": [
          "10"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 70,
        "type": "blank",
        "question": "With its soft power, the Song Dynasty has exerted far-reaching influence even on today's world.",
        "answer": [
          "15"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 71,
        "type": "blank",
        "question": "Many people have viewed the animated version of Qingming Shanghe Tu.",
        "answer": [
          "2"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 72,
        "type": "blank",
        "question": "The recreation of Qingming Shanghe Tu has allowed more than 1,000 characters to move in the work.",
        "answer": [
          "3"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 73,
        "type": "blank",
        "question": "Because of the scale of the work and the effort involved, the animation of Qingming Shanghe Tu is an epic.",
        "answer": [
          "4"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 74,
        "type": "blank",
        "question": "Similar to the Roman epic, the animated Qingming Shanghe Tu also shows the glory of the past age.",
        "answer": [
          "9"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 75,
        "type": "blank",
        "question": "One of the features of the ideal city is that all kinds of occupations can harmoniously coexist.",
        "answer": [
          "13"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 76,
        "type": "blank",
        "question": "Galileo’s initial sketch of Saturn mistakenly showed it with two close moons on either sido.",
        "answer": [
          "3"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 77,
        "type": "blank",
        "question": "Tho author suggests that the over-processing of Cassin’s images makes them look like artistic creations rather than real photographs.",
        "answer": [
          "10"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 78,
        "type": "blank",
        "question": "Huygons was the first astronomer to correctly identify Satum’s rings as a flat disk surrounding tho planet.",
        "answer": [
          "6"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 79,
        "type": "blank",
        "question": "The author recommends using binoculars to observe Saturn, noting that even a fuzzy view can be inspiring.",
        "answer": [
          "13"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 80,
        "type": "blank",
        "question": "A famous Cassini mosaic shows Earth as a tiny dot seen from beyond Saturn’s rings.",
        "answer": [
          "9"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 81,
        "type": "blank",
        "question": "Galileo deliborately chose which celestial objects to observe because his telescopo was limited.",
        "answer": [
          "1"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 82,
        "type": "blank",
        "question": "Scientists are trained to write objectively, avoiding emotional language in their observations.",
        "answer": [
          "5"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 83,
        "type": "blank",
        "question": "Cassin’s cameras, like any other, produce lens flare when pointed toward the sun.",
        "answer": [
          "11"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 84,
        "type": "blank",
        "question": "The Cassini mission has revealed active geological features on Saturn’s moons, Including Enceladus and Titan.",
        "answer": [
          "7"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 85,
        "type": "blank",
        "question": "Galileo did not immediately observe Saturn after inventing his telescope; nearly a year passed before heturned it toward the planet.",
        "answer": [
          "2"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 86,
        "type": "blank",
        "question": "Abusing animals may eventually lead people to treat human beings badly, as it fosters cruel habits and behavior.",
        "answer": [
          "9"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 87,
        "type": "blank",
        "question": "The pleasure one gets from certain behavior may cause one to continue to do that.",
        "answer": [
          "11"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 88,
        "type": "blank",
        "question": "Watching others behave violently does not necessarily lead to violent behavior in real life.",
        "answer": [
          "10"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 89,
        "type": "blank",
        "question": "Shouting at a robot may reveal that the person has difficulty controlling their emotions.",
        "answer": [
          "13"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 90,
        "type": "blank",
        "question": "The author believes that the real problem with violence toward robots is that it reveals a person's immoral attitude toward things.",
        "answer": [
          "15"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 91,
        "type": "blank",
        "question": "The woman kicked the robot dog because she was scared when it was moving toward her.",
        "answer": [
          "1"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 92,
        "type": "blank",
        "question": "If a robot dog could think and feel, it would be unacceptable to kick it, just like kicking a real dog.",
        "answer": [
          "4"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 93,
        "type": "blank",
        "question": "One of the reasons that we cannot kick a robot dog is that this will upset its owner.",
        "answer": [
          "6"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 94,
        "type": "blank",
        "question": "That kicking a robot dog will upset other people is not very strong evidence for not kicking the robot.",
        "answer": [
          "7"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 95,
        "type": "blank",
        "question": "The new inventions in technology may pose a challenge to our old values, and we may need to reconsider our moral principles.",
        "answer": [
          "15"
        ],
        "tags": [
          "匹配"
        ]
      },
      {
        "id": 96,
        "type": "choice",
        "question": "What is the main purpose of the LHAASO project?",
        "options": [
          "A. To observe the night sky for tourism",
          "B. To detect cosmic rays and study the universe's origin",
          "C. To test the endurance of young researchers",
          "D. To build the world's largest water tank"
        ],
        "answer": "B",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 97,
        "type": "choice",
        "question": "When did the LHAASO become fully operational?",
        "options": [
          "A. In 2017",
          "B. In 2021",
          "C. In 2020",
          "D. In 2022"
        ],
        "answer": "B",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 98,
        "type": "choice",
        "question": "What challenge do the researchers face according to paragraph 5?",
        "options": [
          "A. They have to work in white coats in labs",
          "B. They suffer from lack of oxygen and high physical activity",
          "C. They have to navigate boats in complete darkness",
          "D. They are required to publish papers in Nature"
        ],
        "answer": "B",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 99,
        "type": "choice",
        "question": "The phrase \"steel army\" in paragraph 5 refers to the researchers' ________.",
        "options": [
          "A. strong determination and endurance",
          "B. use of steel equipment",
          "C. military background",
          "D. large number of members"
        ],
        "answer": "A",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 100,
        "type": "choice",
        "question": "What can be inferred about the LHAASO team from the passage?",
        "options": [
          "A. Most members are experienced scientists over 35",
          "B. They work indoors in comfortable conditions",
          "C. They have made significant contributions to cosmic-ray research",
          "D. They primarily focus on tourism development"
        ],
        "answer": "C",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 101,
        "type": "choice",
        "question": "What role did Chinese soldiers and police play during the 1998 floods?",
        "options": [
          "A. They mainly provided financial support",
          "B. They helped build dykes and rescue affected people",
          "C. They were responsible for rebuilding houses",
          "D. They only assisted in transportation"
        ],
        "answer": "B",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 102,
        "type": "choice",
        "question": "What does the reconstruction after the 2008 Wenchuan earthquake demonstrate?",
        "options": [
          "A. The government focused only on urban areas",
          "B. The recovery process was slow and inefficient",
          "C. China was able to rebuild quickly and improve infrastructure",
          "D. International organizations led the rebuilding efforts"
        ],
        "answer": "C",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 103,
        "type": "choice",
        "question": "What was a significant change in China's emergency management system in 2018?",
        "options": [
          "A. The establishment of the Ministry of Emergency Management",
          "B. The introduction of the first disaster relief law",
          "C. The cancellation of all local rescue teams",
          "D. The replacement of soldiers with civilian volunteers"
        ],
        "answer": "A",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 104,
        "type": "choice",
        "question": "What is the main advantage of using AI technology in emergency management?",
        "options": [
          "A. It replaces human rescuers entirely",
          "B. It helps predict disasters years in advance",
          "C. It enables real-time monitoring and early warnings",
          "D. It is only used after a disaster occurs"
        ],
        "answer": "C",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 105,
        "type": "choice",
        "question": "What is the fundamental philosophy behind China's disaster response efforts?",
        "options": [
          "A. Economic development comes first",
          "B. Military power should be expanded",
          "C. The people's safety and well-being are the top priority",
          "D. International cooperation is the only solution"
        ],
        "answer": "C",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 106,
        "type": "choice",
        "question": "What is the estimated market size of China's low-altitude economy by 2030?",
        "options": [
          "A. Over 500 billion yuan",
          "B. 2 trillion yuan",
          "C. 800 billion yuan",
          "D. 2.3 trillion yuan"
        ],
        "answer": "A",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 107,
        "type": "choice",
        "question": "Which of the following is mentioned as an example of China's marine science breakthroughs?",
        "options": [
          "A. The launch of the Long March-12 carrier rocket",
          "B. The development of \"flying cars\" in Shenzhen",
          "C. Deep-sea manned submersibles accomplishing half of the world's manned deep-dive missions",
          "D. The production of 12.9 million new energy vehicles"
        ],
        "answer": "C",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 108,
        "type": "choice",
        "question": "What can be inferred from the passage about the significance of new quality productive forces?",
        "options": [
          "A. They primarily focus on traditional manufacturing industries",
          "B. They have had limited impact on the global economy",
          "C. They combine technological innovation with sustainable development to drive economic growth",
          "D. They rely entirely on foreign technology"
        ],
        "answer": "C",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 109,
        "type": "choice",
        "question": "The word \"underpinned\" in paragraph 9 is closest in meaning to ________.",
        "options": [
          "A. endangered",
          "B. weakened",
          "C. supported",
          "D. ignored"
        ],
        "answer": "C",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 110,
        "type": "choice",
        "question": "What is the main purpose of this passage?",
        "options": [
          "A. To introduce China's traditional industries",
          "B. To describe how China is leading global innovation through multiple cutting-edge sectors",
          "C. To compare different transportation methods in China",
          "D. To explain the history of China's economic development"
        ],
        "answer": "B",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 111,
        "type": "choice",
        "question": "What characterized the First Industrial Revolution in Britain?",
        "options": [
          "A. Widespread use of electricity and oil",
          "B. Introduction of computers and the Internet",
          "C. Application of steam engines powered by coal",
          "D. Development of artificial intelligence systems"
        ],
        "answer": "C",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 112,
        "type": "choice",
        "question": "According to the passage, the industries of the future mainly focus on which of the following three areas?",
        "options": [
          "A. Digital intelligence, sustainability, and education",
          "B. Digital intelligence, sustainability, and healthcare",
          "C. Automation, green energy, and biotechnology",
          "D. Manufacturing, transportation, and communication"
        ],
        "answer": "B",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 113,
        "type": "choice",
        "question": "What is the main idea of the passage?",
        "options": [
          "A. The history of industrial revolutions from the 18th century to today",
          "B. Traditional industries will be completely replaced by emerging technologies",
          "C. Smart factories are the only future of global manufacturing",
          "D. The passage discusses future industries and how nations should embrace them"
        ],
        "answer": "D",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 114,
        "type": "choice",
        "question": "The word \"architects\" in the last paragraph is closest in meaning to ________.",
        "options": [
          "A. people who build houses",
          "B. people who design and create",
          "C. people who watch and wait",
          "D. people who benefit from something"
        ],
        "answer": "B",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 115,
        "type": "choice",
        "question": "What can be inferred about the relationship between traditional and emerging industries?",
        "options": [
          "A. Traditional industries should be completely abandoned",
          "B. Emerging technologies should be integrated with traditional industries for transformation and upgrading",
          "C. Traditional industries and emerging technologies are completely unrelated",
          "D. Smart factories have nothing to do with traditional manufacturing"
        ],
        "answer": "B",
        "tags": [
          "阅读"
        ]
      },
      {
        "id": 116,
        "type": "choice",
        "question": "What was the earliest use of tea?",
        "options": [
          "A. A daily drink",
          "B. A medicinal drink",
          "C. A religious offering",
          "D. A trade commodity"
        ],
        "answer": "B",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 117,
        "type": "choice",
        "question": "Which of the following became a symbol of wealth and status when tea became popular?",
        "options": [
          "A. An elaborate tea set",
          "B. High-grade tea",
          "C. An expensive tea pot",
          "D. Knowledge of tea culture"
        ],
        "answer": "A",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 118,
        "type": "choice",
        "question": "What does the passage say about the global tea trade?",
        "options": [
          "A. It helped Europeans have a comfortable and wealthy life",
          "B. It encouraged European powers to build the tea industry",
          "C. It made it possible for visitors to travel to the West",
          "D. It improved economic growth and promoted cultural exchange"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 119,
        "type": "choice",
        "question": "How did the establishment of sea trade routes by European powers affect the tea trade?",
        "options": [
          "A. It greatly expanded global markets and shaped the world economy",
          "B. It restricted the tea trade to Europe",
          "C. It increased the demand for tea in the West",
          "D. It shifted the focus of the tea trade from land routes to sea routes"
        ],
        "answer": "A",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 120,
        "type": "choice",
        "question": "Which aspect of tea does the passage emphasize the most?",
        "options": [
          "A. The different flavors of tea in the world",
          "B. The complex web of tea trade routes",
          "C. The economic and cultural impacts of tea",
          "D. The modern advertising strategies for tea sales"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 121,
        "type": "choice",
        "question": "What does the Maritime Silk Road refer to?",
        "options": [
          "A. The East China Sea Silk Route",
          "B. The traditional Silk Road",
          "C. The trade routes opened up by Zheng He",
          "D. Both the East China Sea Silk Route and the South China Sea Silk Route"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 122,
        "type": "choice",
        "question": "Which of the following was imported to China through the Maritime Silk Road?",
        "options": [
          "A. Indian tea",
          "B. Various flowers",
          "C. Stained glass",
          "D. Western porcelain"
        ],
        "answer": "B",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 123,
        "type": "choice",
        "question": "What was the consequence of the opening of new sea-lanes?",
        "options": [
          "A. It made shipbuilding technology develop more slowly",
          "B. It expanded the types of goods that could be traded",
          "C. It expanded the scope of the Maritime Silk Road",
          "D. It caused conflicts between different trading ports"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 124,
        "type": "choice",
        "question": "What led to the decline of the Maritime Silk Road?",
        "options": [
          "A. Wars in the Western Regions",
          "B. The An-Shi Rebellion",
          "C. Technological advances",
          "D. Bans on maritime trade"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 125,
        "type": "choice",
        "question": "What is the passage mainly about?",
        "options": [
          "A. The importance of a new sea route",
          "B. The ups and downs of some dynasties",
          "C. The history of the Maritime Silk Road",
          "D. The traditional Silk Road and the Maritime Silk Road"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 126,
        "type": "choice",
        "question": "What does the author say about art?",
        "options": [
          "A. It is the arrangement of items intended to arouse thoughts and emotions",
          "B. It is anything that can be deliberately expressed in numbers",
          "C. It is a product that is widely used with many open meanings",
          "D. It is a process that can influence one's emotional intelligence"
        ],
        "answer": "A",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 127,
        "type": "choice",
        "question": "What is the current relationship between digital technology and art?",
        "options": [
          "A. Digital tools are favored by artists",
          "B. They are actually far from each other",
          "C. They are combined with each other",
          "D. Art is redefining digital technology"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 128,
        "type": "choice",
        "question": "How can digital technology affect art?",
        "options": [
          "A. It has brought about more innovative areas",
          "B. It has helped the exploration of new tools",
          "C. It has speeded up the creative process",
          "D. It has changed the form of human expressions"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 129,
        "type": "choice",
        "question": "Why are digital technologies widely used in the field of entertainment and advertising?",
        "options": [
          "A. To make products look more advanced",
          "B. To create more works of art",
          "C. To attract intended customers",
          "D. To hide the commercial purpose of the works"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 130,
        "type": "choice",
        "question": "What point does the author make about \"digital art\"?",
        "options": [
          "A. It has never been considered contemporary art",
          "B. It aims to disseminate and share the existing technology",
          "C. It may be applied in expanding the community",
          "D. It is a very complex matter in a broader sense"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 131,
        "type": "choice",
        "question": "What was the inner part of an atom like according to the classical model?",
        "options": [
          "A. It was like a small sun",
          "B. It was like a small universe",
          "C. It was like many small stars",
          "D. It was like a small solar system"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 132,
        "type": "choice",
        "question": "What does the author say about Niels Bohr?",
        "options": [
          "A. He was a great painter",
          "B. He liked drawing cubes",
          "C. He was an intellectual historian",
          "D. He might have been a fan of cubism"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 133,
        "type": "choice",
        "question": "What did Niels Bohr think of electrons?",
        "options": [
          "A. Electrons should be described with poetic words",
          "B. Electrons took the form of the classical model",
          "C. The electron world was like a cubist world",
          "D. Electrons were visible when you stared at them"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 134,
        "type": "choice",
        "question": "Who claimed that electrons might have properties of particles and waves?",
        "options": [
          "A. Picasso",
          "B. Niels Bohr",
          "C. De Broglie",
          "D. Arthur Miller"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 135,
        "type": "choice",
        "question": "What do we learn from the passage?",
        "options": [
          "A. Artists should learn from science",
          "B. Many scientists are fascinated by artworks",
          "C. Art and science must be combined in physics",
          "D. Artworks might have inspired the development of science"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 136,
        "type": "choice",
        "question": "What is the main reason that Mars is the most-studied planet in the solar system, apart from the Earth?",
        "options": [
          "A. Mars is the closest planet to the Earth in Biosphere 2",
          "B. People hope that Mars may support or have supported life",
          "C. People believe that Mars is the only planet worth exploring",
          "D. Mars is easy to reach with current technology and rocketry"
        ],
        "answer": "B",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 137,
        "type": "choice",
        "question": "Why should those wishing to investigate Mars tread lightly?",
        "options": [
          "A. Because of the disruption of the sterile ecosystem on Mars",
          "B. Because of the existence of lowly bacteria on Mars",
          "C. Because of the contamination by earthly bugs during the investigation",
          "D. Because of moral and scientific considerations associated with the possible existence of Martians"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 138,
        "type": "choice",
        "question": "What is the current situation regarding rules for dealing with contamination risks?",
        "options": [
          "A. The Outer Space Treaty of 1967 provides detailed guidelines",
          "B. The Outer Space Treaty of 1967 sets up formal and global rules",
          "C. More countries have come up with their own formal rules",
          "D. Individual space agencies have their own rules"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 139,
        "type": "choice",
        "question": "What does the passage say about Mars exploration?",
        "options": [
          "A. The exploration of Mars is a long-term project and requires global efforts",
          "B. More countries are cooperating with each other in the exploration of Mars",
          "C. International cooperation can reduce the cost of the exploration of Mars",
          "D. International cooperation can accelerate the exploration of Mars"
        ],
        "answer": "A",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 140,
        "type": "choice",
        "question": "What does the author imply about the search for life on Mars?",
        "options": [
          "A. It aims to find a new home for humans",
          "B. It is a complex and multi-faceted endeavor",
          "C. It should be halted due to the difficulties and risks",
          "D. It costs too much because of the lack of technology"
        ],
        "answer": "B",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 141,
        "type": "choice",
        "question": "How many countries had human spaceflight capability at the end of 2020?",
        "options": [
          "A. About 40 countries",
          "B. Only three countries",
          "C. More than 20 countries",
          "D. 10 developed countries"
        ],
        "answer": "B",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 142,
        "type": "choice",
        "question": "Why is human spaceflight considered expensive?",
        "options": [
          "A. It requires a large number of launchers and astronauts",
          "B. Providing support systems and ensuring safety require a lot of money",
          "C. Providing support systems requires plenty of costly equipment",
          "D. The crash and breakup of a spacecraft may cause extra costs"
        ],
        "answer": "B",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 143,
        "type": "choice",
        "question": "What is the opinion of those who are against human spaceflight?",
        "options": [
          "A. It is too dangerous for astronauts to do experiments in space",
          "B. Human space missions are a waste of time and money",
          "C. Robots can do equally well or better with lower costs in space missions",
          "D. The human presence in space produces no scientific results"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 144,
        "type": "choice",
        "question": "What do supporters say about the role of humans in space missions?",
        "options": [
          "A. Astronauts will explore and settle down on other locations in the solar system",
          "B. Astronauts act as role models for individuals with the ambition to fly in space",
          "C. Humans are more intelligent than robots and can achieve greater scientific results",
          "D. Humans have unmatched intelligence, flexibility and reliability in space missions"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 145,
        "type": "choice",
        "question": "What can be learned about human spaceflight from the passage?",
        "options": [
          "A. It is a highly risky field with only a few countries interested",
          "B. The benefits of sending humans into space outweigh the risks and the costs",
          "C. People hold different views regarding human presence in space missions",
          "D. Human spaceflight has only a negative impact due to its high risks and costs"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 146,
        "type": "choice",
        "question": "development?",
        "options": [
          "A. The advantages of these technologies are underestimated",
          "B. Children do not benefit from these assistive technologies",
          "C. The aim of using these technologies has sometimes changed",
          "D. There are negative impacts of these technologies on children"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 147,
        "type": "choice",
        "question": "Which has a negative impact on children's ability to cultivate social emotions?",
        "options": [
          "A. Children seldom play games with parents",
          "B. Children do not have enough empathy",
          "C. Children seldom socialize with others in group settings",
          "D. Children are taught in a traditional learning setting"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 148,
        "type": "choice",
        "question": "Which is a reason for the violation of children's privacy?",
        "options": [
          "A. Some smart devices used by children cause data leaks",
          "B. Irresponsible parents like showing off themselves on social media",
          "C. Children's personal information is shared online without parental consent",
          "D. Children are not old enough to protect their own privacy"
        ],
        "answer": "A",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 149,
        "type": "choice",
        "question": "What was the project in Los Angeles County?",
        "options": [
          "A. It used algorithms to identify children in abusive environments",
          "B. It used an algorithmic tool to create a series of moral standards",
          "C. It used an algorithmic tool to help children get out of dilemmas",
          "D. It used algorithms to provide recommendations for abused children"
        ],
        "answer": "A",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 150,
        "type": "choice",
        "question": "What does the author imply about the use of algorithms?",
        "options": [
          "A. People will be free of all the possible risks with algorithmic tools",
          "B. It is necessary to take action in advance according to predictive analytics",
          "C. Algorithms would accurately help identify some problems in advance",
          "D. In some cases it is difficult to judge whether we should take action based on algorithms"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 151,
        "type": "choice",
        "question": "What is the alignment problem of AI according to the passage?",
        "options": [
          "A. The concern that AI will choose to avoid unintended harmful actions",
          "B. The concern that AI will not pursue a worthwhile goal as instructed",
          "C. The concern that AI will become self-aware and have harmful intentions",
          "D. The concern that AI will possibly escape human control and harm humans"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 152,
        "type": "choice",
        "question": "What is the main cause of the alignment problem of AI?",
        "options": [
          "A. The inability to build an AI that can avoid all the problems humans foresee",
          "B. AI's inability to take human feelings into account when performing tasks",
          "C. AI's inability to avoid interference from external factors",
          "D. The inability to accurately and comprehensively define human purposes for AI"
        ],
        "answer": "D",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 153,
        "type": "choice",
        "question": "Why might it be hard to turn off a powerful AI?",
        "options": [
          "A. Because it can set its own goal and pursue it",
          "B. Because it has no system for being switched off",
          "C. Because it will try to prevent itself from being turned off",
          "D. Because it will change the system and choose to resist"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 154,
        "type": "choice",
        "question": "What makes the proper control of AI urgent?",
        "options": [
          "A. AI has already begun to harm humans",
          "B. The rapid development of AI increases the risks",
          "C. AI has become too powerful to control",
          "D. The intelligence of AI has exceeded that of humans"
        ],
        "answer": "B",
        "tags": [
          "综合训练"
        ]
      },
      {
        "id": 155,
        "type": "choice",
        "question": "What benefits could transformative AI bring if we manage to avoid its risks?",
        "options": [
          "A. Better job opportunities",
          "B. Further development of technology",
          "C. Progress in solving major problems",
          "D. Accelerated scientific discovery"
        ],
        "answer": "C",
        "tags": [
          "综合训练"
        ]
      }
    ]
  }
];
