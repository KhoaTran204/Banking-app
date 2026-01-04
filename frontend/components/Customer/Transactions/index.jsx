import Customerlayout from "../../Layout/Customerlayout";
import TransactionTable from "../../Shared/TransactionTable";

const CustomerTransactions = () => {
  //get userInfo
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  return (
    <Customerlayout>
      <TransactionTable
        query={{ accountNo: userInfo?.accountNo, branch: userInfo?.branch }}
      />
    </Customerlayout>
  );
};
export default CustomerTransactions;
