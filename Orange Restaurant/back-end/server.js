const express = require('express');
const multer = require('multer');
const app = express()
var cors = require('cors')
var moment = require('moment');  
let bodyParser = require('body-parser');
let mysql = require('mysql2');

app.use(express.static('public'));
app.use('/uploadsmenu', express.static('images'));

app.listen(8000, () => {
    console.log('service running at PORT: 8000')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.get('/', (req, res) => {
    return res.send({
        error: false,
        message: "Welcome",
        written_by: "Kamonchanok",
        publishend_on: "q_kiki"
    })
})
// let dbCon = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'orangerestaurant',
//     multipleStatements: true
// })
let dbCon = mysql.createConnection({
    host:'20.204.132.11',
    user : 'root',
    password : '@Game2012',
    database : 'mydb'
})
dbCon.connect();

//ดึงรายชื่อสมาชิกลูกค้าทั้งหมด(ไม่ได้ใช้หน้าเว็ป)
app.get('/api/customers', (req, res) => {
    dbCon.query('SELECT * FROM customer', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "Users table is empty";
        } else {
            message = "Successfully retrieved all Users";
        }
        return res.send({ error: false, data: results, message: message });
    })
})

//เข้าสู่ระบบ
app.post('/api/login', (req, res) => {
    let CustomerUser = req.body.User;
    let CustomerCol = req.body.Col;
    // validation
    if (!CustomerUser || !CustomerCol) {
        return res.send({ error: true, message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });
    } else {
        dbCon.query("SELECT * FROM customer WHERE CustomerUser = ? && CustomerCol = ?", [CustomerUser, CustomerCol], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "เช็คกรณีพนักงาน";
            } else {
                message = "Successfully retrieved User data";
            }

            return res.send({ error: false, data: results[0], message: message })
        })
    }
});

//เข้าสู่ระบบเช็คเจ้าของ
app.post('/api/loginOwner', (req, res) => {
    let OwnerUser = req.body.User;
    let OwnerCol = req.body.Col;
    // validation
    if (!OwnerUser || !OwnerCol) {
        return res.send({ error: true, message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });
    } else {
        dbCon.query("SELECT * FROM owner INNER JOIN store ON store.owner_OwnerID = owner.OwnerID WHERE OwnerUser = ? && OwnerCol = ?", [OwnerUser, OwnerCol], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "เนื่องจากชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
            } else {
                message = "Successfully retrieved User data";
            }

            return res.send({ error: false, data: results[0], message: message })
        })
    }
});

//เช็คสมาชิก
app.post('/api/checkmember', (req, res) => {
    let CustomerUser = req.body.CustomerUser;
    let CustomerName = req.body.CustomerName;
    let CustomerCol = req.body.CustomerCol;
    // validation
    if (!CustomerUser || !CustomerCol || !CustomerName) {
        return res.send({ error: true, message: "กรุณากรอกให้ครบ" });
    } else {
        dbCon.query("SELECT * FROM customer WHERE CustomerUser = ?", [CustomerUser], (error, results, fields) => {
            let message = "";
            if (results === undefined || results.length === 0) {
                message = "ไม่มีสมาชิกในนี้";
            } else {
                message = "เนื่องจากมีชื่อผู้ใช้นี้อยู่ในระบบแล้ว";
            }
            return res.send({ error: false, data: results[0], message: message })
        })
    }
});

//สมัครสมาชิก
app.post('/api/signup', (req, res) => {
    let CustomerUser = req.body.CustomerUser;
    let CustomerName = req.body.CustomerName;
    let CustomerCol = req.body.CustomerCol;
    let CustomerPhone = req.body.CustomerPhone;
    // validation
    if (!CustomerUser || !CustomerCol || !CustomerName || !CustomerPhone) {
        return res.send({ error: true, message: "กรุณากรอกให้ครบ" });
    } else {
        dbCon.query('INSERT INTO customer (CustomerID,CustomerUser , CustomerName,CustomerCol,CustomerPhone) VALUES(?, ?,?,?,?)', [null, CustomerUser, CustomerName, CustomerCol, CustomerPhone], (error, results, fields) => {
            if (error) throw error;
            return res.send({ error: false, data: { CustomerUser: CustomerUser, CustomerName: CustomerName, CustomerCol: CustomerCol }, message: "User successfully added" })
        })
    }
});

