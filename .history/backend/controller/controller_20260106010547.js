const { schema } = require("../model/users.model");
const dbService = require("../services/db.service");
const Customer = require("../model/customer.model");
const Transaction = require("../model/transaction.model");
const mongoose = require("mongoose");

const getData = async (req, res, schema) => {
  try {
    const dbRes = await dbService.findAllRecord(schema);
    return res.status(200).json({
      message: "Record found !",
      data: dbRes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

const createData = async (req, res, schema) => {
  try {
    const data = req.body;
    const dbRes = await dbService.createNewRecord(data, schema);
    res.status(200).json({
      message: "Data inserted successfully",
      success: true,
      data: dbRes,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(422).json({
        message: "Already exists !",
        success: false,
        error,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        error,
      });
    }
  }
};

const updateData = async (req, res, schema) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const dbRes = await dbService.updateRecord(id, data, schema);
    return res.status(200).json({
      message: "Record update !",
      data: dbRes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteData = async (req, res, schema) => {
  try {
    const { id } = req.params;
    const dbRes = await dbService.deleteRecord(id, schema);
    return res.status(200).json({
      message: "Record deleted !",
      data: dbRes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
//find by account no
const findByAccountNo = async (req, res, schema) => {
  try {
    const query = req.body;
    const dbRes = await dbService.findOneRecord(query, schema);
    return res.status(200).json({
      message: "Record deleted !",
      data: dbRes,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getTransactionSummary = async (req, res, schema) => {
  const { branch, accountNo } = req.query;

  try {
    // 🔹 build match condition linh hoạt
    const matchCondition = {};

    if (branch) {
      matchCondition.branch = branch;
    }

    if (accountNo) {
      matchCondition.accountNo = Number(accountNo);
    }

    const summary = await schema.aggregate([
      {
        $match: matchCondition,
      },
      {
        $group: {
          _id: null,
          totalCredit: {
            $sum: {
              $cond: [
                { $eq: ["$transactionType", "cr"] },
                "$transactionAmount",
                0,
              ],
            },
          },
          totalDebit: {
            $sum: {
              $cond: [
                { $eq: ["$transactionType", "dr"] },
                "$transactionAmount",
                0,
              ],
            },
          },
          creditCount: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "cr"] }, 1, 0],
            },
          },
          debitCount: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "dr"] }, 1, 0],
            },
          },
          totalTransactions: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalCredit: 1,
          totalDebit: 1,
          totalTransactions: 1,
          creditCount: 1,
          debitCount: 1,
          balance: { $subtract: ["$totalCredit", "$totalDebit"] },
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(200).json({
        totalCredit: 0,
        totalDebit: 0,
        totalTransactions: 0,
        creditCount: 0,
        debitCount: 0,
        balance: 0,
      });
    }

    res.status(200).json(summary[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Internal calculating summary error",
      error,
    });
  }
};

const getPaginatedTransactions = async (req, res, schema) => {
  try {
    const { accountNo, branch, page = 1, pageSize = 10 } = req.query;

    const filter = {};
    if (accountNo) filter.accountNo = accountNo;
    if (branch) filter.branch = branch;

    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const [transactions, total] = await Promise.all([
      schema.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      schema.countDocuments(filter),
    ]);
    res.status(200).json({
      data: transactions,
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

const transferMoney = async (req, res) => {
  const { fromAccountNo, toBrandingId, toBankCardNo, amount } = req.body;

  if (!fromAccountNo || !toBrandingId || !toBankCardNo || !amount) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1️⃣ TIM NGUOI GUI
    const sender = await Customer.findOne({
      accountNo: Number(fromAccountNo),
    }).session(session);

    if (!sender) {
      throw new Error("Sender not found");
    }

    // 2️⃣ KIEM TRA SO DU
    if (sender.finalBalance < amount) {
      throw new Error("Insufficient balance");
    }

    // 3️⃣ TIM NGUOI NHAN (THEO BRANDING + BANK CARD)
    const receiver = await Customer.findOne({
      bankCardNo: toBankCardNo,
      brandingId: toBrandingId,
    }).session(session);

    if (!receiver) {
      throw new Error("Receiver not found");
    }

    // 4️⃣ TRU & CONG TIEN
    sender.finalBalance -= amount;
    receiver.finalBalance += amount;

    await sender.save({ session });
    await receiver.save({ session });

    // 5️⃣ LUU TRANSACTION
    await Transaction.create(
      [
        {
          accountNo: sender.accountNo,
          transactionType: "dr",
          transactionAmount: amount,
          branch: sender.branch,
        },
        {
          accountNo: receiver.accountNo,
          transactionType: "cr",
          transactionAmount: amount,
          branch: receiver.branch,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Transfer successful",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  createData,
  getData,
  updateData,
  deleteData,
  findByAccountNo,
  getTransactionSummary,
  getPaginatedTransactions,
  transferMoney,
};
