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
    props.dispatch(
      setActiveBranches({
        allBranches: data.length === branches.length,
        branches: data.map((branch) => branch.value),
      })
    );
  };
  useEffect(() => {
    async function loadBranches() {
      const data = await getBranches(props.authedUser.ShopUserId);
      setBranches(data);
    }
    loadBranches();
  }, []);

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
