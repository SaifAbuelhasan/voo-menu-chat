import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
import { connect } from "react-redux";
import { setActiveBranches } from "../../actions/activeBranches";
import { collection, getDocs } from "firebase/firestore";
import firestore from "../../database/index";

const SelectBranch = (props) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);

  const getOptions = (branches) => {
    return branches.map((branch) => {
      return { label: branch.name, value: branch.id };
    });
  };

  const selectBranch = (data) => {
    setSelectedBranch(data);
    props.dispatch(setActiveBranches(data));
  };
  useEffect(() => {
    async function getBranches() {
      const querySnapshot = await getDocs(
        collection(firestore, "shops/10/branches")
      );
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setBranches(data);
      setSelectedBranch(getOptions(data));
      props.dispatch(setActiveBranches(getOptions(data)));
    }
    getBranches();
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

export default connect()(SelectBranch);
