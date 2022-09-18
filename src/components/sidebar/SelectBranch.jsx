import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
import { connect } from "react-redux";
import { setActiveBranches } from "../../actions/activeBranches";
import { getBranches } from "../../api/api";
import { collection, getDocs } from "firebase/firestore";
import firestore from "../../database/index";

const SelectBranch = (props) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);

  const getOptions = (branches) => {
    return branches.map((branch) => {
      return { label: branch.Name, value: `${branch.Id}` };
    });
  };

  const selectBranch = (data) => {
    setSelectedBranch(data);
    props.dispatch(setActiveBranches(data));
  };
  useEffect(() => {
    async function loadBranches() {
      // const querySnapshot = await getDocs(
      //   collection(firestore, "shops/10/branches")
      // );
      // const data = [];
      // querySnapshot.forEach((doc) => {
      //   data.push({ ...doc.data(), id: doc.id });
      // });
      const data = await getBranches(props.authedUser.ShopUserId);
      console.log(data);
      setBranches(data);
      setSelectedBranch(getOptions(data));
      props.dispatch(setActiveBranches(getOptions(data)));
    }
    loadBranches();
  }, []);

  //   const options = branches.map((branch) => {
  //     return { label: branch.name, value: branch.id };
  //   });
  return (
    <>
      <MultiSelect
        options={getOptions(branches)}
        value={selectedBranch}
        onChange={selectBranch}
        labelledBy={"Select"}
      />
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    authedUser: state.authedUser,
  };
};

export default connect(mapStateToProps)(SelectBranch);