//---------------------* เป็นส่วนของเพิ่มเมนูอาหาร *--------------------------------- //

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploadsmenu/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".png")
    }
})
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploadstore/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".png")
    }
})
const upload = multer({ storage: storage })
const upload2 = multer({ storage: storage2 })
app.get('/', (req, res) => {
    res.send('Hello Upload')
})

app.post('/api/uploadsmenu', upload.single('file'), cors(), (req, res) => {
    let MenuName = req.body.MenuName;
    let MenuPrice = req.body.MenuPrice;
    let MenuDate = req.body.MenuDate;
    let MenuStatus = req.body.MenuStatus;
    let StoreID = req.body.StoreID;

    let Menuimage = req.file.filename;

    dbCon.query('INSERT INTO menu (MenuID,MenuName,MenuPrice,MenuDate,menustatus_MenuStatus,Store_StoreId,MenuImage) VALUES(?,?,?,?,?,?,?)', [null, MenuName, MenuPrice, MenuDate, MenuStatus, StoreID, Menuimage], (error, results, fields) => {
        if (error) throw error;
        // return res.send({ error: false, data: {MenuName :MenuName,MenuPrice:MenuPrice,MenuDate:MenuDate,MenuStatus:MenuStatus,StoreID:StoreID,Menuimage : Menuimage}, message: "User successfully added"})
    })
    res.send({
        MenuName: req.MenuName
        , MenuPrice: MenuPrice
        , MenuDate: MenuDate
        , MenuDate: MenuDate
        , MenuStatus: MenuStatus
        , Menuimage: Menuimage
        , StoreID: StoreID
    })
})

//---------------------* เป็นส่วนของเพิ่มเมนูอาหาร *--------------------------------- //

//---------------------* แสดงเมนูทั้งหมด *--------------------------------- //


app.post('/api/menu', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM menu inner join store on store.StoreID = menu.Store_StoreId inner join menustatus on menustatus.MenuStatus = menu.menustatus_MenuStatus WHERE Store_StoreId = ? order by menu.MenuDate,menu.MenuName", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});

app.post('/api/menu1', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM menu inner join store on store.StoreID = menu.Store_StoreId inner join menustatus on menustatus.MenuStatus = menu.menustatus_MenuStatus WHERE Store_StoreId = ? and menu.menustatus_MenuStatus = '1' order by menu.MenuDate,menu.MenuName", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});

app.post('/api/menu2', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM menu inner join store on store.StoreID = menu.Store_StoreId inner join menustatus on menustatus.MenuStatus = menu.menustatus_MenuStatus WHERE Store_StoreId = ? and menu.menustatus_MenuStatus = '2' order by menu.MenuDate,menu.MenuName", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});

//ไม่ได้ใช้
app.get('/api/menu', (req, res) => {
    dbCon.query('SELECT * FROM menu', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "Books table is empty";
        } else {
            message = "Successfully retrieved all books";
        }
        return res.send({ error: false, data: results, message: message });
    })
})

app.delete('/api/menu', (req, res) => {
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "กรุณาใส่ id " });
    } else {
        dbCon.query('DELETE FROM menu WHERE MenuID = ?', [id], (error, results, fields) => {
            let message = "";
            if (error) {
                if (error.code === "ER_ROW_IS_REFERENCED_2") {
                    return res.send({ message: "ER_ROW_IS_REFERENCED_2" })
                }
                else {
                    throw error;
                }

            }
            if (results.affectedRows === 0) {
                message = "ไม่สามารถลบได้ ไม่มี id นี้อยู่ในระบบ";
            } else {
                message = "ลบสำเร็จ";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

//อัพเดต
app.put('/api/menu', upload.single('file'), cors(), (req, res) => {
    let MenuName = req.body.MenuName;
    let MenuPrice = req.body.MenuPrice;
    let MenuStatus = req.body.MenuStatus;
    let Menuimage
    if (req.file != null) {
        Menuimage = req.file.filename;
    } else {
        Menuimage = 0;
    }
    let MenuID = req.body.MenuID;
    let Menuoldimage = req.body.MenuImage;
    // validation
    if (!MenuName || !MenuPrice || !MenuStatus) {
        return res.status(400).send({ error: true, message: 'กรุณาใส่ข้อมูลให้ครบถ้วน' });
    } else {
        if (Menuimage != 0) {
            dbCon.query('UPDATE menu SET MenuName = ?, MenuPrice = ?, menustatus_MenuStatus = ?, MenuImage = ? WHERE MenuID = ?', [MenuName, MenuPrice, MenuStatus, Menuimage, MenuID], (error, results, fields) => {
                if (error) throw error;

                let message = "";
                if (results.changedRows === 0) {
                    message = "หาเมนูไม่เจอ";
                } else {
                    message = "อัพเดตสำเร็จ";
                }

                return res.send({ error: false, data: results, message: message })
            })
        }
        else {
            dbCon.query('UPDATE menu SET MenuName = ?, MenuPrice = ?, menustatus_MenuStatus = ? WHERE MenuID = ?', [MenuName, MenuPrice, MenuStatus, MenuID], (error, results, fields) => {
                if (error) throw error;

                let message = "";
                if (results.changedRows === 0) {
                    message = "หาเมนูไม่เจอ";
                } else {
                    message = "อัพเดตสำเร็จ";
                }

                return res.send({ error: false, data: results, message: message })
            })
        }
    }
})
app.get('/api/menu/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide  id" });
    } else {
        dbCon.query("SELECT * FROM menu WHERE MenuID = ?", id, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาเมนูไม่เจอ";
            } else {
                message = "เจอเมนู";
            }

            return res.send({ error: false, data: results[0], message: message })
        })
    }
})


