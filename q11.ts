// 1. Interfaces
interface Transaction {
  transactionId: string;
  type: "DEPOSIT" | "WITHDRAW";
  amount: number;
  success: boolean;
}

interface BankAccount {
  accountId: string;
  ownerName: string;
  balance: number;       // ยอดเงินปัจจุบันที่บันทึกไว้
  history: Transaction[]; // ประวัติการทำธุรกรรมทั้งหมด
}

// 2. Function Definition
function auditAccounts(accounts: BankAccount[]){
  let blacklist:string[] = [];
  let numfalse:string[] = [];
  for(let i = 0; i < accounts.length; i++){
    let failcount:number =  0;
      let xyx = accounts[i].history.filter((x)=> x.success === false ).length;
      failcount = xyx;
      if(failcount > 2){
        blacklist.push(accounts[i].ownerName);
    }
    let balance = accounts[i].history.reduce((x)=> x.amount); 
    
    else if ()
  }return blacklist ; 
  
  /* 
     Your code here 
     คำใบ้: ข้อนี้ต้องใช้ทั้ง Nested Loop (หรือ reduce), 
     การเช็คเงื่อนไขที่รัดกุม และการใช้ .push() หรือ .filter() + .map()
  */
}

// 3. Test Cases
const database: BankAccount[] = [
  {
    // บัญชีที่ 1: ปกติ
    // คำนวณ: ฝาก 1500 (สำเร็จ) - ถอน 500 (สำเร็จ) = 1000 (ตรงกับ balance)
    // ล้มเหลว: 1 ครั้ง (ไม่เกิน 2) -> ไม่ผิดปกติ
    accountId: "B001",
    ownerName: "John Doe",
    balance: 1000,
    history: [
      { transactionId: "T1", type: "DEPOSIT", amount: 1500, success: true },
      { transactionId: "T2", type: "WITHDRAW", amount: 500, success: true },
      { transactionId: "T3", type: "WITHDRAW", amount: 100, success: false }
    ]
  },
  {
    // บัญชีที่ 2: ผิดปกติ (ยอดเงินไม่ตรงปก)
    // คำนวณ: ฝาก 3000 (สำเร็จ) - ถอน 500 (สำเร็จ) = 2500 
    // แต่ balance แจ้งว่ามี 50000 -> ผิดปกติ!
    accountId: "B002",
    ownerName: "Hacker Harry",
    balance: 50000,
    history: [
      { transactionId: "T4", type: "DEPOSIT", amount: 3000, success: true },
      { transactionId: "T5", type: "WITHDRAW", amount: 500, success: true }
    ]
  },
  {
    // บัญชีที่ 3: ผิดปกติ (ล้มเหลวเกิน 2 ครั้ง)
    // ล้มเหลว 3 ครั้ง -> ผิดปกติ!
    accountId: "B003",
    ownerName: "Scammer Sam",
    balance: 0,
    history: [
      { transactionId: "T6", type: "WITHDRAW", amount: 10000, success: false },
      { transactionId: "T7", type: "WITHDRAW", amount: 5000, success: false },
      { transactionId: "T8", type: "WITHDRAW", amount: 2000, success: false }
    ]
  }
];

console.log(auditAccounts(database));
// ผลลัพธ์ที่คาดหวัง: ["Hacker Harry", "Scammer Sam"]