// รวมร้านอาหาร //
app.get('/api/stores', (req, res) => {
    dbCon.query('SELECT * FROM store inner join owner on store.owner_OwnerID = owner.OwnerID order by store.StoreName', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "Users table is empty";
        } else {
            message = "Successfully retrieved all Users";
        }
        return res.send({ error: false, data: results, message: message });
    })
})
//ขอแค่ชื่อร้าน
app.post('/api/storename', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM store INNER JOIN owner on store.owner_OwnerID = owner.OwnerID WHERE store.StoreID = ?", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results[0])
        })
    }
});

//เพิ่มคำสั่งอาหู้ว
app.post('/api/order', (req, res) => {

    // validation
    let OrderDate = req.body.OrderDate;
    OrderDate = moment(OrderDate).format("YYYY-MM-DD hh:mm:ss");
    let OrderTime = req.body.OrderTime;
    let OrderStatus = "1";
    let OrderQty = req.body.OrderQty;
    let OrderPrice = req.body.OrderPrice;
    let CustomerID = req.body.CustomerID;
    let OrderNoteCus = req.body.OrderNoteCus;
    let MenuID = req.body.MenuID;

    let StoreID = req.body.StoreID;

    dbCon.query('INSERT INTO orderfood (OrderID,OrderDate,OrderTime,orderstatus_OrderStatus,OrderQty,Customer_CustomerID,OrderNoteCus,Menu_MenuId,Menu_Store_StoreId,OrderPrice) VALUES(?,?,?,?,?,?,?,?,?,?)', [null, OrderDate, OrderTime, OrderStatus, OrderQty, CustomerID, OrderNoteCus, MenuID,StoreID,OrderPrice], (error, results, fields) => {
        if (error) throw error;
        // return res.send({ error: false, data: {MenuName :MenuName,MenuPrice:MenuPrice,MenuDate:MenuDate,MenuStatus:MenuStatus,StoreID:StoreID,Menuimage : Menuimage}, message: "User successfully added"})
    })
    res.send({
        OrderDate: req.OrderDate
        , OrderTime: OrderTime
        , OrderStatus: OrderStatus
        , OrderQty: OrderQty
        , OrderPrice: OrderPrice
        , CustomerID: CustomerID
        , OrderNoteCus: OrderNoteCus
        , MenuID: MenuID
    })
});


// -----------------สถานะอาหาร------------------------ //


//ตามรายลูกค้า
app.post('/api/statusfoodcus', (req, res) => {
    let CustomerID = req.body.CustomerID;
    // validation
    if (!CustomerID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID  = menu.Store_StoreId  inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus where customer.CustomerID =  ? order by orderfood.OrderDate, orderfood.OrderID desc  ", [CustomerID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});
app.post('/api/statusfoodcus1', (req, res) => {
    let CustomerID = req.body.CustomerID;
    // validation
    if (!CustomerID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID  = menu.Store_StoreId  inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus where customer.CustomerID =  ? and orderfood.orderstatus_OrderStatus = '1' order by orderfood.OrderDate desc  ", [CustomerID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});
app.post('/api/statusfoodcus2', (req, res) => {
    let CustomerID = req.body.CustomerID;
    // validation
    if (!CustomerID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID  = menu.Store_StoreId  inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus where customer.CustomerID =  ? and orderfood.orderstatus_OrderStatus = '2' order by orderfood.OrderDate desc  ", [CustomerID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});
app.post('/api/statusfoodcus3', (req, res) => {
    let CustomerID = req.body.CustomerID;
    // validation
    if (!CustomerID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID  = menu.Store_StoreId  inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus where customer.CustomerID =  ? and orderfood.orderstatus_OrderStatus = '3' order by orderfood.OrderDate desc  ", [CustomerID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});
app.post('/api/statusfoodcus4', (req, res) => {
    let CustomerID = req.body.CustomerID;
    // validation
    if (!CustomerID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID  = menu.Store_StoreId  inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus where customer.CustomerID =  ? and orderfood.orderstatus_OrderStatus = '4' order by orderfood.OrderDate desc  ", [CustomerID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});
//ตามรายเจ้าของร้าน
app.post('/api/statusfoodow', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID = menu.Store_StoreId inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus WHERE store.StoreID = ? order by orderfood.OrderDate desc   ", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});

//สถานะร้าน ของร้าน//
app.post('/api/statusfoodow1', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID = menu.Store_StoreId inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus WHERE store.StoreID = ? and orderstatus.OrderStatus ='1' order by orderfood.OrderDate desc ", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});
app.post('/api/statusfoodow2', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID = menu.Store_StoreId inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus WHERE store.StoreID = ? and orderstatus.OrderStatus ='2' order by orderfood.OrderDate desc ", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});
app.post('/api/statusfoodow3', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID = menu.Store_StoreId inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus WHERE store.StoreID = ? and orderstatus.OrderStatus ='3' order by orderfood.OrderDate desc  ", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});
app.post('/api/statusfoodow4', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID = menu.Store_StoreId inner join customer on orderfood.Customer_CustomerID = customer.CustomerID inner join orderstatus on orderstatus.OrderStatus  = orderfood.orderstatus_OrderStatus WHERE store.StoreID = ? and orderstatus.OrderStatus ='4' order by orderfood.OrderDate desc ", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});
// แก้ไขคำสั่งอาหารตาม id //
app.get('/api/statusfoodow/:id', (req, res) => {
    let OrderID = req.params.id;

    if (!OrderID) {
        return res.status(400).send({ error: true, message: "Please provide  id" });
    } else {
        dbCon.query("SELECT * FROM orderfood inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID = menu.Store_StoreId inner join customer on orderfood.Customer_CustomerID = customer.CustomerID  WHERE OrderID = ?", OrderID, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาคำสั่งซื้อไม่เจอ";
            } else {
                message = "เจอละ";
            }

            return res.send({ error: false, data: results[0], message: message })
        })
    }
})
//ลบคำสั่งอาหาร
app.delete('/api/statusfoodow', (req, res) => {
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "กรุณาใส่ id " });
    } else {
        dbCon.query('DELETE FROM orderfood WHERE OrderID = ?', [id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.affectedRows === 0) {
                message = "ไม่สามารถลบได้ ไม่มี id นี้อยู่ในระบบ";
            } else {
                message = "ลบสำเร็จ";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

//อัพเดต
app.put('/api/statusfoodow', (req, res) => {
    let OrderID = req.body.OrderID;
    let OrderStatus = req.body.OrderStatus;
    let OrderNoteOw = " "
    if (req.body.OrderNoteOw) {
        OrderNoteOw = req.body.OrderNoteOw;
    }
    // validation
    if (!OrderID || !OrderStatus || !OrderNoteOw) {
        return res.status(400).send({ error: true, message: 'กรุณาใส่ข้อมูลให้ครบถ้วน' });
    }
    else {
        dbCon.query('UPDATE orderfood SET orderstatus_OrderStatus = ?, OrderNoteOw = ? WHERE OrderID = ?', [OrderStatus, OrderNoteOw, OrderID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.changedRows === 0) {
                message = "หาคำสั่งซื้อไม่เจอ";
            } else {
                message = "อัพเดตสำเร็จ";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

//ร้าน
app.post('/api/storepw', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT * FROM store INNER JOIN owner on store.owner_OwnerID = owner.OwnerID WHERE StoreID = ?", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results[0])
        })
    }
});

//อัพเดต
app.put('/api/storepw', upload2.single('file'), cors(), (req, res) => {
    let StoreName = req.body.StoreName;
    let StoreStatus = req.body.StoreStatus;
    let StoreID = req.body.StoreID;
    let StoreImage
    if (req.file != null) {
        StoreImage = req.file.filename;
    } else {
        StoreImage = 0;
    }
    // validation
    if (!StoreName || !StoreStatus) {
        return res.status(400).send({ error: true, message: 'กรุณาใส่ข้อมูลให้ครบถ้วน' });
    } else {
        if (StoreImage != 0) {
            dbCon.query('UPDATE store SET StoreName = ?, storestatus_StoreStatus = ?, StoreImage = ? WHERE StoreID = ?', [StoreName, StoreStatus, StoreImage, StoreID], (error, results, fields) => {
                if (error) throw error;

                let message = "";
                if (results.changedRows === 0) {
                    message = "หาร้านอาหารไม่เจอ";
                } else {
                    message = "อัพเดตสำเร็จ";
                }

                return res.send({ error: false, data: results, message: message })
            })
        }
        else {
            dbCon.query('UPDATE store SET StoreName = ?, storestatus_StoreStatus = ? WHERE StoreID = ?', [StoreName, StoreStatus, StoreID], (error, results, fields) => {
                if (error) throw error;

                let message = "";
                if (results.changedRows === 0) {
                    message = "หาร้านอาหารไม่เจอ";
                } else {
                    message = "อัพเดตสำเร็จ";
                }

                return res.send({ error: false, data: results, message: message })
            })
        }
    }
})

//chart

//ร้าน
app.post('/api/mostfood', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT  ROW_NUMBER() OVER(ORDER BY SUM(orderfood.OrderPrice) DESC ) AS MostfoodRow ,menu.MenuName , SUM(orderfood.OrderPrice) OrderMostPrice FROM orderfood INNER JOIN menu on orderfood.Menu_MenuId = menu.MenuID WHERE orderfood.orderstatus_OrderStatus ='3' AND menu.Store_StoreId = ? GROUP BY menu.MenuID LIMIT 0, 5", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});

//เดือน
app.post('/api/monthfood', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("select  ROW_NUMBER() OVER(ORDER BY MONTH(orderfood.OrderDate) desc ) AS MonthRow,MONTH(orderfood.OrderDate) AS Month ,SUM(orderfood.OrderPrice) AS OrderPrice FROM orderfood inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID = menu.Store_StoreId WHERE store.StoreID = ? and orderfood.orderstatus_OrderStatus ='3' and Year(orderfood.OrderDate) = '2022' GROUP BY MONTH(orderfood.OrderDate) ORDER BY Month desc LIMIT 0, 5", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});

//วัน
app.post('/api/dayfood', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("SELECT ROW_NUMBER() OVER(ORDER BY Date(orderfood.OrderDate) ) AS DayRow ,Date(orderfood.OrderDate) AS OrderDate ,SUM(orderfood.OrderPrice) AS OrderPrice FROM orderfood  inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID = menu.Store_StoreId WHERE store.StoreID = ? and orderfood.orderstatus_OrderStatus ='3' and Year(orderfood.OrderDate) = '2022' GROUP BY OrderDate ORDER BY OrderDate desc LIMIT 0, 5", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});

//ปี
app.post('/api/yearfood', (req, res) => {
    let StoreID = req.body.StoreID;
    // validation
    if (!StoreID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("select ROW_NUMBER() OVER(ORDER BY Year(orderfood.OrderDate) DESC ) AS YearRow,Year(orderfood.OrderDate) AS Year ,SUM(orderfood.OrderPrice) AS OrderPrice FROM orderfood inner join menu on menu.MenuID = orderfood.Menu_MenuId inner join store on store.StoreID = menu.Store_StoreId WHERE store.StoreID = ? and orderfood.orderstatus_OrderStatus ='3' GROUP BY Year(orderfood.OrderDate) ORDER BY Year desc LIMIT 0, 5", [StoreID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results)
        })
    }
});

//นับจำนวน
app.post('/api/countorder', (req, res) => {
    let CustomerID = req.body.CustomerID;
    // validation
    if (!CustomerID) {
        return res.send({ error: true, message: "หาเลขไม่เจอ" });
    } else {
        dbCon.query("select count(*) as count from orderfood inner join customer on orderfood.Customer_CustomerID = customer.CustomerID where orderfood.orderstatus_OrderStatus = '3' and customer.CustomerID = ?", [CustomerID], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "หาไม่เจอ";
            } else {
                message = "หาเจอ";
            }

            return res.send(results[0])
        })
    }
});

// ไม่เกี่ยวข้องกับการเอาไปดึงในฟร้อนเอน
//เพิ่มเจ้าของร้านแบบรีบ
app.post('/api/addowner', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('INSERT INTO owner (OwnerID,OwnerName,OwnerUser,OwnerCol,OwnerPhone) VALUES(?, ?,?,?,?)', [null, "ซานาวะ นามิ", "ssssss", "ssssss", "012345678"], (error, results, fields) => {
            if (error) throw error;
            return res.send({ error: false, message: "User successfully added" })
        })
});
app.get('/api/addowner', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('select * from owner ', (error, results, fields) => {
            if (error) throw error;
            return res.send(results)
        })
});
app.put('/api/addstoree', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('UPDATE customer SET CustomerUser = ? ,CustomerCol = ? WHERE CustomerID = ?', [ "aaaaaaa", "aaaaaaa","1"], (error, results, fields) => {
            if (error) throw error;
            return res.send({ message: "User successfully added" })
        })
});
//เพิ่มร้านค้า
app.post('/api/addstoree', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('INSERT INTO store (StoreID,StoreName,StoreImage,owner_OwnerID,storestatus_StoreStatus) VALUES(?, ?,?,?,?)', [null, "ไม่สั่งไม่ทำ", "2234324", "6", "1"], (error, results, fields) => {
            if (error) throw error;
            return res.send({ error: false, message: "User successfully added" })
        })
});
app.get('/api/addstoree', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('select * from store ', (error, results, fields) => {
            if (error) throw error;
            return res.send(results)
        })
});
app.post('/api/addstoreestatus', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('INSERT INTO storestatus (StoreStatus,StoreNameStatus) VALUES(?,?)', ["0", "ปิด", "2234324", "1", "1"], (error, results, fields) => {
            if (error) throw error;
            return res.send({message: "User successfully added"})
        })
});
app.get('/api/addstoreestatus', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('select * from storestatus ', (error, results, fields) => {
            if (error) throw error;
            return res.send(results)
        })
});
app.post('/api/addmenuustatus', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('INSERT INTO menustatus (MenuStatus,MenuNameStatus) VALUES(?,?)', ["0", "ปิด"], (error, results, fields) => {
            if (error) throw error;
            return res.send({message: "User successfully added"})
        })
});
app.get('/api/addmenuustatus', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('select * from menustatus ', (error, results, fields) => {
            if (error) throw error;
            return res.send(results)
        })
});

app.get('/api/addorderrstatus', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('select * from orderstatus ', (error, results, fields) => {
            if (error) throw error;
            return res.send(results)
        })
});
app.post('/api/addorderrstatus', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('INSERT INTO orderstatus (OrderStatus,OrderNameStatus) VALUES(?,?)', ["4", "ถูกยกเลิก"], (error, results, fields) => {
            if (error) throw error;
            return res.send({message: "User successfully added"})
        })
});
app.get('/api/test', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('select * from menu ', (error, results, fields) => {
            if (error) throw error;
            return res.send(results)
        })
});
app.put('/api/test', (req, res) => {
    // let CustomerUser = req.body.CustomerUser;
    // let CustomerName = req.body.CustomerName;
    // let CustomerCol = req.body.CustomerCol;
    // let CustomerPhone = req.body.CustomerPhone;
    // validation
        dbCon.query('UPDATE customer SET CustomerName = ? WHERE CustomerID = ?', [ "นางเอ วิตามิน","1"], (error, results, fields) => {
            if (error) throw error;
            return res.send({ message: "User successfully added" })
        })
});


